# Tarefa 1.0: Implementar Bento Grid Layout com Estilo GitHub

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar o layout Bento Grid completo com estética GitHub, incluindo variáveis CSS do tema (dark/light), classes de animação, configuração do Tailwind, refatoração dos componentes PlanCard e PlanGrid, e testes unitários/integração.

<requirements>
- Variáveis CSS do tema GitHub (cores dark e light)
- Classes de animação CSS (fade-in, fade-out, reposition)
- Suporte a `prefers-reduced-motion`
- Configuração Tailwind com cores GitHub e fonte monospace
- PlanCard com bordas 1px, cantos 6-8px, hover states, tipografia monospace e badges
- PlanGrid com CSS Grid `grid-auto-rows: 1fr` para balanceamento de altura
- Responsividade: 4 colunas desktop, 1 coluna mobile
- Testes unitários para PlanCard e PlanGrid
- Testes de integração para fluxo completo
</requirements>

## Subtarefas

### CSS e Configuração
- [x] 1.1 Adicionar variáveis CSS do tema GitHub dark em `index.css` (#0d1117, #161b22, #30363d, #e6edf3, #8b949e)
- [x] 1.2 Adicionar variáveis CSS do tema GitHub light em `index.css` (#ffffff, #f6f8fa, #d0d7de, #1f2328, #656d76)
- [x] 1.3 Criar classes de animação CSS: fade-in (200-300ms), fade-out (150-200ms), reposition (200ms ease-out)
- [x] 1.4 Adicionar media query `prefers-reduced-motion` para desabilitar animações
- [x] 1.5 Configurar `tailwind.config.js` com cores GitHub e fonte monospace

### Componente PlanCard
- [x] 1.6 Aplicar bordas sutis (1px) e cantos arredondados (6-8px)
- [x] 1.7 Implementar hover states (elevação de borda ou mudança de cor de fundo, transição 150ms)
- [x] 1.8 Adicionar `font-mono` para valores numéricos (preços, limites)
- [x] 1.9 Estilizar badges de tier (Free, Pro, Business) com cores distintas
- [x] 1.10 Utilizar ícones Lucide (já disponível via shadcn/ui)

### Componente PlanGrid
- [x] 1.11 Implementar CSS Grid com `grid-auto-rows: 1fr` para balanceamento de altura
- [x] 1.12 Adicionar classes de animação nos cards (entrada, saída, reorganização)
- [x] 1.13 Implementar responsividade: 4 colunas em desktop, 1 coluna em mobile
- [x] 1.14 Manter espaço para colunas vazias (não colapsar)

### Testes
- [x] 1.15 Criar/atualizar testes unitários para PlanCard
- [x] 1.16 Criar/atualizar testes unitários para PlanGrid
- [x] 1.17 Criar testes de integração para fluxo completo (App + PlanGrid + PlanCard)
- [x] 1.18 Criar testes de integração para troca de tema (useTheme + componentes)

## Detalhes de Implementação

Consultar `techspec.md` para:
- Interface `GitHubThemeColors` com estrutura de cores
- Interface `PlanCardAnimationState` para estados de animação
- Sequenciamento de desenvolvimento (seção "Ordem de Construção")
- Decisões técnicas e justificativas (seção "Decisões Principais")

## Critérios de Sucesso

- Todas as 4 colunas do grid têm altura equivalente (tolerância de ±2px conforme PRD)
- Animações fluidas sem jank (usando transform e opacity)
- Contraste de cores atende WCAG AA
- Tema dark e light funcionando corretamente
- Layout responsivo: 4 colunas desktop, 1 coluna mobile
- Todos os testes unitários e de integração passando
- Tipografia monospace aplicada em preços e limites
- Badges de tier com cores distintas e legíveis

## Testes da Tarefa

- [x] Testes de unidade
  - PlanCard: classes de tier, renderização de badges, formatação monospace, hover states
  - PlanGrid: estrutura de 4 colunas, distribuição de cards, placeholder para colunas vazias
- [x] Testes de integração
  - Fluxo completo de filtragem via slider e exibição de cards
  - Troca de tema dark/light com aplicação correta das cores GitHub

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

**A modificar:**
- `frontend/src/index.css` - Variáveis CSS e animações
- `frontend/tailwind.config.js` - Cores e fontes
- `frontend/src/components/PlanGrid.tsx` - Layout grid
- `frontend/src/components/PlanCard.tsx` - Estilo cards
- `frontend/src/components/PlanGrid.test.tsx` - Testes grid (criar se não existir)
- `frontend/src/components/PlanCard.test.tsx` - Testes card (criar se não existir)

**Dependentes (verificar compatibilidade):**
- `frontend/src/App.tsx` - Consome PlanGrid
- `frontend/src/hooks/useTheme.ts` - Sistema de temas
