import { test, expect } from '@playwright/test';

test.describe('Comparador de Planos', () => {
  // Cenário 1: Carregamento inicial
  test('should load page with 4 tool columns', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que as 4 colunas estão visíveis
    const columns = page.locator('[data-testid="tool-column"]');
    await expect(columns).toHaveCount(4);
    
    // Verificar cabeçalhos: GitHub Copilot, Cursor, Claude Code, Windsurf
    await expect(page.locator('h2:has-text("GitHub Copilot")')).toBeVisible();
    await expect(page.locator('h2:has-text("Cursor")')).toBeVisible();
    await expect(page.locator('h2:has-text("Claude Code")')).toBeVisible();
    await expect(page.locator('h2:has-text("Windsurf")')).toBeVisible();
  });

  // Cenário 2: Filtro por orçamento
  test('should filter plans when moving budget slider to $50', async ({ page }) => {
    await page.goto('/');
    
    // Mover slider para $50
    const slider = page.locator('[data-testid="budget-slider"]');
    const thumb = slider.locator('[role="slider"]');
    await thumb.click();
    // Pressionar ArrowRight 5 vezes para chegar em $50 (inicia em $0)
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(500);
    
    // Verificar que apenas planos com price <= 50 são exibidos
    const planCards = page.locator('[data-testid="plan-card"]');
    const allPrices = await planCards.locator('[data-testid="plan-price"]').allTextContents();
    
    for (const priceText of allPrices) {
      const price = priceText === 'Free' ? 0 : parseInt(priceText.replace('$', '').replace('/month', ''));
      expect(price).toBeLessThanOrEqual(50);
    }
    
    // Nota: A ordenação é por coluna/ferramenta, não global
  });

  // Cenário 3: Filtro por tipo
  test('should filter only Individual plans', async ({ page }) => {
    await page.goto('/');
    
    // Clicar no filtro "Individual"
    await page.click('[data-testid="filter-individual"]');
    
    // Verificar que apenas planos type: 'individual' são exibidos
    const planCards = page.locator('[data-testid="plan-card"]');
    const count = await planCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = planCards.nth(i);
      await expect(card.locator('[data-testid="plan-type"]')).toHaveText('Individual');
    }
  });

  test('should filter only Enterprise plans', async ({ page }) => {
    await page.goto('/');
    
    // Clicar no filtro "Enterprise"
    await page.click('[data-testid="filter-enterprise"]');
    
    // Verificar que apenas planos type: 'enterprise' são exibidos
    const planCards = page.locator('[data-testid="plan-card"]');
    const count = await planCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = planCards.nth(i);
      await expect(card.locator('[data-testid="plan-type"]')).toHaveText('Enterprise');
    }
  });

  // Cenário 4: Toggle de tema
  test('should toggle between light and dark theme', async ({ page }) => {
    await page.goto('/');
    
    // Verificar tema inicial (pode ser light ou dark)
    const html = page.locator('html');
    const hasDarkClass = await html.getAttribute('class');
    const isInitiallyDark = hasDarkClass?.includes('dark') || false;
    
    // Clicar no toggle
    await page.click('[data-testid="theme-toggle"]');
    
    // Verificar que tema mudou
    if (isInitiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
    
    // Recarregar página
    await page.reload();
    
    // Verificar que tema persistiu
    if (isInitiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });

  // Cenário 5: Responsividade
  test('should display correctly on mobile viewport', async ({ page }) => {
    // Definir viewport mobile (375x667)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verificar layout adaptado
    const grid = page.locator('[data-testid="plan-grid"]');
    await expect(grid).toBeVisible();
    
    // Verificar se as colunas estão empilhadas ou com scroll horizontal
    const columns = page.locator('[data-testid="tool-column"]');
    await expect(columns).toHaveCount(4);
    
    // Verificar se o slider ainda está visível e funcional
    const slider = page.locator('[data-testid="budget-slider"]');
    await expect(slider).toBeVisible();
  });

  // Cenário 6: Combinação de filtros
  test('should combine budget and type filters', async ({ page }) => {
    await page.goto('/');
    
    // Mover slider para $30
    const slider = page.locator('[data-testid="budget-slider"]');
    const thumb = slider.locator('[role="slider"]');
    await thumb.click();
    // Pressionar ArrowRight 3 vezes para chegar em $30 (inicia em $0)
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(500);
    
    // Selecionar filtro "Individual"
    await page.click('[data-testid="filter-individual"]');
    
    // Verificar planos corretos
    const planCards = page.locator('[data-testid="plan-card"]');
    const count = await planCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = planCards.nth(i);
      const priceText = await card.locator('[data-testid="plan-price"]').textContent();
      const price = priceText === 'Free' ? 0 : parseInt(priceText?.replace('$', '').replace('/month', '') || '0');
      const typeText = await card.locator('[data-testid="plan-type"]').textContent();
      
      expect(price).toBeLessThanOrEqual(30);
      expect(typeText).toBe('Individual');
    }
  });

  // Cenário 7: Verificar valores extremos do slider
  test('should handle slider extremes correctly', async ({ page }) => {
    await page.goto('/');
    
    // Testar valor $0
    const slider = page.locator('[data-testid="budget-slider"]');
    const thumb = slider.locator('[role="slider"]');
    await thumb.click();
    await page.keyboard.press('Home');
    await page.waitForTimeout(500);
    
    // Deve mostrar apenas planos gratuitos
    const freePlans = page.locator('[data-testid="plan-card"][data-plan-price="0"]');
    const allPlans = page.locator('[data-testid="plan-card"]');
    expect(await freePlans.count()).toBe(await allPlans.count());
    
    // Testar valor $200
    await thumb.click();
    await page.keyboard.press('End');
    await page.waitForTimeout(500);
    
    // Deve mostrar todos os planos
    const allPlansAfter = await page.locator('[data-testid="plan-card"]').count();
    expect(allPlansAfter).toBeGreaterThan(0);
  });
});

