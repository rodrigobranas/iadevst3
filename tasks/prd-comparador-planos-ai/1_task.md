# Tarefa 1.0: Backend - Estrutura de dados e endpoint /plans

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar a fundação do backend com o arquivo de dados JSON contendo todos os planos das 4 ferramentas de AI e o endpoint REST para servir esses dados.

<requirements>
- Criar arquivo `plans.json` com dados completos dos 20 planos (conforme techspec.md)
- Criar tipos TypeScript para a interface `Plan`
- Implementar rota `GET /plans` que retorna todos os planos
- Carregar dados em memória no startup do servidor
- Retornar status 200 com array de planos
- Retornar status 500 em caso de erro
</requirements>

## Subtarefas

- [ ] 1.1 Criar arquivo `backend/src/data/plans.json` com todos os 20 planos (GitHub Copilot, Cursor, Claude Code, Windsurf)
- [ ] 1.2 Criar arquivo `backend/src/types/plan.ts` com interface `Plan`
- [ ] 1.3 Criar arquivo `backend/src/routes/plans.ts` com rota GET /plans
- [ ] 1.4 Modificar `backend/src/index.ts` para registrar a nova rota
- [ ] 1.5 Criar testes unitários para o endpoint

## Detalhes de Implementação

Consultar a seção **"Modelos de Dados"** em `techspec.md` para:
- Estrutura completa do `plans.json` com todos os 20 planos
- Interface TypeScript `Plan` com campos: id, tool, name, price, type, models, limits, features

Consultar a seção **"Endpoints de API"** em `techspec.md` para:
- Especificação do endpoint `GET /plans`
- Formato de resposta esperado

## Critérios de Sucesso

- Endpoint `GET /plans` retorna array JSON com 20 planos
- Cada plano contém todos os campos obrigatórios (id, tool, name, price, type, models, limits, features)
- Dados carregados em memória no startup (log de confirmação)
- Tipos TypeScript sem erros de compilação (`npx tsc --noEmit`)
- Testes unitários passando

## Testes da Tarefa

- [ ] Testes de unidade para a rota GET /plans
  - Deve retornar status 200
  - Deve retornar array com 20 planos
  - Cada plano deve ter estrutura válida
- [ ] Teste de integração
  - Servidor deve iniciar e responder em /plans

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

**Novos arquivos:**
- `backend/src/data/plans.json`
- `backend/src/types/plan.ts`
- `backend/src/routes/plans.ts`

**Arquivos a modificar:**
- `backend/src/index.ts`
