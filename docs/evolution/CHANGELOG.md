# CHANGELOG

## 2026-06-08 — Sprint 2 concluída: sanitização, nome do PDF, validação 8MB e confirmação

### Resumo
Sprint 2 (Sanitização e Nome do PDF) concluída com sucesso (5/5 tarefas). DOMPurify implementado com whitelist de tags/atributos. Nome do PDF segue sequência de sanitização do PRD seção 7.10. Validação de importação 8MB em drag-and-drop e file picker. Modal de confirmação antes de substituir conteúdo.

### Arquivos afetados
- `components/A4DocPreview.tsx` (DOMPurify import + sanitize após marked.parse)
- `App.tsx` (sanitizePdfName, getPdfFileName, validação 8MB, modal confirmação, importedFileName state)
- `components/Toolbar.tsx` (interface onImportFile atualizada, validação 8MB, passa fileName)
- `docs/agent/CURRENT_STATE.md` (atualizado)
- `docs/agent/next-actions.md` (atualizado)
- `docs/evolution/CHANGELOG.md` (atualizado)

### Motivo
Tornar o app seguro contra XSS via HTML no Markdown, gerar PDFs com nomes descritivos, proteger contra importação de arquivos grandes e evitar perda acidental de conteúdo.

### Evidência
- `npx tsc --noEmit` → OK
- `npm test` → 22 testes passando
- `npm run build` → OK

---

## 2026-06-08 — Sprint 1 concluída: migração de CDNs completa

### Resumo
Sprint 1 (Migração de Dependências) concluída com sucesso (7/7 tarefas). Todas as CDNs removidas do index.html (jspdf, html2canvas, Tailwind, import maps). Strict mode habilitado no TypeScript. Erros de tipo corrigidos com @types/react e @types/react-dom. Build OK, 22 testes OK, typecheck OK.

### Arquivos afetados
- `index.html` (import maps removidos)
- `tsconfig.json` (strict mode habilitado)
- `package.json` (@types/react, @types/react-dom adicionados como devDependencies)
- `components/A4DocPreview.tsx` (cast `marked.parse(section) as string`)
- `docs/agent/CURRENT_STATE.md` (atualizado)
- `docs/agent/HANDOFF.md` (atualizado)
- `docs/evolution/CHANGELOG.md` (atualizado)

### Motivo
Completar a migração de CDNs para npm e habilitar strict mode para melhor qualidade de código.

### Evidência
- `npm run build` → OK
- `npm test` → 22 testes passando
- `npx tsc --noEmit` → OK (strict mode)
- `grep -c "importmap" index.html` → 0
- `grep -c "aistudiocdn" index.html` → 0

---

## 2026-06-07 — Todas as 5 sprints quebradas em tarefas executáveis

### Resumo
Sprints 1-5 quebradas em 25 tarefas totais (7+5+4+4+5). Arquivos SPRINT_*_TAREFAS.md gerados. Sprint 1 encontrada parcialmente feita (3/7 tarefas) e nao commitada. HANDOFF, CURRENT_STATE e next-actions atualizados.

### Arquivos afetados
- `docs/implementation/SPRINT_01_MIGRACAO_DEPS_TAREFAS.md` (criado)
- `docs/implementation/SPRINT_02_SANITIZACAO_NOME_TAREFAS.md` (criado)
- `docs/implementation/SPRINT_03_REGRAS_NEGOCIO_TAREFAS.md` (criado)
- `docs/implementation/SPRINT_04_UX_RESPONSIVIDADE_TAREFAS.md` (criado)
- `docs/implementation/SPRINT_05_DEPLOY_VALIDACAO_TAREFAS.md` (criado)
- `docs/agent/HANDOFF.md` (atualizado)
- `docs/agent/CURRENT_STATE.md` (atualizado)
- `docs/agent/next-actions.md` (atualizado)

### Motivo
Preparar todas as sprints para execucao por modelo coder economico. Atualizar continuidade.

