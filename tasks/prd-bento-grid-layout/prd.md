# Documento de Requisitos de Produto (PRD) - Bento Grid Layout Estilo GitHub

## Visão Geral

Esta melhoria visa transformar o layout atual do **Comparador de Planos de AI** em um **Bento Grid** com estética inspirada no GitHub, proporcionando uma experiência visual mais moderna e alinhada com a identidade de desenvolvedores. O grid será inteligente, balanceando automaticamente a altura total das colunas para criar uma composição visual harmoniosa.

## Objetivos

1. **Modernizar a Interface**: Aplicar estilo visual inspirado no GitHub, criando identificação imediata com o público-alvo (desenvolvedores).
2. **Implementar Bento Grid Balanceado**: Garantir que a soma das alturas dos cards em cada coluna seja equivalente, criando um layout visualmente equilibrado.
3. **Melhorar a Experiência Visual**: Adicionar animações suaves e transições que reforcem a qualidade da interface.

### Métricas de Sucesso
- Percepção de qualidade visual (feedback qualitativo).
- Consistência visual entre as 4 colunas do grid.
- Fluidez das animações (sem jank ou travamentos).

## Histórias de Usuário

1. **O Desenvolvedor Visual**
   - *Como* um desenvolvedor acostumado com interfaces do GitHub, *eu quero* ver um layout familiar com bordas sutis, cores escuras e tipografia técnica, *para que* eu me sinta confortável navegando na ferramenta.

2. **O Usuário Exigente**
   - *Como* um usuário que valoriza design, *eu quero* ver um grid balanceado onde as colunas têm alturas equivalentes, *para que* a interface pareça profissional e bem acabada.

3. **O Explorador Interativo**
   - *Como* um usuário que interage com o slider, *eu quero* ver animações suaves quando cards aparecem ou desaparecem, *para que* a experiência seja fluida e agradável.

## Funcionalidades Principais

### 1. Bento Grid com Balanceamento de Altura

- **O que faz**: Organiza os cards das 4 ferramentas em um grid onde a altura total de cada coluna é equivalente.
- **Por que é importante**: Cria harmonia visual e evita colunas desproporcionais que prejudicam a estética.
- **Como funciona**:
  - Cada card tem altura proporcional à quantidade de informações exibidas.
  - O sistema calcula a altura total de cada coluna e ajusta os cards para que todas as colunas tenham altura equivalente.
  - Quando o slider muda, os cards se reorganizam automaticamente mantendo o balanceamento.
- **Requisitos Funcionais**:
  1. A altura total de cada coluna deve ser igual (ou muito próxima) às demais.
  2. Cards com mais informações (mais features, limites, modelos) devem ocupar mais espaço vertical.
  3. Ao adicionar/remover cards via slider, o grid deve recalcular e redistribuir as alturas automaticamente.
  4. O balanceamento deve considerar espaçamentos (gaps) entre os cards.

### 2. Estilo Visual GitHub

- **O que faz**: Aplica uma identidade visual inspirada no GitHub em toda a interface.
- **Por que é importante**: Cria familiaridade e credibilidade com o público-alvo de desenvolvedores.
- **Como funciona**: Aplicação consistente de padrões visuais em ambos os temas (claro e escuro).
- **Requisitos Funcionais**:
  5. **Bordas**: Cards devem ter bordas sutis (1px) com cantos arredondados (6-8px).
  6. **Cores - Tema Escuro**: Fundo em tons de cinza escuro (#0d1117, #161b22), bordas em (#30363d), texto primário (#e6edf3), texto secundário (#8b949e).
  7. **Cores - Tema Claro**: Fundo em tons de branco/cinza claro (#ffffff, #f6f8fa), bordas em (#d0d7de), texto primário (#1f2328), texto secundário (#656d76).
  8. **Tipografia**: Fonte sans-serif para textos gerais; fonte monospace para valores numéricos (preços, limites).
  9. **Badges/Tags**: Nomes de planos (Free, Pro, Business) devem usar badges estilizados com cores distintas.
  10. **Hover States**: Cards devem ter efeito hover sutil (elevação de borda ou mudança de cor de fundo).
  11. **Ícones**: Utilizar ícones minimalistas e consistentes (estilo Octicons ou similar).

### 3. Cards de Plano com Altura Dinâmica

- **O que faz**: Cada card ocupa espaço vertical proporcional ao seu conteúdo.
- **Por que é importante**: Permite que planos com mais features sejam visualmente destacados sem desperdiçar espaço.
- **Como funciona**:
  - Cards com mais informações (modelos, limites, features) crescem verticalmente.
  - Cards com menos informações são mais compactos.
  - O sistema de grid distribui o espaço restante para manter o balanceamento.
- **Requisitos Funcionais**:
  12. A altura do card deve ser determinada pela quantidade de informações exibidas.
  13. Deve haver uma altura mínima para garantir legibilidade mesmo em cards com pouca informação.
  14. O conteúdo interno deve ter espaçamento consistente (padding uniforme).

### 4. Animações Estilo GitHub

- **O que faz**: Adiciona transições e animações suaves nas interações.
- **Por que é importante**: Melhora a percepção de qualidade e fluidez da interface.
- **Como funciona**: Animações CSS com timing functions apropriadas.
- **Requisitos Funcionais**:
  15. **Transição de entrada**: Cards devem aparecer com fade-in suave (200-300ms).
  16. **Transição de saída**: Cards devem desaparecer com fade-out suave (150-200ms).
  17. **Reorganização**: Quando o grid se reorganiza, os cards devem animar para suas novas posições (ease-out, 200ms).
  18. **Hover**: Transições de hover devem ser rápidas (150ms).
  19. **Slider**: O feedback visual ao mover o slider deve ser instantâneo (sem delay perceptível).

## Experiência do Usuário (UX)

- **Consistência Visual**: O estilo GitHub deve ser aplicado uniformemente em todos os elementos (slider, cards, cabeçalhos, badges).
- **Feedback Imediato**: Todas as interações devem ter resposta visual imediata.
- **Hierarquia Clara**: O balanceamento do grid não deve prejudicar a hierarquia de informação (planos mais caros ainda devem estar no topo).
- **Acessibilidade**: 
  - Contraste de cores deve atender WCAG AA.
  - Animações devem respeitar `prefers-reduced-motion`.
- **Responsividade**:
  - **Desktop**: Grid de 4 colunas com balanceamento de altura.
  - **Mobile**: Stack vertical simples (sem necessidade de balanceamento entre colunas).

## Restrições Técnicas de Alto Nível

- **CSS Grid/Flexbox**: Utilizar CSS Grid ou Flexbox para implementação do Bento Grid.
- **Performance**: Animações devem usar propriedades otimizadas (transform, opacity) para evitar repaints.
- **Cálculo de Altura**: O balanceamento deve ser calculado no cliente, considerando o conteúdo renderizado.
- **Temas**: A implementação deve suportar troca dinâmica entre tema claro e escuro.

## Fora de Escopo

- Customização de cores pelo usuário.
- Animações complexas (parallax, 3D transforms).
- Suporte a temas além de claro e escuro.
- Balanceamento de altura em layouts mobile.
- Drag-and-drop de cards.
- Persistência de preferências de layout.

## Questões em Aberto

- Definir comportamento exato quando uma coluna fica vazia (manter espaço ou colapsar?).
R: Manter espaço
- Determinar se o balanceamento deve priorizar altura exata ou permitir pequenas variações para melhor distribuição de conteúdo.
R: permitir pequenas variações -2px
