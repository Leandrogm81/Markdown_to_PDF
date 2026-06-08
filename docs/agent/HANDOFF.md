# Handoff — Continuidade de Sessão

## 1. Objetivo atual

Estabilizar o protótipo `markdown-para-pdf` (Vite + React 19 + TypeScript) como MVP pronto para deploy na Vercel. O plano de implementação v2.0 está completo com 7 sprints (Sprint 0 e 00B concluídas). Próximo passo é executar Sprint 1 (migrar CDNs para npm).

## 2. Estado geral do projeto

- Projeto: `/mnt/c/Dev/markdown-para-pdf`
- Stack: Vite + React 19 + TypeScript, sem backend
- Git: inicializado, último commit `3e9b027` (Sprint 00B concluída)
- Testes: Vitest + RTL configurados, 22 testes passando
- Build: `npm run build` OK, `npx tsc --noEmit` OK
- PRD v1.1 consolidado (1249 linhas) em `docs/product/PRD_v1.1.md`
- Plano de implementação v2.0 em `docs/implementation/` (10 arquivos)
- Todos os PDs resolvidos (11 decisões ativas em DECISIONS.md)
- Sprint 0 (mapeamento) e Sprint 00B (testes) concluídas
- Sprint 1 (migração de CDNs) pendente — bloqueante para todo o resto

## 3. O que já foi feito

- Brownfield analysis, Pré-PRD, PRD v1.0, PRD v1.1 — todos salvos em `docs/product/`
- Revisão crítica do PRD (4 críticos, 18 importantes resolvidos)
- Guia UI/UX criado em `docs/design/UI_UX_GUIDE.md` (17 seções)
- Plano de implementação v2.0 gerado (7 sprints, 37 tarefas)
- 11 PDs resolvidos e registrados em `docs/evolution/DECISIONS.md` (19 decisões ativas)
- Sprint 0 executada: codebase mapeada, git inicializado, .gitignore corrigido
- Sprint 00B executada: Vitest + RTL configurados, 22 smoke tests passando
- Codebase map detalhado em `docs/implementation/Sprint-0-codebase-map.md`

## 4. Decisões tomadas

- 2026-06-07 — Autosave local NÃO no MVP
- 2026-06-07 — Tamanho máximo importação: 8MB
- 2026-06-07 — Confirmação antes de substituir conteúdo: SIM
- 2026-06-07 — Manter 5 presets de estilo existentes
- 2026-06-07 — Manter 4 temas de capa existentes
- 2026-06-07 — Manter 4 templates existentes
- 2026-06-07 — Manter 7 heurísticas existentes
- 2026-06-07 — Sem limite de tamanho/páginas do PDF
- 2026-06-07 — DOMPurify como sanitização
- 2026-06-07 — Sem tema escuro no MVP
- 2026-06-07 — Vitest + React Testing Library como framework de testes

## 5. Arquivos importantes

| Arquivo | Função | Observação |
|---|---|---|
| `docs/product/PRD_v1.1.md` | PRD consolidado | Fonte principal (1249 linhas) |
| `docs/design/UI_UX_GUIDE.md` | Guia visual obrigatório | 17 seções |
| `docs/implementation/implementation-plan.md` | Plano geral v2.0 | 7 sprints, 37 tarefas |
| `docs/implementation/SPRINT_01_MIGRACAO_DEPS.md` | Próxima sprint | 7 tarefas, bloqueante |
| `docs/implementation/Sprint-0-codebase-map.md` | Mapa do codebase | 11 achados críticos |
| `docs/implementation/task-list.md` | Lista de tarefas | 37 tarefas por sprint |
| `docs/implementation/test-plan.md` | Plano de testes | Vitest + RTL |
| `docs/implementation/sprint-breakdown.md` | Dependências | Diagrama de sprints |
| `docs/evolution/DECISIONS.md` | 19 decisões ativas | Todas os PDs resolvidos |
| `docs/evolution/CHANGELOG.md` | Histórico | 12 entradas |
| `docs/agent/agent-operating-rules.md` | Regras operacionais | Deve ser lido antes de agir |
| `vite.config.ts` | Config Vite + Vitest | GEMINI_API_KEY exposta (Sprint 5 resolve) |
| `package.json` | Dependências + scripts | test/test:watch disponíveis |

## 6. Problemas encontrados

