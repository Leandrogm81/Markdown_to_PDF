# CHANGELOG

## 2026-06-07 — Plano de implementação e guia UI/UX criados

### Resumo
Gerado plano de implementação completo (6 sprints, 30 tarefas) em `docs/implementation/`. Criado guia UI/UX obrigatório em `docs/design/UI_UX_GUIDE.md`. PRD v1.1 atualizado com referências ao guia. Handoff e CURRENT_STATE atualizados para continuidade.

### Arquivos afetados
- `docs/implementation/implementation-plan.md` (criado)
- `docs/implementation/task-list.md` (criado)
- `docs/implementation/test-plan.md` (criado)
- `docs/implementation/sprint-breakdown.md` (criado)
- `docs/implementation/SPRINT_00_PREPARACAO.md` (criado)
- `docs/implementation/SPRINT_01_MIGRACAO_DEPS.md` (criado)
- `docs/implementation/SPRINT_02_SANITIZACAO_NOME.md` (criado)
- `docs/implementation/SPRINT_03_REGRAS_NEGOCIO.md` (criado)
- `docs/implementation/SPRINT_04_UX_RESPONSIVIDADE.md` (criado)
- `docs/implementation/SPRINT_05_DEPLOY_VALIDACAO.md` (criado)
- `docs/design/UI_UX_GUIDE.md` (seção 16 atualizada)
- `docs/product/PRD_v1.1.md` (referências ao UI/UX Guide adicionadas)
- `docs/agent/HANDOFF.md` (atualizado)
- `docs/agent/CURRENT_STATE.md` (atualizado)

### Motivo
Transformar PRD v1.1 em plano executável para agente de código. Criar referência visual obrigatória para garantir consistência de UI/UX.

### Evidência
10 arquivos em `docs/implementation/` com sprints 0-5, 30 tarefas classificadas, test-plan e sprint-breakdown. `docs/design/UI_UX_GUIDE.md` existe com 17 seções.

---

## 2026-06-07 — PRD v1.1 consolidado após revisão crítica

### Resumo
Gerada versão consolidada do PRD (`docs/product/PRD_v1.1.md`) incorporando correções da revisão crítica (`docs/product/PRD-review.md`). 4 achados críticos resolvidos (fidelidade preview/PDF com definição mínima, templates usando existentes, comportamento de troca de template explicitado, conflito autosave resolvido). 18 achados importantes incorporados. 1 PD novo (PD-11: tema do editor).

### Arquivos afetados
- `docs/product/PRD_v1.1.md` (criado)
- `docs/evolution/CHANGELOG.md`
- `docs/design/UI_UX_GUIDE.md` (criado — guia visual obrigatório para implementação)

### Motivo
Produzir PRD mais claro, preciso e seguro para ser usado por agente de código na geração de plano de implementação.

### Evidência
`docs/product/PRD_v1.1.md` existe com 23 seções, 14 regras de negócio, 11 pontos de decisão, 15 riscos, checklist de qualidade com todos os itens OK.

---

## 2026-06-07 — Revisão crítica do PRD

### Resumo
Revisão crítica completa do PRD mestre (`docs/product/PRD.md`). Identificados 4 achados críticos, 18 importantes e 6 opcionais. Veredito: Parcialmente pronto — 4 bloqueadores impedem geração de plano de implementação confiável.

### Arquivos afetados
- `docs/product/PRD-review.md` (criado)
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/agent/HANDOFF.md`
- `docs/evolution/CHANGELOG.md`

### Motivo
Auditar o PRD antes de gerar plano de implementação para evitar erro, retrabalho e ambiguidade na execução.

### Evidência
`docs/product/PRD-review.md` existe com 4 achados críticos (fidelidade indefinida, templates sem conteúdo, troca de template ambígua, conflito autosave), 18 achados importantes e 6 opcionais.

## 2026-06-06 — PRD mestre gerado a partir do Pré-PRD

### Resumo

Gerado o PRD mestre em `docs/product/PRD.md` com 21 seções obrigatórias, 12 funcionalidades principais, 5 fluxos de usuário, 10 pontos de decisão, 14 riscos e checklist de qualidade completo. Todas as 5 decisões críticas do usuário foram preservadas.

### Arquivos afetados

- `docs/product/PRD.md` (criado)
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/agent/HANDOFF.md`
- `docs/evolution/CHANGELOG.md`

### Motivo

Transformar o Pré-PRD investigativo em PRD final executável, pronto para planejamento de implementação.

### Evidência

`docs/product/PRD.md` existe com 1084 linhas, 21 seções, 12 funcionalidades (F-01 a F-12), 10 pontos de decisão (PD-01 a PD-10) e checklist de qualidade com todos os itens OK.

## 2026-06-06 — Todas as 5 perguntas críticas do Pré-PRD respondidas

### Resumo

Registradas as duas últimas decisões críticas: deploy na Vercel como site estático e foco em estabilização com melhorias incrementais. Todas as 5 perguntas críticas do Pré-PRD estão respondidas; o projeto está pronto para gerar o PRD mestre.

### Arquivos afetados

