# Especificação Técnica - Bento Grid Layout Estilo GitHub

## Resumo Executivo

Esta especificação técnica detalha a implementação do Bento Grid Layout com estética GitHub para o Comparador de Planos de AI. A solução utiliza CSS Grid com `grid-auto-rows: 1fr` para equalização automática de alturas entre colunas, mantendo animações em CSS puro para performance otimizada. O tema visual GitHub será implementado como um novo conjunto de variáveis CSS, preservando o sistema atual como fallback. A implementação foca em modificar os componentes existentes (`PlanGrid.tsx`, `PlanCard.tsx`) e o arquivo de estilos (`index.css`), sem necessidade de novas dependências.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **`index.css`** (modificação): Adição das variáveis CSS do tema GitHub (dark/light), classes de animação (fade-in, fade-out, reorganização) e utilitários para o grid balanceado.

- **`PlanGrid.tsx`** (modificação): Refatoração para implementar CSS Grid com balanceamento de altura via `grid-auto-rows: 1fr`, adição de classes de animação nos cards e suporte a `prefers-reduced-motion`.

- **`PlanCard.tsx`** (modificação): Aplicação do estilo visual GitHub (bordas 1px, cantos 6-8px, hover states), tipografia monospace para valores numéricos e badges estilizados para tiers.

- **`tailwind.config.js`** (modificação): Extensão com cores do tema GitHub e configuração de fonte monospace.

- **`useTheme.ts`** (verificação): Garantir que a troca de tema aplique corretamente as novas variáveis GitHub.

## Design de Implementação

### Interfaces Principais

```typescript
interface GitHubThemeColors {
  dark: {
    background: string;
    backgroundSecondary: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
  };
  light: {
    background: string;
    backgroundSecondary: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
  };
}

interface PlanCardAnimationState {
  isEntering: boolean;
  isExiting: boolean;
  isRepositioning: boolean;
}
```

### Modelos de Dados

Não há alterações nos modelos de dados existentes. A interface `Plan` permanece inalterada.

### Endpoints de API

Não aplicável - esta funcionalidade é exclusivamente frontend.

## Pontos de Integração

Não há integrações externas. A implementação utiliza apenas:
- **Tailwind CSS**: Sistema de estilização existente
- **Lucide React**: Ícones (já disponível via shadcn/ui)
- **CSS Variables**: Sistema de temas existente

## Abordagem de Testes

### Testes Unitários

**Componentes a testar:**
- `PlanCard.tsx`: Verificar aplicação correta de classes de tier, renderização de badges, formatação monospace de preços
- `PlanGrid.tsx`: Verificar estrutura do grid, distribuição de cards por ferramenta

**Cenários críticos:**
```typescript
describe('PlanCard', () => {
  it('should apply correct tier color class based on plan name', () => {});
  it('should render price with monospace font', () => {});
  it('should apply hover state classes', () => {});
  it('should render badge with correct styling', () => {});
});

describe('PlanGrid', () => {
  it('should render 4 columns on desktop', () => {});
  it('should maintain column structure when plans change', () => {});
  it('should show empty state placeholder for columns without plans', () => {});
});
```

### Testes de Integração

**Componentes a testar juntos:**
- `App.tsx` + `PlanGrid.tsx` + `PlanCard.tsx`: Fluxo completo de filtragem e exibição
- `useTheme.ts` + componentes visuais: Troca de tema dark/light

**Requisitos de dados de teste:**
- Mock de planos com diferentes quantidades de features/modelos para testar altura dinâmica
- Cenários com 0, 1, 2+ planos por ferramenta

### Testes E2E

**Cenários Playwright:**

