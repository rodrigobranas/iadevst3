# Documento de Requisitos de Produto (PRD) - Comparador de Planos de AI para Desenvolvedores

## Visão Geral

O **Comparador de Planos de AI para Desenvolvedores** é uma funcionalidade interativa projetada para auxiliar desenvolvedores e gestores técnicos a tomarem decisões financeiras informadas sobre ferramentas de assistência de código baseadas em IA. 

A funcionalidade permite que o usuário defina um orçamento mensal (entre $0 e $200) através de um controle deslizante (slider) e visualize instantaneamente quais planos das principais ferramentas do mercado (GitHub Copilot, Cursor, Claude Code e Windsurf) se encaixam nesse valor. A exibição é cumulativa, mostrando todas as opções acessíveis até o teto definido, facilitando a comparação entre diferentes níveis de serviço (ex: Free vs Pro vs Business).

## Objetivos

1.  **Facilitar a Tomada de Decisão Financeira**: Permitir que o usuário visualize rapidamente o poder de compra de seu orçamento mensal em relação às ferramentas de AI.
2.  **Comparação Lado a Lado**: Exibir as opções das 4 principais ferramentas simultaneamente para fácil comparação.
3.  **Visualização Cumulativa**: Garantir que o usuário veja não apenas o plano mais caro que pode pagar, mas todas as opções inferiores que gerariam economia.

### Métricas de Sucesso
-   Engajamento com o slider (tempo de interação).
-   Clareza na visualização (ausência de erros de interpretação sobre qual plano cabe no bolso).

## Histórias de Usuário

1.  **O Desenvolvedor Individual (Orçamento Limitado)**
    -   *Como* um desenvolvedor freelancer, *eu quero* definir meu limite de gastos em $20 para ver quais ferramentas oferecem planos Pro nesse valor e quais só posso usar na versão Free, *para que* eu possa escolher a melhor ferramenta que cabe no meu bolso.

2.  **O Tech Lead (Orçamento Corporativo)**
    -   *Como* um Tech Lead, *eu quero* simular um orçamento de $100 ou $200, *para que* eu possa ver quais ferramentas oferecem planos "Business" ou "Enterprise" e comparar se vale a pena o upgrade em relação aos planos individuais listados abaixo.

3.  **O Curioso (Exploração)**
    -   *Como* um usuário interessado, *eu quero* arrastar o slider de $0 a $200, *para que* eu possa entender a progressão de preços e a estratificação dos planos de cada ferramenta.

## Funcionalidades Principais

### 1. Slider de Orçamento Mensal
-   **O que faz**: Permite ao usuário selecionar um valor monetário de referência.
-   **Como funciona**: Um controle deslizante horizontal.
    -   **Faixa**: $0 a $200 (Dólares Americanos).
    -   **Passo**: $10 em $10.
    -   **Valor Inicial**: $0.
-   **Requisitos Funcionais**:
    1.  O slider deve exibir claramente o valor selecionado em tempo real.
    2.  O valor deve representar o "Orçamento Máximo Mensal".

### 2. Painel Comparativo (Grid de 4 Colunas)
-   **O que faz**: Estrutura a visualização das ferramentas.
-   **Como funciona**: Quatro colunas fixas, lado a lado, independentemente do valor selecionado.
-   **Ferramentas Fixas**:
    1.  GitHub Copilot
    2.  Cursor
    3.  Claude Code
    4.  Windsurf
-   **Requisitos Funcionais**:
    3.  As colunas devem permanecer visíveis mesmo se vazias (caso nenhum plano se encaixe no orçamento, o que é raro dado os planos Free, mas possível conceitualmente).
    4.  Cabeçalho de cada coluna deve conter o nome e logo (opcional) da ferramenta.

### 3. Exibição Cumulativa de Planos
-   **O que faz**: Lista os planos elegíveis dentro de cada coluna.
-   **Lógica de Negócio**:
    -   Mostrar planos onde `Preço do Plano <= Valor do Slider`.
    -   **Ordenação**: Do maior preço para o menor (descendente).
    -   *Exemplo*: Se o slider está em $50, e a ferramenta tem planos de $0, $20 e $40 -> Exibir: Plano $40 (topo), Plano $20 (meio), Plano $0 (fundo).
-   **Requisitos Funcionais**:
    5.  Atualizar a lista de planos instantaneamente ao mover o slider.
    6.  Se nenhum plano for elegível, a coluna permanece vazia (estado "vazio").

### 4. Cartão de Plano
-   **O que faz**: Representa um plano específico (ex: "Pro", "Free").
-   **Conteúdo**:
    -   Nome do Plano.
    -   Preço Mensal.
    -   Modelos Principais.
    -   Limites de uso.
    -   Outras informações relevantes que diferenciem de outros planos e ferramentas
-   **Requisitos Funcionais**:
    7.  Deve distinguir visualmente diferentes níveis de planos.

## Experiência do Usuário (UX)

-   **Interatividade**: A resposta ao slider deve ser fluida e sem "engasgos" (updates otimizados).
-   **Feedback Visual**:
    -   Animação suave ao adicionar/remover cartões conforme o orçamento aumenta/diminui é desejável.
    -   O valor monetário deve ser formatado corretamente (ex: "$ 50.00").
-   **Responsividade**: O layout de 4 colunas deve se adaptar a telas menores (possivelmente stackando ou permitindo scroll horizontal em mobile), mantendo a usabilidade.
-   **Design Visual**: O estilo visual (cores, tipografia) deve seguir um padrão moderno, similar ao do GitHub, com tema claro e escuro

## Restrições Técnicas de Alto Nível

-   **Stack Tecnológico**: Utilizar os projetos existentes nas pastas frontend e backend
-   **Fonte de Dados**: As informações dos planos devem ser persistidas em um arquivo .json, no backend e retornar por meio de um endpoint /plans
-   **Performance**: O filtro deve ocorrer no cliente (client-side filtering) dado o pequeno volume de dados.

## Fora de Escopo

-   Integração com APIs das ferramentas para obter preços em tempo real.
-   Funcionalidade de "Assinar" ou checkout direto.
-   Comparação detalhada de features (tabela feature-por-feature detalhada).
-   Outras ferramentas além das 4 listadas.
-   Moedas diferentes de Dólar Americano (USD).
-   Conversão de câmbio em tempo real.
