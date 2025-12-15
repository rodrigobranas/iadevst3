# Especificação Técnica - Comparador de Planos de AI para Desenvolvedores

## Resumo Executivo

Esta Tech Spec detalha a implementação de um comparador interativo de planos de ferramentas AI para desenvolvedores. A solução consiste em um backend Express/TypeScript que serve dados de planos via endpoint REST e um frontend React/TypeScript com TailwindCSS e shadcn/ui para a interface do usuário.

A arquitetura segue o padrão de dados estáticos carregados em memória no backend, com filtragem client-side para performance otimizada. O frontend implementa um slider de orçamento ($0-$200), grid comparativo de 4 colunas, filtro de tipo de plano (Individual/Enterprise), e toggle de tema claro/escuro. Componentes shadcn/ui são utilizados para garantir acessibilidade e consistência visual.

## Arquitetura do Sistema

### Visão Geral dos Componentes

**Backend (Express/TypeScript):**
- `src/index.ts` - Entry point e configuração do servidor Express (modificar)
- `src/data/plans.json` - Arquivo JSON com dados dos planos (novo)
- `src/routes/plans.ts` - Rota GET /plans (novo)
- `src/types/plan.ts` - Tipos TypeScript para Plan (novo)

**Frontend (React/TypeScript):**
- `src/App.tsx` - Componente principal com layout e estado global (modificar de .jsx)
- `src/main.tsx` - Entry point React (modificar de .jsx)
- `src/components/BudgetSlider.tsx` - Slider de orçamento (novo)
- `src/components/PlanGrid.tsx` - Grid comparativo de 4 colunas (novo)
- `src/components/PlanCard.tsx` - Cartão individual de plano (novo)
- `src/components/PlanTypeFilter.tsx` - Filtro Individual/Enterprise (novo)
- `src/components/ThemeToggle.tsx` - Toggle de tema claro/escuro (novo)
- `src/components/ui/slider.tsx` - Componente Slider do shadcn/ui (novo)
- `src/hooks/usePlans.ts` - Hook para fetch e gerenciamento de planos (novo)
- `src/hooks/useTheme.ts` - Hook para gerenciamento de tema (novo)
- `src/types/plan.ts` - Tipos TypeScript compartilhados (novo)
- `src/lib/utils.ts` - Utilitários (renomear de .js)

**Fluxo de dados:**
1. Backend carrega `plans.json` em memória no startup
2. Frontend faz fetch via `GET /plans` no mount
3. Usuário interage com slider e filtros
4. Filtragem acontece client-side em tempo real
5. Grid re-renderiza com planos elegíveis

## Design de Implementação

### Interfaces Principais

```typescript
// src/types/plan.ts (compartilhado backend/frontend)
interface Plan {
  id: string;
  tool: 'github-copilot' | 'cursor' | 'claude-code' | 'windsurf';
  name: string;
  price: number;
  type: 'individual' | 'enterprise';
  models: string[];
  limits: string;
  features: string[];
}
```

```typescript
// src/hooks/usePlans.ts
interface UsePlansReturn {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  filteredPlans: Plan[];
  filterByBudget: (maxBudget: number) => void;
  filterByType: (type: 'individual' | 'enterprise' | 'all') => void;
}
```

### Modelos de Dados

**Estrutura do plans.json:**