- `docs/product/PRE_PRD_ESCOPO.md`
- `docs/evolution/DECISIONS.md`
- `docs/evolution/CHANGELOG.md`
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/agent/HANDOFF.md`

### Motivo

Fechar todas as decisões críticas antes do PRD mestre.

### Evidência

Seção 19 do Pré-PRD: todas as 5 perguntas com status Resolvida. DECISIONS.md contém decisões novas sobre deploy e foco do próximo ciclo.

## 2026-06-06 — Decisão de política de HTML dentro do Markdown

### Resumo

Registrada decisão humana: HTML dentro do Markdown será permitido apenas com sanitização. Atualizado Pré-PRD, DECISIONS, CURRENT_STATE, next-actions e HANDOFF.

### Arquivos afetados

- `docs/product/PRE_PRD_ESCOPO.md`
- `docs/evolution/DECISIONS.md`
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/agent/HANDOFF.md`
- `docs/evolution/CHANGELOG.md`

### Motivo

Resolver a pergunta crítica 3 do Pré-PRD, que bloqueava definição de segurança antes do PRD mestre.

### Evidência

`docs/product/PRE_PRD_ESCOPO.md` seção 19, pergunta 3: resposta registrada. `docs/evolution/DECISIONS.md` contém decisão nova com contexto, impacto e status ativo.

## 2026-06-06 — Respostas parciais das perguntas críticas do Pré-PRD

### Resumo

Registradas duas decisões humanas no Pré-PRD: público principal do MVP e aceite de PDF visual/rasterizado. Também foi documentado o estado atual do HTML dentro do Markdown a partir de inspeção do código, sem transformar isso em decisão aprovada.

### Arquivos afetados

- `docs/product/PRE_PRD_ESCOPO.md`
- `docs/evolution/DECISIONS.md`
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/agent/HANDOFF.md`
- `docs/evolution/CHANGELOG.md`

### Motivo

Dar continuidade ao fechamento do escopo antes do PRD mestre, registrando apenas decisões humanas reais e mantendo HTML/Markdown como decisão pendente.

### Evidência

`docs/product/PRE_PRD_ESCOPO.md` agora marca como resolvidas as perguntas críticas sobre público principal e PDF selecionável/acessível. A pergunta sobre HTML registra que o código atual usa `marked.parse` e `dangerouslySetInnerHTML` sem sanitização visível.

## 2026-06-06 — Requisito de nome descritivo para PDF exportado

### Resumo

Incluído no Pré-PRD o requisito confirmado de que o PDF gerado não deve ter nome genérico e deve conter referência ao documento criado.

### Arquivos afetados

- `docs/product/PRE_PRD_ESCOPO.md`
- `docs/evolution/DECISIONS.md`
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/agent/HANDOFF.md`
- `docs/evolution/CHANGELOG.md`

### Motivo

Registrar uma decisão humana de produto e preparar critérios para o PRD final detalhar a regra de composição, fallback e sanitização do nome do arquivo.

### Evidência

`docs/product/PRE_PRD_ESCOPO.md` agora inclui a funcionalidade `Nome descritivo do arquivo PDF`, pergunta de detalhamento e critério inicial de aceite.

## 2026-06-06 — Criação do Pré-PRD de escopo

### Resumo

Criado o documento investigativo de Pré-PRD para o projeto `markdown-para-pdf`, usando a análise Brownfield como referência.

### Arquivos afetados

- `docs/product/PRE_PRD_ESCOPO.md`
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/evolution/CHANGELOG.md`

### Motivo

Organizar escopo inicial, hipóteses, dúvidas, riscos, brainstorming controlado e perguntas críticas antes do PRD mestre.

### Evidência

`docs/product/PRE_PRD_ESCOPO.md` criado com 24 seções obrigatórias, incluindo perguntas críticas, decisões humanas pendentes e saída de continuidade.

### Pendências

- Responder as 5 perguntas críticas do Pré-PRD.
- Gerar PRD mestre somente após avaliação das respostas críticas.

## 2026-06-06 — Preparação de continuidade de sessão

### Resumo

Criados/atualizados os documentos de continuidade para troca de sessão, modelo ou agente no Hermes Agent.

### Arquivos afetados

- `docs/agent/HANDOFF.md`
- `docs/agent/CURRENT_STATE.md`
- `docs/agent/next-actions.md`
- `docs/evolution/CHANGELOG.md`

### Motivo

Registrar o estado atual, riscos, pendências e próxima ação recomendada sem depender da conversa original.

### Evidência

Arquivos de continuidade escritos nesta preparação em 2026-06-06. `docs/evolution/DECISIONS.md` foi consultado e não recebeu decisão nova.

### Pendências

- Criar `docs/product/PRE_PRD_ESCOPO.md`.
- Confirmar controle de versão do projeto.
- Definir política de HTML/Markdown, requisito de PDF e estratégia de testes.

## 2026-05-28 - Framework v1.1 inicial

### Adicionado

- Triagem inicial e roteamento.
- Protocolo de rollback.
- Guardrails do coder economico.
- Regra de conflito entre documentos.
- Retrospectiva pos-ciclo.
- Analise Brownfield.
- Registro de componentes aprovados para UI/UX.
- Sprint 00B de fundacao de testes.
- Templates de `HANDOFF` e `CURRENT_STATE`.

### Decisao operacional

- Planilha continua como referencia principal.
- Prompts completos ficam em Markdown.
