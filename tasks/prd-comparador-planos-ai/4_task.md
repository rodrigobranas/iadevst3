# Tarefa 4.0: Testes E2E com Playwright

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Configurar Playwright e implementar testes end-to-end que validam a funcionalidade completa do comparador de planos de AI.

<requirements>
- Configurar Playwright no projeto frontend
- Implementar cenários E2E que cobrem todas as funcionalidades principais
- Testes devem rodar com backend e frontend ativos
- Validar responsividade em diferentes viewports
</requirements>

## Subtarefas

- [ ] 4.1 Instalar Playwright: `npm install -D @playwright/test` e `npx playwright install`
- [ ] 4.2 Criar arquivo `frontend/playwright.config.ts` com configuração
- [ ] 4.3 Criar pasta `frontend/e2e/` para testes
- [ ] 4.4 Implementar `frontend/e2e/comparator.spec.ts` com cenários E2E

## Detalhes de Implementação

Consultar a seção **"Testes de E2E"** em `techspec.md` para:
- Configuração do Playwright
- Cenários a implementar

### Cenários E2E a implementar:

```typescript
// frontend/e2e/comparator.spec.ts

describe('Comparador de Planos', () => {
  // Cenário 1: Carregamento inicial
  test('should load page with 4 tool columns', async ({ page }) => {
    // Verificar que as 4 colunas estão visíveis
    // Verificar cabeçalhos: GitHub Copilot, Cursor, Claude Code, Windsurf
  });

  // Cenário 2: Filtro por orçamento
  test('should filter plans when moving budget slider to $50', async ({ page }) => {
    // Mover slider para $50
    // Verificar que apenas planos com price <= 50 são exibidos
    // Verificar ordenação descendente
  });

  // Cenário 3: Filtro por tipo
  test('should filter only Individual plans', async ({ page }) => {
    // Clicar no filtro "Individual"
    // Verificar que apenas planos type: 'individual' são exibidos
  });

  test('should filter only Enterprise plans', async ({ page }) => {
    // Clicar no filtro "Enterprise"
    // Verificar que apenas planos type: 'enterprise' são exibidos
  });

  // Cenário 4: Toggle de tema
  test('should toggle between light and dark theme', async ({ page }) => {
    // Verificar tema inicial
    // Clicar no toggle
    // Verificar que tema mudou
    // Recarregar página
    // Verificar que tema persistiu
  });

  // Cenário 5: Responsividade
  test('should display correctly on mobile viewport', async ({ page }) => {
    // Definir viewport mobile (375x667)
    // Verificar layout adaptado
  });

  // Cenário 6: Combinação de filtros
  test('should combine budget and type filters', async ({ page }) => {
    // Mover slider para $30
    // Selecionar filtro "Individual"
    // Verificar planos corretos
  });
});
```

### Configuração Playwright:

```typescript
// frontend/playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  baseURL: 'http://localhost:5173',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
  use: {
    trace: 'on-first-retry',
  },
});
```

## Critérios de Sucesso

- Playwright instalado e configurado
- Todos os 6 cenários E2E passando
- Testes rodam com `npx playwright test`
- Cobertura das funcionalidades principais:
  - Carregamento do grid
  - Filtro por orçamento (slider)
  - Filtro por tipo (Individual/Enterprise)
  - Toggle de tema
  - Responsividade

## Testes da Tarefa

- [ ] Testes E2E
  - Cenário 1: Carregamento com 4 colunas
  - Cenário 2: Filtro por orçamento (slider $50)
  - Cenário 3: Filtro Individual
  - Cenário 4: Filtro Enterprise
  - Cenário 5: Toggle de tema com persistência
  - Cenário 6: Responsividade mobile
  - Cenário 7: Combinação de filtros

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

**Novos arquivos:**
- `frontend/playwright.config.ts`
- `frontend/e2e/comparator.spec.ts`

**Arquivos a modificar:**
- `frontend/package.json` (adicionar script "test:e2e")