- CDNs em runtime (Tailwind, marked, jspdf, html2canvas) — Sprint 1 resolve
- Import maps apontam para aistudiocdn.com — Sprint 1 resolve
- tsconfig.json sem `strict: true` — Sprint 1 resolve
- GEMINI_API_KEY exposta em vite.config.ts — Sprint 5 resolve
- HTML renderizado sem sanitização (XSS) — Sprint 2 resolve
- App.tsx (666 linhas) e A4DocPreview.tsx (757 linhas) são grandes — Futuro
- Sem testes de componente (apenas smoke tests de funções puras) — Futuro

## 7. Tentativas realizadas

| Tentativa | Resultado | Observação |
|---|---|---|
| Gerar plano de implementação v1.0 | Funcionou | Substituído por v2.0 com PDs resolvidos |
| Gerar plano de implementação v2.0 | Funcionou | 7 sprints, 37 tarefas, PDs incorporados |
| Configurar Vitest + RTL | Funcionou | 22 testes passando, build OK |
| Resolver PDs com usuário | Funcionou | 11 decisões registradas |

## 8. O que funcionou

- Mapeamento completo da codebase antes de implementar.
- Resolução de todos os PDs antes de gerar plano.
- Vitest nativo do Vite — configuração mínima, sem conflitos.
- Smoke tests para heurísticas e constantes — validam funções puras.

## 9. O que não funcionou

- Nenhum problema técnico nesta sessão.

## 10. Pendências

| Pendência | Impacto | Prioridade |
|---|---|---|
| Sprint 1: migrar CDNs para npm | Bloqueante para todas as outras sprints | Alta |
| Sprint 2: sanitização DOMPurify | Segurança (XSS) | Alta |
| Sprint 3: regras de negócio | `---` em code blocks, preview vazio, numeração | Média |
| Sprint 4: UX e responsividade | Mobile, notificações | Média |
| Sprint 5: deploy Vercel | GEMINI_API_KEY, meta tags | Média |
| GEMINI_API_KEY exposta | Segurança | Alta (Sprint 5) |

## 11. Riscos

| Risco | Área | Severidade | Observação |
|---|---|---|---|
| Migração Tailwind CDN → npm pode quebrar CSS | Engenharia | Alta | Sprint 1, tarefa 1.4 |
| marked API pode diferir entre CDN e npm | Engenharia | Alta | Sprint 1, tarefa 1.1 |
| strict mode pode revelar muitos erros de tipo | Engenharia | Média | Sprint 1, tarefa 1.7 |
| DOMPurify whitelist pode ser muito restritiva | Engenharia | Média | Sprint 2, tarefa 2.2 |
| `---` em code blocks pode ser difícil de detectar | Engenharia | Média | Sprint 3, tarefa 3.1 |
| Layout mobile pode quebrar em 320px | UI/UX | Média | Sprint 4, tarefa 4.1 |

## 12. Próxima ação recomendada

Executar Sprint 1: migrar marked, jspdf, html2canvas e Tailwind de CDN para npm. Esta sprint é bloqueante para todas as outras.

Tarefas da Sprint 1:
1. Instalar marked via npm, remover CDN, converter para import
2. Instalar jspdf via npm, remover CDN, converter para import
3. Instalar html2canvas via npm, remover CDN, converter para import
4. Instalar Tailwind via npm (@tailwindcss/vite), remover CDN
5. Remover import maps do index.html
6. Habilitar `strict: true` no tsconfig.json
7. Corrigir erros de tipo do strict mode

## 13. O que o próximo agente NÃO deve fazer

- Não recomeçar PRD, plano ou guia UI/UX.
- Não pular a migração de CDNs (Sprint 1 é bloqueante).
- Não implementar funcionalidades antes de completar Sprint 1.
- Não ignorar erros de tipo do strict mode.
- Não criar novos templates, presets ou temas (PDs resolvidos).
- Não adicionar autosave (PD-01: NÃO).
- Não adicionar tema escuro (PD-11: NÃO).
- Não usar CDN para nenhuma dependência — tudo deve ser npm.
- Não alterar o PRD v1.1 sem justificativa.
- Não ignorar `docs/design/UI_UX_GUIDE.md` para decisões visuais.

## 14. Segurança para troca de sessão

- Seguro rodar `/new`? Sim
- Motivo: Sprints 0 e 00B concluídas, 22 testes passando, build OK, typecheck OK, todos os PDs resolvidos, plano v2.0 completo, continuidade atualizada.
- Nome sugerido para a nova sessão: `markdown-para-pdf-sprint-1-migracao-cdns`
