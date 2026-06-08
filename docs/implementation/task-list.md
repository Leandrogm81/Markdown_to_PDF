# Lista de Tarefas

Projeto: `/mnt/c/Dev/markdown-para-pdf`
Versão: 2.0 (PDs resolvidos)
Data: 2026-06-07

---

## 1. Tarefas por sprint

### Sprint 0 — Preparação (CONCLUÍDA)

| # | Tarefa | Status |
|---|---|---|
| 0.1 | Ler package.json e mapear dependências | Concluída |
| 0.2 | Ler index.html e mapear CDNs | Concluída |
| 0.3 | Ler vite.config.ts | Concluída |
| 0.4 | Ler tsconfig.json (strict mode) | Concluída |
| 0.5 | Mapear componentes React | Concluída |
| 0.6 | Ler templates.ts | Concluída |
| 0.7 | Verificar .gitignore | Concluída |
| 0.8 | Verificar existência de testes | Concluída |

---

### Sprint 00B — Fundação de testes

| # | Tarefa | Arquivos | Coder econômico |
|---|---|---|---|
| 00B.1 | Instalar e configurar Vitest + RTL | `package.json`, `vite.config.ts` | Sim |
| 00B.2 | Smoke test heurísticas | `utils/__tests__/heuristics.test.ts` | Sim |
| 00B.3 | Smoke test constantes | `__tests__/styles.test.ts` | Sim |
| 00B.4 | Documentar estratégia de testes | `docs/implementation/test-plan.md` | Sim |

---

### Sprint 1 — Migração de dependências

| # | Tarefa | Arquivos | Coder econômico |
|---|---|---|---|
| 1.1 | Instalar marked via npm, remover CDN, converter para import | `package.json`, `index.html`, `A4DocPreview.tsx` | Não |
| 1.2 | Instalar jspdf via npm, remover CDN, converter para import | `package.json`, `index.html`, `App.tsx` | Não |
| 1.3 | Instalar html2canvas via npm, remover CDN, converter para import | `package.json`, `index.html`, `App.tsx` | Não |
| 1.4 | Instalar Tailwind via npm (@tailwindcss/vite), remover CDN | `package.json`, `index.html`, `vite.config.ts` | Não |
| 1.5 | Remover import maps do index.html | `index.html` | Sim |
| 1.6 | Habilitar strict: true no tsconfig.json | `tsconfig.json` | Sim |
| 1.7 | Corrigir erros de tipo do strict mode | Arquivos com erros | Não |

---

### Sprint 2 — Sanitização e nome do PDF

| # | Tarefa | Arquivos | Coder econômico |
|---|---|---|---|
| 2.1 | Instalar DOMPurify via npm | `package.json` | Sim |
| 2.2 | Implementar sanitização no A4DocPreview.tsx | `A4DocPreview.tsx` | Não |
| 2.3 | Corrigir nome do PDF (sequência de sanitização) | `App.tsx` | Sim |
| 2.4 | Implementar validação de tamanho de importação (8MB) | `App.tsx`, `Toolbar.tsx` | Sim |
| 2.5 | Implementar confirmação antes de substituir conteúdo | `App.tsx` | Sim |

---

### Sprint 3 — Regras de negócio

| # | Tarefa | Arquivos | Coder econômico |
|---|---|---|---|
| 3.1 | Corrigir `---` em code blocks (não criar quebra) | `A4DocPreview.tsx` | Não |
| 3.2 | Implementar preview vazio (mensagem orientativa) | `A4DocPreview.tsx` | Sim |
| 3.3 | Implementar numeração de página (capa não contada) | `A4DocPreview.tsx` | Sim |
| 3.4 | Definir encoding de importação (UTF-8 BOM, fallback Latin-1) | `App.tsx`, `Toolbar.tsx` | Sim |

---

### Sprint 4 — UX e responsividade

| # | Tarefa | Arquivos | Coder econômico |
|---|---|---|---|
| 4.1 | Validar responsividade mobile (320px, botões Editor/Preview) | `App.tsx`, `Toolbar.tsx` | Não |
| 4.2 | Garantir 44px de área de toque em botões | `Toolbar.tsx`, `SettingsPanel.tsx` | Sim |
| 4.3 | Validar notificações de sucesso/erro (5s) | `App.tsx` | Sim |
| 4.4 | Validar spinner no botão de exportar (30s timeout) | `App.tsx` | Sim |

---

### Sprint 5 — Deploy e validação

| # | Tarefa | Arquivos | Coder econômico |
|---|---|---|---|
| 5.1 | Remover GEMINI_API_KEY de vite.config.ts | `vite.config.ts` | Sim |
| 5.2 | Configurar meta tags (title, description, favicon, OG) | `index.html` | Sim |
| 5.3 | Configurar build para Vercel | `vite.config.ts`, `vercel.json` | Sim |
| 5.4 | Validar build de produção | Terminal | Sim |
| 5.5 | Checklist final de validação | Todos | Não |

---

## 2. Tarefas adequadas para coder econômico

- 1.5: Remover import maps do index.html
- 1.6: Habilitar strict: true
- 2.1: Instalar DOMPurify
- 2.3: Corrigir nome do PDF
- 2.4: Validação de tamanho de importação
- 2.5: Confirmação antes de substituir
- 3.2: Preview vazio
- 3.3: Numeração de página
- 3.4: Encoding de importação
- 4.2: Área de toque 44px
- 4.3: Notificações
- 4.4: Spinner exportar
- 5.1: Remover GEMINI_API_KEY
- 5.2: Meta tags
- 5.3: Config Vercel
- 5.4: Build validação

## 3. Tarefas que exigem modelo mais forte

- 1.1-1.4: Migração de CDNs (pode quebrar build)
- 1.7: Corrigir erros de tipo strict mode
- 2.2: Sanitização DOMPurify (segurança)
- 3.1: `---` em code blocks (parser Markdown)
- 4.1: Responsividade mobile (layout complexo)
- 5.5: Checklist final (requer julgamento)
