# Tarefa 3.0: Frontend - Implementação completa do Comparador

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar toda a funcionalidade do comparador de planos de AI, incluindo hooks, componentes, filtros, tema e integração final no App.tsx.

<requirements>
- Implementar hook `usePlans` com fetch, filtros e ordenação
- Implementar hook `useTheme` com persistência em localStorage
- Implementar componente `BudgetSlider` ($0-$200, passo $10)
- Implementar componentes `PlanCard` e `PlanGrid` (4 colunas fixas)
- Implementar componente `PlanTypeFilter` (Individual/Enterprise/All)
- Implementar componente `ThemeToggle` (claro/escuro)
- Integrar todos os componentes no `App.tsx`
- Layout responsivo para mobile
- Animações suaves de entrada/saída de cards
</requirements>

## Subtarefas

### Hooks
- [ ] 3.1 Criar `frontend/src/hooks/usePlans.ts` com:
  - Fetch de dados do endpoint `/plans`
  - Estado de loading e error
  - Função `filterByBudget(maxBudget: number)`
  - Função `filterByType(type: 'individual' | 'enterprise' | 'all')`
  - Ordenação descendente por preço
  - Uso de `useMemo` para filtros

- [ ] 3.2 Criar `frontend/src/hooks/useTheme.ts` com:
  - Estado do tema (light/dark)
  - Persistência em localStorage
  - Toggle de tema

### Componentes UI
- [ ] 3.3 Instalar componente Slider do shadcn/ui em `frontend/src/components/ui/slider.tsx`

- [ ] 3.4 Criar `frontend/src/components/BudgetSlider.tsx` com:
  - Slider de $0 a $200
  - Passo de $10
  - Valor inicial $0
  - Exibição do valor em tempo real
  - Formatação monetária USD (ex: "$ 50.00")

- [ ] 3.5 Criar `frontend/src/components/PlanCard.tsx` com:
  - Nome do plano
  - Preço mensal
  - Modelos principais (lista)
  - Limites de uso
  - Features (lista)
  - Distinção visual entre níveis de planos

- [ ] 3.6 Criar `frontend/src/components/PlanGrid.tsx` com:
  - 4 colunas fixas (GitHub Copilot, Cursor, Claude Code, Windsurf)
  - Cabeçalho com nome da ferramenta
  - Exibição cumulativa de planos elegíveis
  - Ordenação descendente por preço em cada coluna
  - Colunas visíveis mesmo se vazias

- [ ] 3.7 Criar `frontend/src/components/PlanTypeFilter.tsx` com:
  - Toggle/Tabs para: All, Individual, Enterprise
  - Estado controlado pelo pai

- [ ] 3.8 Criar `frontend/src/components/ThemeToggle.tsx` com:
  - Botão para alternar tema claro/escuro
  - Ícone visual indicando tema atual

### Integração
- [ ] 3.9 Modificar `frontend/src/App.tsx` para:
  - Integrar todos os componentes
  - Gerenciar estado global (budget, type filter)
  - Layout responsivo
  - Animações de entrada/saída de cards

### Responsividade
- [ ] 3.10 Implementar layout responsivo:
  - Desktop: 4 colunas lado a lado
  - Tablet: 2 colunas
  - Mobile: 1 coluna ou scroll horizontal

## Detalhes de Implementação

Consultar a seção **"Interfaces Principais"** em `techspec.md` para:
- Interface `UsePlansReturn`
- Estrutura dos hooks

Consultar a seção **"Funcionalidades Principais"** em `prd.md` para:
- Comportamento do slider
- Lógica de exibição cumulativa
- Ordenação dos planos

Consultar a seção **"Experiência do Usuário (UX)"** em `prd.md` para:
- Requisitos de animação
- Formatação monetária
- Responsividade

## Critérios de Sucesso

- Slider funciona de $0 a $200 com passo de $10
- Planos são filtrados em tempo real ao mover slider
- Filtro Individual/Enterprise funciona corretamente
- Toggle de tema persiste em localStorage
- Grid exibe 4 colunas com ferramentas corretas
- Ordenação descendente por preço
- Layout responsivo em mobile
- Animações suaves
- Sem erros de TypeScript

## Testes da Tarefa

- [ ] Testes de unidade
  - `filterPlansByBudget(plans, maxBudget)` - retorna planos com price <= budget
  - `filterPlansByType(plans, type)` - filtra por individual/enterprise/all
  - `sortPlansByPrice(plans)` - ordena descendente
  - `formatCurrency(value)` - formata como USD

- [ ] Testes de integração
  - Hook `usePlans` com mock de API
  - Componentes renderizam corretamente
  - Interação slider atualiza grid

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

**Novos arquivos:**
- `frontend/src/hooks/usePlans.ts`
- `frontend/src/hooks/useTheme.ts`
- `frontend/src/components/ui/slider.tsx`
- `frontend/src/components/BudgetSlider.tsx`
- `frontend/src/components/PlanCard.tsx`
- `frontend/src/components/PlanGrid.tsx`
- `frontend/src/components/PlanTypeFilter.tsx`
- `frontend/src/components/ThemeToggle.tsx`

**Arquivos a modificar:**
- `frontend/src/App.tsx`
- `frontend/src/index.css` (se necessário ajustes de tema)