```typescript
describe('Bento Grid Layout', () => {
  it('should display balanced column heights on desktop', async () => {
    // Verificar que todas as colunas têm altura similar (tolerância de 10%)
  });

  it('should animate cards on fade-in when budget changes', async () => {
    // Mover slider e verificar animação de entrada
  });

  it('should animate cards on fade-out when filtered out', async () => {
    // Reduzir budget e verificar animação de saída
  });

  it('should switch between dark and light themes', async () => {
    // Clicar toggle e verificar cores GitHub aplicadas
  });

  it('should stack columns vertically on mobile', async () => {
    // Viewport mobile e verificar layout single-column
  });

  it('should respect prefers-reduced-motion', async () => {
    // Emular preferência e verificar ausência de animações
  });
});
```

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Variáveis CSS do tema GitHub** (`index.css`)
   - Por que primeiro: Base para todas as outras alterações visuais
   - Adicionar cores dark (#0d1117, #161b22, #30363d, #e6edf3, #8b949e)
   - Adicionar cores light (#ffffff, #f6f8fa, #d0d7de, #1f2328, #656d76)

2. **Classes de animação CSS** (`index.css`)
   - Dependência: Variáveis CSS
   - Implementar fade-in (200-300ms), fade-out (150-200ms), reposition (200ms ease-out)
   - Adicionar suporte a `prefers-reduced-motion`

3. **Configuração Tailwind** (`tailwind.config.js`)
   - Dependência: Variáveis CSS
   - Mapear novas cores GitHub
   - Configurar fonte monospace

4. **Refatoração PlanCard** (`PlanCard.tsx`)
   - Dependência: Tailwind config
   - Aplicar bordas 1px, cantos 6-8px
   - Implementar hover states
   - Adicionar `font-mono` em preços/limites
   - Estilizar badges de tier

5. **Refatoração PlanGrid** (`PlanGrid.tsx`)
   - Dependência: PlanCard atualizado
   - Implementar CSS Grid com `grid-auto-rows: 1fr`
   - Adicionar classes de animação
   - Ajustar responsividade (4 cols → 1 col)

6. **Testes unitários e integração**
   - Dependência: Componentes refatorados
   - Atualizar testes existentes
   - Adicionar novos cenários

7. **Testes E2E Playwright**
   - Dependência: Testes unitários passando
   - Implementar cenários de balanceamento, animação, tema, responsividade

### Dependências Técnicas

- **Nenhuma nova dependência** necessária
- Lucide React já disponível para ícones
- Tailwind CSS já configurado

## Considerações Técnicas

### Decisões Principais

| Decisão | Justificativa | Alternativas Rejeitadas |
|---------|---------------|------------------------|
| CSS Grid com `1fr` | Balanceamento nativo sem JS, melhor performance | Algoritmo greedy (complexidade), Flexbox (menos controle) |
| CSS puro para animações | Já existe no projeto, sem dependência extra, GPU-accelerated | Framer Motion (overhead de bundle) |
| Novo tema GitHub separado | Preserva fallback, facilita rollback | Substituição total (risco de regressão) |
| `font-mono` inline | Simplicidade, padrão Tailwind | Classe utilitária custom (over-engineering) |
| Lucide para ícones | Já disponível via shadcn | Octicons (dependência adicional) |

### Riscos Conhecidos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| `grid-auto-rows: 1fr` não equaliza perfeitamente com conteúdo dinâmico | Média | Baixo | PRD permite pequenas variações; usar `min-height` como fallback |
| Animações causam jank em dispositivos lentos | Baixa | Médio | Usar `transform` e `opacity` apenas; respeitar `prefers-reduced-motion` |
| Cores GitHub não passam WCAG AA | Baixa | Alto | Cores oficiais GitHub já são acessíveis; validar com ferramentas |

### Conformidade com Padrões

**Rules aplicáveis de `.windsurf/rules`:**

- **`react.md`**:
  - Componentes funcionais ✓
  - TypeScript com `.tsx` ✓
  - Estilização com Tailwind ✓
  - `useMemo` para cálculos de grid ✓
  - Testes automatizados ✓

- **`code-standards.md`**:
  - Código em inglês ✓
  - camelCase para variáveis/funções ✓
  - PascalCase para componentes ✓
  - Evitar comentários desnecessários ✓
  - Early returns ✓

- **`tests.md`**:
  - Jest para testes ✓
  - Padrão AAA/GWT ✓
  - Testes independentes ✓
  - Cobertura completa ✓

### Arquivos Relevantes e Dependentes

**Arquivos a modificar:**
- `frontend/src/index.css` - Variáveis CSS e animações
- `frontend/src/tailwind.config.js` - Cores e fontes
- `frontend/src/components/PlanGrid.tsx` - Layout grid
- `frontend/src/components/PlanCard.tsx` - Estilo cards
- `frontend/src/components/PlanGrid.test.tsx` - Testes grid
- `frontend/src/components/PlanCard.test.tsx` - Testes card
- `frontend/e2e/comparator.spec.ts` - Testes E2E

**Arquivos dependentes (sem modificação):**
- `frontend/src/App.tsx` - Consome PlanGrid
- `frontend/src/hooks/useTheme.ts` - Sistema de temas
- `frontend/src/hooks/usePlans.ts` - Dados dos planos
- `frontend/src/types/plan.ts` - Tipos