test.describe('Bento Grid Layout', () => {
  // 2.1 Teste E2E para altura balanceada das 4 colunas (tolerância 10%)
  const budgetTestCases = [
    { budget: 0, arrowPresses: 0 },
    { budget: 50, arrowPresses: 5 },
    { budget: 100, arrowPresses: 10 },
    { budget: 200, arrowPresses: 20 },
  ];
  for (const { budget, arrowPresses } of budgetTestCases) {
    test(`should display balanced column heights on desktop with budget $${budget}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');
      const slider = page.locator('[data-testid="budget-slider"]');
      const thumb = slider.locator('[role="slider"]');
      await thumb.click();
      await page.keyboard.press('Home');
      for (let i = 0; i < arrowPresses; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(500);
      const columns = page.locator('[data-testid="tool-column"]');
      await expect(columns).toHaveCount(4);
      const columnCardHeightSums: number[] = [];
      for (let i = 0; i < 4; i++) {
        const column = columns.nth(i);
        const cards = column.locator('[data-testid="plan-card"]');
        const cardCount = await cards.count();
        let sumHeight = 0;
        for (let j = 0; j < cardCount; j++) {
          const card = cards.nth(j);
          const box = await card.boundingBox();
          if (box) {
            sumHeight += box.height;
          }
        }
        columnCardHeightSums.push(sumHeight);
      }
      const nonEmptyColumns = columnCardHeightSums.filter(h => h > 0);
      if (nonEmptyColumns.length < 2) {
        return;
      }
      const maxHeight = Math.max(...nonEmptyColumns);
      const minHeight = Math.min(...nonEmptyColumns);
      const tolerance = 0.02;
      const heightDifference = (maxHeight - minHeight) / maxHeight;
      expect(heightDifference).toBeLessThanOrEqual(tolerance);
    });
  }

  // 2.2 Teste E2E para animação fade-in quando budget aumenta
  test('should animate cards on fade-in when budget changes', async ({ page }) => {
    await page.goto('/');
    const slider = page.locator('[data-testid="budget-slider"]');
    const thumb = slider.locator('[role="slider"]');
    await thumb.click();
    await page.keyboard.press('Home');
    await page.waitForTimeout(300);
    const initialCardCount = await page.locator('[data-testid="plan-card"]').count();
    await thumb.click();
    await page.keyboard.press('End');
    const cardsWithFadeIn = page.locator('[data-testid="plan-card"]').locator('xpath=ancestor::div[contains(@class, "gh-fade-in")]');
    await page.waitForTimeout(100);
    const finalCardCount = await page.locator('[data-testid="plan-card"]').count();
    expect(finalCardCount).toBeGreaterThan(initialCardCount);
    const cardWrapper = page.locator('.gh-fade-in').first();
    const hasAnimation = await cardWrapper.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animationName !== 'none';
    });
    expect(hasAnimation).toBeTruthy();
  });

  // 2.3 Teste E2E para animação fade-out quando cards são filtrados
  test('should animate cards on fade-out when filtered out', async ({ page }) => {
    await page.goto('/');
    const slider = page.locator('[data-testid="budget-slider"]');
    const thumb = slider.locator('[role="slider"]');
    await thumb.click();
    await page.keyboard.press('End');
    await page.waitForTimeout(500);
    const initialCardCount = await page.locator('[data-testid="plan-card"]').count();
    expect(initialCardCount).toBeGreaterThan(0);
    await thumb.click();
    await page.keyboard.press('Home');
    await page.waitForTimeout(300);
    const finalCardCount = await page.locator('[data-testid="plan-card"]').count();
    expect(finalCardCount).toBeLessThan(initialCardCount);
  });

  // 2.4 Teste E2E para troca de tema dark/light com cores GitHub
  test('should switch between dark and light themes', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await themeToggle.click();
    await page.waitForTimeout(200);
    const isDark = await html.evaluate((el) => el.classList.contains('dark'));
    if (isDark) {
      const bodyBgColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      expect(bodyBgColor).not.toBe('rgb(255, 255, 255)');
      const cardBorderColor = await page.locator('[data-testid="plan-card"]').first().evaluate((el) => {
        return window.getComputedStyle(el).borderColor;
      });
      expect(cardBorderColor).toBeDefined();
    } else {
      const bodyBgColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      expect(bodyBgColor).not.toBe('rgb(13, 17, 23)');
    }
    await themeToggle.click();
    await page.waitForTimeout(200);
    const isNowDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(isNowDark).toBe(!isDark);
  });

  // 2.5 Teste E2E para layout single-column em mobile
  test('should stack columns vertically on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const grid = page.locator('[data-testid="plan-grid"]');
    await expect(grid).toBeVisible();
    const columns = page.locator('[data-testid="tool-column"]');
    await expect(columns).toHaveCount(4);
    const firstColumn = columns.nth(0);
    const secondColumn = columns.nth(1);
    const firstBox = await firstColumn.boundingBox();
    const secondBox = await secondColumn.boundingBox();
    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();
    if (firstBox && secondBox) {
      const isStacked = secondBox.y >= firstBox.y + firstBox.height - 10;
      expect(isStacked).toBeTruthy();
    }
  });

  // 2.6 Teste E2E para prefers-reduced-motion
  test('should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const cardWrapper = page.locator('.gh-fade-in').first();
    await expect(cardWrapper).toBeVisible();
    const hasNoAnimation = await cardWrapper.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animationName === 'none' || style.animationDuration === '0s';
    });
    expect(hasNoAnimation).toBeTruthy();
    const hoverCard = page.locator('.gh-card-hover').first();
    const hasNoTransition = await hoverCard.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.transitionDuration === '0s' || style.transition === 'none 0s ease 0s';
    });
    expect(hasNoTransition).toBeTruthy();
  });
});