```json
[
  {
    "id": "github-copilot-free",
    "tool": "github-copilot",
    "name": "Free",
    "price": 0,
    "type": "individual",
    "models": ["GPT-4o"],
    "limits": "2000 suggestions/month, 50 chat/month, 50 premium requests/month",
    "features": ["Code suggestions", "Limited Copilot Chat", "VS Code and JetBrains support"]
  },
  {
    "id": "github-copilot-pro",
    "tool": "github-copilot",
    "name": "Pro",
    "price": 10,
    "type": "individual",
    "models": ["GPT-4o", "Claude 3.5 Sonnet"],
    "limits": "Unlimited suggestions, unlimited chat, 300 premium requests/month",
    "features": ["Unlimited code suggestions", "Unlimited Copilot Chat", "IDE and CLI integration", "Multi-file editing"]
  },
  {
    "id": "github-copilot-pro-plus",
    "tool": "github-copilot",
    "name": "Pro+",
    "price": 39,
    "type": "individual",
    "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 2.0", "o1"],
    "limits": "Unlimited suggestions, unlimited chat, 1500 premium requests/month",
    "features": ["Full access to all models", "Unlimited code suggestions", "Unlimited Copilot Chat", "Priority access"]
  },
  {
    "id": "github-copilot-business",
    "tool": "github-copilot",
    "name": "Business",
    "price": 19,
    "type": "enterprise",
    "models": ["GPT-4o", "Claude 3.5 Sonnet"],
    "limits": "300 premium requests/user/month",
    "features": ["Organization-wide policy controls", "Admin dashboard", "IP indemnity", "Data excluded from training"]
  },
  {
    "id": "github-copilot-enterprise",
    "tool": "github-copilot",
    "name": "Enterprise",
    "price": 39,
    "type": "enterprise",
    "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini 2.0"],
    "limits": "1000 premium requests/user/month",
    "features": ["SAML SSO", "Audit logs", "Knowledge bases", "PR summaries", "Copilot Chat on GitHub.com"]
  },
  {
    "id": "cursor-free",
    "tool": "cursor",
    "name": "Hobby",
    "price": 0,
    "type": "individual",
    "models": ["cursor-small"],
    "limits": "Limited completions, limited slow requests/month",
    "features": ["Basic AI completions", "Cursor editor access", "Community support"]
  },
  {
    "id": "cursor-pro",
    "tool": "cursor",
    "name": "Pro",
    "price": 20,
    "type": "individual",
    "models": ["GPT-4", "GPT-4o", "Claude 3.5 Sonnet"],
    "limits": "$20 usage credits/month for frontier models",
    "features": ["Unlimited Tab completions", "Auto mode", "$20 monthly credit pool", "All premium models"]
  },
  {
    "id": "cursor-pro-plus",
    "tool": "cursor",
    "name": "Pro+",
    "price": 60,
    "type": "individual",
    "models": ["GPT-4", "GPT-4o", "Claude 3.5 Sonnet", "GPT-4.5"],
    "limits": "~3x Pro credits/month",
    "features": ["Everything in Pro", "3x monthly credits", "Priority support", "Power user features"]
  },
  {
    "id": "cursor-ultra",
    "tool": "cursor",
    "name": "Ultra",
    "price": 200,
    "type": "individual",
    "models": ["GPT-4", "GPT-4o", "Claude 3.5 Sonnet", "GPT-4.5", "o1"],
    "limits": "~20x Pro credits/month",
    "features": ["Everything in Pro+", "20x monthly credits", "Early access to features", "Priority access to new models"]
  },
  {
    "id": "cursor-teams",
    "tool": "cursor",
    "name": "Teams",
    "price": 40,
    "type": "enterprise",
    "models": ["GPT-4", "GPT-4o", "Claude 3.5 Sonnet"],
    "limits": "500 credits/user/month",
    "features": ["Centralized billing", "Team management", "Admin dashboard", "Shared settings"]
  },
  {
    "id": "claude-code-free",
    "tool": "claude-code",
    "name": "Free",
    "price": 0,
    "type": "individual",
    "models": ["Claude 3.5 Sonnet"],
    "limits": "Limited messages per 5-hour window",
    "features": ["Basic Claude Code access", "Web interface", "Lower priority during peak"]
  },
  {
    "id": "claude-code-pro",
    "tool": "claude-code",
    "name": "Pro",
    "price": 20,
    "type": "individual",
    "models": ["Claude 3.5 Sonnet", "Claude 3 Opus"],
    "limits": "5x Free usage (~45 messages/5 hours)",
    "features": ["Higher rate limits", "Priority access", "Projects and Artifacts", "Early feature access"]
  },
  {
    "id": "claude-code-max-5x",
    "tool": "claude-code",
    "name": "Max 5x",
    "price": 100,
    "type": "individual",
    "models": ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 4"],
    "limits": "5x Pro usage (~25x Free per 5-hour window)",
    "features": ["Heavy coding workloads", "Larger repos support", "Higher performance", "Priority above Pro"]
  },
  {
    "id": "claude-code-max-20x",
    "tool": "claude-code",
    "name": "Max 20x",
    "price": 200,
    "type": "individual",
    "models": ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude 4", "All models"],
    "limits": "20x Pro usage (highest consumer limits)",
    "features": ["Intensive development", "Large codebases", "All models access", "Earliest feature access"]
  },
  {
    "id": "claude-code-team",
    "tool": "claude-code",
    "name": "Team",
    "price": 30,
    "type": "enterprise",
    "models": ["Claude 3.5 Sonnet", "Claude 3 Opus"],
    "limits": "Shared team quota pool (min 5 seats)",
    "features": ["Collaborative workspaces", "Admin controls", "SSO management", "Slack/Teams integration"]
  },
  {
    "id": "windsurf-free",
    "tool": "windsurf",
    "name": "Free",
    "price": 0,
    "type": "individual",
    "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini"],
    "limits": "25 prompt credits/month",
    "features": ["Access to leading models", "Windsurf IDE", "1 app deployment/day", "Zero-data-retention mode"]
  },
  {
    "id": "windsurf-pro",
    "tool": "windsurf",
    "name": "Pro",
    "price": 15,
    "type": "individual",
    "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini", "SWE-1"],
    "limits": "500 prompt credits/month",
    "features": ["Full Windsurf IDE", "Priority model access", "5 app deployments/day", "Add-on credits available ($10/250)"]
  },
  {
    "id": "windsurf-teams",
    "tool": "windsurf",
    "name": "Teams",
    "price": 30,
    "type": "enterprise",
    "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini", "SWE-1"],
    "limits": "500 prompt credits/user/month",
    "features": ["Centralized billing", "Admin dashboard", "Windsurf Reviews", "Priority support", "SSO add-on ($10/user)"]
  },
  {
    "id": "windsurf-enterprise",
    "tool": "windsurf",
    "name": "Enterprise",
    "price": 60,
    "type": "enterprise",
    "models": ["GPT-4o", "Claude 3.5 Sonnet", "Gemini", "SWE-1", "All models"],
    "limits": "1000 prompt credits/user/month",
    "features": ["SSO & RBAC included", "Hybrid deployment", "Volume discounts (200+ users)", "Dedicated account management"]
  }
]
```