### Evidencia
25 arquivos de tarefas gerados. Sprint 1 com mudancas nao commitadas verificada (build OK, testes OK).

---
## 2026-06-07 — Sprint 5 quebrada em tarefas executáveis

### Resumo
Sprint 5 (Deploy e Validacao) quebrada em 5 tarefas. vite.config.ts analisado: GEMINI_API_KEY exposta nas linhas 15-16. index.html sem meta tags. Nao ha vercel.json nem pasta public/.

### Arquivos afetados
- `docs/implementation/SPRINT_05_DEPLOY_VALIDACAO_TAREFAS.md` (criado)
- `docs/agent/CURRENT_STATE.md` (atualizado)

### Motivo
Preparar Sprint 5 para execucao. Todas as 5 sprints agora quebradas.

### Evidencia
Arquivo de tarefas gerado com 5 tarefas.

---
## 2026-06-07 — Sprint 4 quebrada em tarefas executáveis

### Resumo
Sprint 4 (UX e Responsividade) quebrada em 4 tarefas. App.tsx analisado: spinner existe (linha 408), disabled existe (linha 402), notificacoes com 5s ja implementadas (linhas 287, 292), mas timeout 30s nao existe.

### Arquivos afetados
- `docs/implementation/SPRINT_04_UX_RESPONSIVIDADE_TAREFAS.md` (criado)
- `docs/agent/CURRENT_STATE.md` (atualizado)

### Motivo
Preparar Sprint 4 para execucao por modelo coder economico.

### Evidencia
Arquivo de tarefas gerado com 4 tarefas independentes.

---
## 2026-06-07 — Sprint 3 quebrada em tarefas executáveis

### Resumo
Sprint 3 (Regras de Negocio) quebrada em 4 tarefas independentes. A4DocPreview.tsx analisado para identificar logica de split (linha 90) e numeracao (linhas 505, 740). FileReader sem encoding identificado (App.tsx linha 160).

### Arquivos afetados
- `docs/implementation/SPRINT_03_REGRAS_NEGOCIO_TAREFAS.md` (criado)
- `docs/agent/CURRENT_STATE.md` (atualizado)

### Motivo
Preparar Sprint 3 para execucao por modelo coder economico.

### Evidencia
Arquivo de tarefas gerado com 4 tarefas independentes.

---
## 2026-06-07 — Sprint 2 quebrada em tarefas executáveis

### Resumo
Sprint 2 (Sanitizacao e Nome do PDF) quebrada em 5 tarefas. Arquivo SPRINT_02_SANITIZACAO_NOME_TAREFAS.md gerado. PRD secao 7.10 consultada para regra de sanitizacao do nome.

### Arquivos afetados
- `docs/implementation/SPRINT_02_SANITIZACAO_NOME_TAREFAS.md` (criado)
- `docs/agent/CURRENT_STATE.md` (atualizado)

### Motivo
Preparar Sprint 2 para execucao por modelo coder economico.

### Evidencia
Arquivo de tarefas gerado com 5 tarefas, prompts de execucao, criterios de aceite e checklist final.

---
## 2026-06-07 — Sprint 1 quebrada em tarefas executáveis

### Resumo
Sprint 1 (Migração de Dependências) quebrada em 7 tarefas menores, sequenciais e verificáveis. Arquivo SPRINT_01_MIGRACAO_DEPS_TAREFAS.md gerado. Achado: marked já está via npm (tarefa 1.1 do sprint original estava desatualizada).

### Arquivos afetados
- `docs/implementation/SPRINT_01_MIGRACAO_DEPS_TAREFAS.md` (criado)
- `docs/agent/CURRENT_STATE.md` (atualizado)

### Motivo
Preparar Sprint 1 para execução por modelo coder econômico. Cada tarefa é pequena, reversível e tem critérios de aceite objetivos.

### Evidência
Arquivo de tarefas gerado com 7 tarefas, prompts de execução, critérios de aceite e checklist final.

