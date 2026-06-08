# Lista de Tarefas

**Projeto:** Markdown para PDF
**PRD de origem:** `docs/product/PRD_v1.1.md`
**Data:** 2026-06-07

---

## 1. Tarefas por sprint

### Sprint 0 — Preparação

| # | Tarefa | Objetivo | Arquivos prováveis | Dependências | Critério de aceite | Riscos | Coder econômico? |
|---|---|---|---|---|---|---|---|
| 0.1 | Ler package.json e mapear dependências | Entender estado atual | `package.json` | Nenhuma | Dependências listadas e comparadas com CDNs do index.html | Nenhum | Sim |
| 0.2 | Ler index.html e mapear CDNs | Identificar CDNs a substituir | `index.html` | Nenhuma | Lista de CDNs com URLs completas | Nenhum | Sim |
| 0.3 | Ler vite.config.ts | Entender config de build | `vite.config.ts` | Nenhuma | GEMINI_API_KEY identificada | Nenhum | Sim |
| 0.4 | Ler tsconfig.json | Verificar strict mode | `tsconfig.json` | Nenhuma | Status de strict mode documentado | Nenhum | Sim |
| 0.5 | Mapear componentes | Entender estrutura de componentes | `App.tsx`, `components/*` | Nenhuma | Árvore de componentes documentada | Nenhum | Sim |
| 0.6 | Ler templates.ts | Entender templates existentes | `templates.ts` | Nenhuma | Templates listados com configs | Nenhum | Sim |
| 0.7 | Verificar .gitignore | Garantir que .env está protegido | `.gitignore` | Nenhuma | .env está na lista | Nenhum | Sim |
| 0.8 | Verificar existência de testes | Mapear cobertura atual | `*.test.*`, `*.spec.*` | Nenhuma | Status de testes documentado | Nenhum | Sim |

### Sprint 1 — Migração de dependências

| # | Tarefa | Objetivo | Arquivos prováveis | Dependências | Critério de aceite | Riscos | Coder econômico? |
|---|---|---|---|---|---|---|---|
| 1.1 | Instalar dependências npm | marked, jspdf, html2canvas, @tailwindcss/vite, tailwindcss, @tailwindcss/typography | `package.json` | Sprint 0 | `npm install` sem erros | Versões incompatíveis | Sim |
| 1.2 | Configurar Tailwind via vite plugin | Substituir CDN do Tailwind | `vite.config.ts`, `index.html`, CSS | 1.1 | Classes Tailwind funcionam sem CDN | CSS quebrado | Não |
| 1.3 | Remover CDNs do index.html | Limpar tags script CDN | `index.html` | 1.1, 1.2 | Nenhuma tag `<script src="cdn">` no HTML | Import maps quebrados | Sim |
| 1.4 | Adicionar imports npm no código | marked, jspdf, html2canvas via import | Componentes que usam essas libs | 1.3 | App funciona sem CDNs | Imports não encontrados | Não |
| 1.5 | Remover GEMINI_API_KEY | Limpar referências do vite.config.ts e código | `vite.config.ts`, `App.tsx` | 1.3 | Nenhuma referência a GEMINI_API_KEY no bundle | Feature quebrada se houver uso | Não |
| 1.6 | Atualizar imports do código | Garantir que marked/jspdf/html2canvas usam npm | `App.tsx`, componentes | 1.4 | App compila e funciona | Nenhum | Sim |
| 1.7 | Validar build completo | `npm run build` sem erros | `dist/` | Todos anteriores | Build gera bundle sem CDNs nem GEMINI_API_KEY | Nenhum | Sim |

### Sprint 2 — Sanitização e nome do PDF

| # | Tarefa | Objetivo | Arquivos prováveis | Dependências | Critério de aceite | Riscos | Coder econômico? |
|---|---|---|---|---|---|---|---|
| 2.1 | Instalar DOMPurify | Dependência de sanitização | `package.json` | Sprint 1 | `npm install dompurify` sem erros | Nenhum | Sim |
| 2.2 | Implementar sanitização | Aplicar DOMPurify antes de renderizar HTML | Componente de preview | 2.1 | `<script>` não executa; tags permitidas funcionam | Sanitização muito restritiva | Não |
| 2.3 | Implementar nome descritivo do PDF | Sequência de sanitização de 8 passos | Função utilitária | Nenhuma | Nome do PDF segue regra; não é genérico | Nenhum | Sim |
| 2.4 | Implementar encoding de importação | UTF-8 com BOM, fallback Latin-1 | Função de importação | Nenhuma | Arquivo UTF-8 com BOM carrega corretamente | Nenhum | Sim |