### Endpoints de API

| Método | Path | Descrição | Response |
|--------|------|-----------|----------|
| `GET` | `/plans` | Retorna todos os planos | `Plan[]` |
| `GET` | `/health` | Health check (existente) | `{ status: string, timestamp: string }` |

**Exemplo de resposta `/plans`:**

```json
[
  {
    "id": "github-copilot-free",
    "tool": "github-copilot",
    "name": "Free",
    "price": 0,
    "type": "individual",
    "models": ["GPT-4o"],
    "limits": "2000 suggestions/month",
    "features": ["Code suggestions"]
  }
]
```

## Pontos de Integração

**Não há integrações externas.** Os dados são estáticos e servidos internamente. A comunicação ocorre apenas entre frontend e backend via HTTP local.

- **Frontend → Backend**: Axios para chamadas HTTP ao endpoint `/plans`
- **CORS**: Já configurado no backend existente

## Abordagem de Testes

### Testes Unidade

**Componentes a testar:**
- `filterPlansByBudget(plans, maxBudget)` - Lógica de filtro por orçamento
- `filterPlansByType(plans, type)` - Lógica de filtro por tipo
- `sortPlansByPrice(plans)` - Ordenação descendente por preço
- `formatCurrency(value)` - Formatação monetária USD

**Cenários críticos:**
```typescript
// filter-plans.test.ts
describe('filterPlansByBudget', () => {
  it('should return plans with price <= budget', () => {});
  it('should return empty array when no plans match', () => {});
  it('should return all plans when budget is 200', () => {});
});

describe('filterPlansByType', () => {
  it('should filter only individual plans', () => {});
  it('should filter only enterprise plans', () => {});
  it('should return all plans when type is all', () => {});
});
```

**Requisitos de mock:**
- Mock do fetch/axios para testes de `usePlans` hook

### Testes de Integração

**Componentes a testar juntos:**
- `App` + `BudgetSlider` + `PlanGrid` - Integração do fluxo de filtro
- `usePlans` hook com mock de API response

**Dados de teste:**
- Fixture com subset de planos representativos (1 plano por ferramenta)

### Testes de E2E

**Cenários Playwright:**
1. Carregar página e verificar grid com 4 colunas
2. Mover slider para $50 e verificar planos filtrados
3. Alternar filtro Individual/Enterprise e verificar mudança
4. Toggle de tema claro/escuro
5. Responsividade em viewport mobile

