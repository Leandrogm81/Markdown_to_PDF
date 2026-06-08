# Plano de Implementação

Projeto: `/mnt/c/Dev/markdown-para-pdf`
Versão: 2.0 (atualizado com PDs resolvidos)
Data: 2026-06-07
PRD de origem: `docs/product/PRD_v1.1.md`

---

## 1. Premissas

### Decisões assumidas (PDs resolvidos)

| PD | Decisão | Fonte |
|---|---|---|
| PD-01 | Autosave NÃO no MVP | Decisão humana 2026-06-07 |
| PD-02 | Fidelidade: resolução mínima (mesma página, margens, texto, fontes) | PRD v1.1 |
| PD-03 | Tamanho máximo importação: 8MB | Decisão humana 2026-06-07 |
| PD-04 | Confirmação antes de substituir: SIM | Decisão humana 2026-06-07 |
| PD-05 | Manter 5 presets existentes | Sugestão aceita 2026-06-07 |
| PD-06 | Manter 4 temas de capa existentes | Sugestão aceita 2026-06-07 |
| PD-07 | Manter 4 templates existentes | Sugestão aceita 2026-06-07 |
| PD-08 | Manter 7 heurísticas existentes | Sugestão aceita 2026-06-07 |
| PD-09 | Sem limite de tamanho/páginas do PDF | Decisão humana 2026-06-07 |
| PD-10 | DOMPurify como sanitização | Sugestão aceita 2026-06-07 |
| PD-11 | Sem tema escuro no MVP | Decisão humana 2026-06-07 |

### O que foi inferido

- O projeto é Vite + React 19 + TypeScript, sem backend.
- Source files estão no root (App.tsx, index.tsx, components/, templates.ts).
- Git já inicializado (commit 9eedf50).
- Sprint 0 (mapeamento) já concluída.

### O que NÃO deve ser expandido

- Não criar novos templates, presets ou temas de capa.
- Não adicionar autosave.
- Não adicionar tema escuro.
- Não implementar login, contas ou persistência server-side.

---

## 2. Visão geral das sprints

| Sprint | Nome | Objetivo | Impacto UI/UX | Arquivo |
|---|---|---|---|---|
| Sprint 0 | Preparação | Mapear codebase | Não aplicável | `SPRINT_00_PREPARACAO.md` (CONCLUÍDA) |
| Sprint 00B | Fundação de testes | Configurar Vitest + RTL | Não aplicável | `SPRINT_00B_TESTES.md` |
| Sprint 1 | Migração de dependências | Substituir CDNs por npm | Indireto | `SPRINT_01_MIGRACAO_DEPS.md` |
| Sprint 2 | Sanitização e nome do PDF | DOMPurify + nome descritivo + importação | Indireto | `SPRINT_02_SANITIZACAO_NOME.md` |
| Sprint 3 | Regras de negócio | `---` em code blocks, preview vazio, numeração | Sim | `SPRINT_03_REGRAS_NEGOCIO.md` |
| Sprint 4 | UX e responsividade | Mobile, notificações, confirmação | Sim | `SPRINT_04_UX_RESPONSIVIDADE.md` |
| Sprint 5 | Deploy e validação | Vercel, meta tags, checklist final | Indireto | `SPRINT_05_DEPLOY_VALIDACAO.md` |

---

## 3. Ordem de execução recomendada

1. **Sprint 0** (CONCLUÍDA) — Mapeamento da codebase. Git inicializado.
2. **Sprint 00B** — Fundação de testes. Configurar Vitest + RTL antes de implementar funcionalidades. Permite validar cada sprint com testes automatizados.
3. **Sprint 1** — Migração de CDNs. Bloqueante para todas as outras sprints. Sem dependências npm locais, o build de produção falha.
3. **Sprint 2** — Sanitização e nome do PDF. Depende de Sprint 1 (DOMPurify via npm). Implementa segurança (XSS) e regra de negócio (nome descritivo).
4. **Sprint 3** — Regras de negócio. Depende de Sprint 1 (parser Markdown via npm). Corrige comportamento de `---` em code blocks.
5. **Sprint 4** — UX e responsividade. Pode ser executada em paralelo com Sprint 3, mas é mais seguro fazer após.
6. **Sprint 5** — Deploy. Depende de todas as anteriores. Última sprint.

### Dependências

- Sprint 1 é pré-requisito de todas as outras.
- Sprint 2 depende de Sprint 1 (DOMPurify npm).
- Sprint 3 depende de Sprint 1 (marked npm).
- Sprint 4 pode rodar após Sprint 1, mas é mais seguro após Sprint 3.
- Sprint 5 é a última.

---

## 4. Checklist de validação geral

Para cada sprint:

- [ ] `npm run dev` funciona sem erro no console.
- [ ] `npm run build` gera `dist/` sem erro.
- [ ] Preview renderiza corretamente.
- [ ] PDF exporta com sucesso.
- [ ] Não há erros de tipo TypeScript.
- [ ] Não há CDNs no `index.html` (após Sprint 1).
- [ ] GEMINI_API_KEY não está exposta (após Sprint 1).
- [ ] `.env` está no `.gitignore`.
- [ ] Funcionalidades existentes não foram quebradas.
- [ ] Mobile funciona em 320px (após Sprint 4).
- [ ] `---` em code block não cria quebra (após Sprint 3).
- [ ] HTML `<script>` não é executado (após Sprint 2).

---

## 5. Pontos que exigem modelo mais forte

| Tarefa | Motivo |
|---|---|
| Migração Tailwind CDN → npm | Alteração arquitetural sensível; pode quebrar todas as classes |
| Habilitar `strict: true` | Pode revelar dezenas de erros de tipo |
| Sanitização DOMPurify | Segurança; configuração errada = XSS |
| Deploy Vercel | Configuração de build, redirects, meta tags |

Tarefas seguras para coder econômico:
- Alterar nome do PDF (sequência clara no PRD).
- Adicionar validação de tamanho de importação.
- Adicionar confirmação antes de substituir conteúdo.
- Corrigir preview vazio.
- Adicionar numeração de página.

---

## 6. Observações finais

- O PRD v1.1 é a fonte de verdade. Não inventar funcionalidades.
- `docs/design/UI_UX_GUIDE.md` é obrigatório para toda decisão visual.
- Componentes grandes (App.tsx 666 linhas, A4DocPreview.tsx 757 linhas) devem ser mantidos intactos salvo correção de bug.
- Toda sprint deve deixar o projeto funcional.
- Git commits a cada sprint concluída.