---
## 2026-06-07 — Sprint 00B concluída: fundação de testes

### Resumo
Vitest + React Testing Library configurados. 22 smoke tests criados (10 heurísticas, 12 constantes). Scripts test/test:watch adicionados ao package.json.

### Arquivos afetados
- `package.json` (deps de teste, scripts)
- `vite.config.ts` (config test)
- `utils/__tests__/heuristics.test.ts` (criado, 10 testes)
- `__tests__/styles.test.ts` (criado, 12 testes)
- `docs/implementation/SPRINT_00B_TESTES.md` (atualizado)
- `docs/implementation/sprint-breakdown.md` (Sprint 00B marcada como concluída)

### Motivo
Configurar infraestrutura de testes antes de implementar funcionalidades. Permite validar cada sprint com testes automatizados.

### Evidência
`npm test` → 22 testes passando. `npm run build` OK. `npx tsc --noEmit` OK.

---

## 2026-06-07 — Plano de implementação v2.0 gerado

### Resumo
Plano de implementação regenerado com todos os PDs resolvidos (11 decisões). 7 sprints planejadas, 37 tarefas. Sprint 00B adicionada para fundação de testes.

### Arquivos afetados
- `docs/implementation/implementation-plan.md` (regenerado)
- `docs/implementation/task-list.md` (regenerado)
- `docs/implementation/test-plan.md` (regenerado)
- `docs/implementation/sprint-breakdown.md` (regenerado)
- `docs/implementation/SPRINT_01_MIGRACAO_DEPS.md` (regenerado)
- `docs/implementation/SPRINT_02_SANITIZACAO_NOME.md` (regenerado)
- `docs/implementation/SPRINT_03_REGRAS_NEGOCIO.md` (regenerado)
- `docs/implementation/SPRINT_04_UX_RESPONSIVIDADE.md` (regenerado)
- `docs/implementation/SPRINT_05_DEPLOY_VALIDACAO.md` (regenerado)

### Motivo
Atualizar plano com decisões de PDs resolvidos. Adicionar Sprint 00B para testes.

### Evidência
9 arquivos em docs/implementation/ com versão 2.0.

---

## 2026-06-07 — PDs adicionais resolvidos (PD-05 a PD-09)

### Resumo
5 PDs resolvidos: presets (manter 5), temas capa (manter 4), templates (manter 4), heurísticas (manter 7), limite PDF (não).

### Arquivos afetados
- `docs/evolution/DECISIONS.md` (5 decisões novas)
- `docs/agent/CURRENT_STATE.md`

### Motivo
Fechar todos os PDs antes de gerar plano de implementação.

### Evidência
DECISIONS.md contém 19 decisões ativas.

---

## 2026-06-07 — Sprint 0 concluída: mapeamento da codebase

### Resumo
Mapeamento completo da codebase realizado. 11 achados críticos/importantes documentados. .gitignore atualizado com .env. Git inicializado com commit inicial (3ff58a7). Relatório detalhado em `docs/implementation/Sprint-0-codebase-map.md`.

### Arquivos afetados
- `docs/implementation/Sprint-0-codebase-map.md` (criado)
- `.gitignore` (.env adicionado)
- `.git/` (inicializado)
- `docs/agent/CURRENT_STATE.md` (atualizado)
- `docs/agent/HANDOFF.md` (atualizado)
- `docs/evolution/CHANGELOG.md` (atualizado)
- `docs/evolution/DECISIONS.md` (6 decisões de PDs registradas)

### Motivo
Mapear a codebase antes de qualquer alteração. Resolver PDs pendentes. Preparar terreno para Sprint 1.

### Evidência
- `Sprint-0-codebase-map.md` existe com 8 seções, 11 achados, estrutura completa.
- Git inicializado: commit 3ff58a7 com 52 arquivos.
- .gitignore inclui .env.
- 6 PDs resolvidos e registrados em DECISIONS.md.

---

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