**Configuração Playwright:**
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './e2e',
  baseURL: 'http://localhost:5173',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
});
```

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Backend: Estrutura de dados e endpoint** (fundação)
   - Criar `src/data/plans.json` com dados completos
   - Criar tipos em `src/types/plan.ts`
   - Implementar rota `GET /plans` em `src/routes/plans.ts`
   - Carregar dados em memória no startup

2. **Frontend: Conversão para TypeScript** (preparação)
   - Renomear `.jsx` → `.tsx` e `.js` → `.ts`
   - Adicionar tipos necessários
   - Instalar dependências: `@radix-ui/react-slider`, axios

3. **Frontend: Componentes UI base** (dependência do shadcn/ui)
   - Instalar componente Slider do shadcn/ui
   - Criar `ThemeToggle` com persistência em localStorage
   - Criar `useTheme` hook

4. **Frontend: Componentes de negócio** (core feature)
   - Implementar `usePlans` hook com fetch e filtros
   - Criar `BudgetSlider` com valor em tempo real
   - Criar `PlanCard` com design responsivo
   - Criar `PlanGrid` com 4 colunas fixas
   - Criar `PlanTypeFilter` toggle

5. **Frontend: Composição e integração** (montagem)
   - Integrar componentes no `App.tsx`
   - Implementar animações de entrada/saída de cards
   - Ajustar responsividade para mobile

6. **Testes** (validação)
   - Configurar Jest para frontend
   - Escrever testes unitários
   - Configurar Playwright
   - Escrever testes E2E

### Dependências Técnicas

**Novas dependências backend:**
- Nenhuma (Express já instalado)

**Novas dependências frontend:**
```json
{
  "dependencies": {
    "@radix-ui/react-slider": "^1.x",
    "axios": "^1.x"
  },
  "devDependencies": {
    "@types/jest": "^29.x",
    "jest": "^29.x",
    "ts-jest": "^29.x",
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "@playwright/test": "^1.x"
  }
}
```

## Monitoramento e Observabilidade

**Logs principais:**
- `console.log('Plans loaded', { count: plans.length })` - Startup do backend
- `console.error('Failed to load plans', { error })` - Erro de leitura do JSON

**Métricas sugeridas (futuro):**
- Tempo de resposta do endpoint `/plans`
- Interações com slider (client-side analytics)

**Nível de log:** DEBUG para desenvolvimento, ERROR para produção.

## Considerações Técnicas

### Decisões Principais

| Decisão | Justificativa | Alternativas Rejeitadas |
|---------|---------------|------------------------|
| Dados em memória | Volume pequeno (~20 planos), performance máxima | Leitura de arquivo a cada request (I/O desnecessário) |
| Filtro client-side | Responsividade instantânea, dados já em memória no cliente | Server-side filtering (latência de rede) |
| shadcn/ui Slider | Acessibilidade nativa, customizável, já na stack | Implementação custom (retrabalho) |
| JSON estático | Simplicidade, sem necessidade de DB | SQLite, banco externo (over-engineering) |
| TypeScript | Type safety, alinhado com rules do projeto | JavaScript puro |

### Riscos Conhecidos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Preços desatualizados | Alta | Médio | Documentar fonte e data; JSON fácil de atualizar |
| Performance em mobile | Baixa | Médio | Usar `useMemo` para filtros; testar em dispositivos |
| Acessibilidade do slider | Baixa | Alto | Radix UI já é ARIA-compliant; testar com screen reader |

### Conformidade com Padrões

**Rules aplicáveis (`@.windsurf/rules`):**

- **`code-standards.md`**: camelCase para variáveis/funções, PascalCase para componentes, kebab-case para arquivos, código em inglês
- **`node.md`**: TypeScript obrigatório, `const` preferido, `async/await`, imports ES6, tipos fortes (sem `any`)
- **`http.md`**: Express para endpoints, padrão REST (`GET /plans`), JSON response, status 200/500
- **`react.md`**: Componentes funcionais, TailwindCSS, hooks customizados com prefixo `use`, `useMemo` para filtros
- **`logging.md`**: `console.log`/`console.error`, sem dados sensíveis, mensagens claras
- **`tests.md`**: Jest, AAA pattern, testes independentes, cobertura completa

### Arquivos relevantes e dependentes

**Backend:**
- `backend/src/index.ts` - Modificar para incluir rota /plans
- `backend/src/data/plans.json` - Novo arquivo de dados
- `backend/src/routes/plans.ts` - Nova rota
- `backend/src/types/plan.ts` - Novos tipos
- `backend/package.json` - Sem alterações

**Frontend:**
- `frontend/src/App.jsx` → `App.tsx` - Refatorar completamente
- `frontend/src/main.jsx` → `main.tsx` - Converter para TS
- `frontend/src/lib/utils.js` → `utils.ts` - Converter para TS
- `frontend/src/index.css` - Sem alterações (já tem tema dark)
- `frontend/src/components/ui/button.jsx` → `button.tsx` - Converter
- `frontend/package.json` - Adicionar dependências
- `frontend/tsconfig.json` - Verificar configuração
- `frontend/playwright.config.ts` - Nova configuração E2E

**Novos arquivos frontend:**
- `frontend/src/components/BudgetSlider.tsx`
- `frontend/src/components/PlanGrid.tsx`
- `frontend/src/components/PlanCard.tsx`
- `frontend/src/components/PlanTypeFilter.tsx`
- `frontend/src/components/ThemeToggle.tsx`
- `frontend/src/components/ui/slider.tsx`
- `frontend/src/hooks/usePlans.ts`
- `frontend/src/hooks/useTheme.ts`
- `frontend/src/types/plan.ts`
- `frontend/e2e/comparator.spec.ts`
