# Tarefa 2.0: Frontend - Conversão para TypeScript e setup

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Preparar o frontend para TypeScript, convertendo arquivos existentes e instalando as dependências necessárias para a implementação do comparador.

<requirements>
- Converter todos os arquivos `.jsx` para `.tsx`
- Converter todos os arquivos `.js` para `.ts`
- **APAGAR os arquivos `.jsx` e `.js` originais após a conversão**
- Instalar dependências: `axios`, `@radix-ui/react-slider`
- Criar tipos TypeScript compartilhados para `Plan`
- Garantir que o projeto compila sem erros
</requirements>

## Subtarefas

- [ ] 2.1 Converter `frontend/src/App.jsx` para `frontend/src/App.tsx` e **APAGAR** o arquivo `.jsx`
- [ ] 2.2 Converter `frontend/src/main.jsx` para `frontend/src/main.tsx` e **APAGAR** o arquivo `.jsx`
- [ ] 2.3 Converter `frontend/src/lib/utils.js` para `frontend/src/lib/utils.ts` e **APAGAR** o arquivo `.js`
- [ ] 2.4 Converter `frontend/src/components/ui/button.jsx` para `frontend/src/components/ui/button.tsx` e **APAGAR** o arquivo `.jsx`
- [ ] 2.5 Instalar dependências: `npm install axios @radix-ui/react-slider`
- [ ] 2.6 Criar arquivo `frontend/src/types/plan.ts` com interface `Plan`
- [ ] 2.7 Verificar configuração do `tsconfig.json`
- [ ] 2.8 Executar `npx tsc --noEmit` para validar tipagem

## Detalhes de Implementação

Consultar a seção **"Interfaces Principais"** em `techspec.md` para:
- Interface `Plan` completa com todos os campos tipados
- Tipos para `tool` (union type) e `type` (union type)

Consultar a seção **"Dependências Técnicas"** em `techspec.md` para:
- Lista completa de dependências a instalar

## Critérios de Sucesso

- Nenhum arquivo `.jsx` ou `.js` restante no projeto (exceto configs)
- Projeto compila sem erros (`npx tsc --noEmit`)
- `npm run dev` inicia sem erros
- Tipos `Plan` exportados e prontos para uso
- Dependências instaladas no `package.json`

## Testes da Tarefa

- [ ] Testes de unidade
  - Verificar que tipos `Plan` estão corretos
- [ ] Testes de integração
  - Aplicação deve iniciar corretamente após conversão
  - `npm run dev` deve funcionar sem erros

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

**Arquivos a converter (e depois APAGAR originais):**
- `frontend/src/App.jsx` → `frontend/src/App.tsx`
- `frontend/src/main.jsx` → `frontend/src/main.tsx`
- `frontend/src/lib/utils.js` → `frontend/src/lib/utils.ts`
- `frontend/src/components/ui/button.jsx` → `frontend/src/components/ui/button.tsx`

**Novos arquivos:**
- `frontend/src/types/plan.ts`

**Arquivos a verificar:**
- `frontend/tsconfig.json`
- `frontend/package.json`
