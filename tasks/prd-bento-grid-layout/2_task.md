# Tarefa 2.0: Testes E2E Playwright

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar testes end-to-end com Playwright para validar o comportamento completo do Bento Grid Layout, incluindo balanceamento de altura, animações, troca de tema e responsividade.

<requirements>
- Testes E2E para balanceamento de altura das colunas
- Testes E2E para animações de entrada/saída de cards
- Testes E2E para troca de tema dark/light
- Testes E2E para responsividade (desktop vs mobile)
- Testes E2E para `prefers-reduced-motion`
</requirements>

## Subtarefas

- [ ] 2.1 Criar teste E2E para validar altura balanceada das 4 colunas em desktop (tolerância de 10%)
- [ ] 2.2 Criar teste E2E para animação fade-in quando budget do slider aumenta
- [ ] 2.3 Criar teste E2E para animação fade-out quando cards são filtrados
- [ ] 2.4 Criar teste E2E para troca entre tema dark e light com cores GitHub aplicadas
- [ ] 2.5 Criar teste E2E para layout single-column em viewport mobile
- [ ] 2.6 Criar teste E2E para `prefers-reduced-motion` (emular preferência e verificar ausência de animações)

## Detalhes de Implementação

Consultar `techspec.md` seção "Testes E2E" para:
- Estrutura dos cenários Playwright
- Verificações específicas para cada cenário

**Cenários Playwright (referência):**

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

## Critérios de Sucesso

- Todos os 6 cenários E2E passando
- Testes executam em menos de 30 segundos total
- Cobertura dos requisitos funcionais do PRD:
  - RF1: Altura total de cada coluna igual ou muito próxima
  - RF15-19: Animações de entrada, saída, reorganização, hover e slider
  - RF6-7: Cores do tema dark e light aplicadas corretamente
- Testes reproduzíveis e independentes

## Testes da Tarefa

- [ ] Testes E2E
  - Balanceamento de altura das colunas
  - Animações de fade-in e fade-out
  - Troca de tema dark/light
  - Responsividade mobile
  - Suporte a prefers-reduced-motion

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

**A modificar:**
- `frontend/e2e/comparator.spec.ts` - Adicionar novos cenários E2E

**Dependentes:**
- `frontend/src/components/PlanGrid.tsx` - Componente testado
- `frontend/src/components/PlanCard.tsx` - Componente testado
- `frontend/src/index.css` - Estilos e animações testadas