### Sprint 3 — Regras de negócio

| # | Tarefa | Objetivo | Arquivos prováveis | Dependências | Critério de aceite | Riscos | Coder econômico? |
|---|---|---|---|---|---|---|---|
| 3.1 | Corrigir `---` em code blocks | Ignorar `---` dentro de code blocks e HTML | Parser/lógica de paginação | Sprint 1 | `---` em code block não cria quebra | Quebra de paginação existente | Não |
| 3.2 | Corrigir numeração de página | Capa não contada, centro do rodapé | Componente de preview | Sprint 1 | Numeração começa em 1 no corpo | Nenhum | Sim |
| 3.3 | Implementar preview vazio | Mensagem orientativa quando editor vazio | Componente de preview | Sprint 1 | "Comece a digitar ou selecione um template" aparece | Nenhum | Sim |
| 3.4 | Definir "sessão" explicitamente | Configurações resetam no reload | Lógica de estado | Sprint 1 | Recarregar restaura padrões | Nenhum | Sim |

### Sprint 4 — UX e responsividade

| # | Tarefa | Objetivo | Arquivos prováveis | Dependências | Critério de aceite | Riscos | Coder econômico? |
|---|---|---|---|---|---|---|---|
| 4.1 | Implementar loading na exportação | Spinner, botão desabilitado, timeout 30s | Componente de exportação | Sprint 1 | Botão mostra "Gerando PDF..." e fica desabilitado | Nenhum | Sim |
| 4.2 | Implementar notificações | Toast de sucesso/erro, desaparece após 5s | Novo componente Toast | Sprint 1 | Toast aparece e desaparece | Nenhum | Sim |
| 4.3 | Implementar responsividade mobile | Botões Editor/Preview, overlay config | Header, SettingsPanel | Sprint 1 | App funciona em 320px sem scroll horizontal | Layout quebrado | Não |
| 4.4 | Garantir toolbar 44px touch target | Botões com área de toque adequada | Toolbar | 4.3 | Botões >= 44px em mobile | Nenhum | Sim |

### Sprint 5 — Deploy e validação

| # | Tarefa | Objetivo | Arquivos prováveis | Dependências | Critério de aceite | Riscos | Coder econômico? |
|---|---|---|---|---|---|---|---|
| 5.1 | Configurar meta tags | title, description, favicon, og tags | `index.html` | Sprint 1 | Meta tags presentes no HTML | Nenhum | Sim |
| 5.2 | Configurar Vercel | vercel.json ou config de deploy | `vercel.json` | Sprint 1 | Build funciona na Vercel | Config incorreta | Sim |
| 5.3 | Validar checklist final | Todos os critérios do PRD | Todos | Todas | Checklist 100% | Nenhum | Sim |

---

## 2. Tarefas adequadas para coder econômico

- 0.1 a 0.8 (leitura e mapeamento)
- 1.1 (instalar dependências)
- 1.3 (remover CDNs do HTML)
- 1.6 (atualizar imports)
- 1.7 (validar build)
- 2.1 (instalar DOMPurify)
- 2.3 (nome descritivo do PDF)
- 2.4 (encoding de importação)
- 3.2 (numeração de página)
- 3.3 (preview vazio)
- 3.4 (definir sessão)
- 4.1 (loading na exportação)
- 4.2 (notificações)
- 4.4 (toolbar 44px)
- 5.1 (meta tags)
- 5.2 (config Vercel)
- 5.3 (validação final)

---

## 3. Tarefas que exigem modelo mais forte

- 1.2 (configurar Tailwind via vite plugin — build config sensível)
- 1.4 (adicionar imports npm — pode quebrar componentes)
- 1.5 (remover GEMINI_API_KEY — segurança)
- 2.2 (implementar sanitização — segurança)
- 3.1 (corrigir `---` em code blocks — parser complexo)
- 4.3 (responsividade mobile — UX sensível)
