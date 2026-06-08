# Sprint 0 — Relatório de Mapeamento da Codebase

Atualizado em: 2026-06-07

## 1. Estrutura do Projeto

```
/mnt/c/Dev/markdown-para-pdf/
├── App.tsx              (666 linhas)  — Componente principal, estado, geração PDF
├── index.tsx            (16 linhas)   — Entry point React
├── index.html           (64 linhas)   — HTML shell com CDNs
├── templates.ts         (314 linhas)  — 4 templates (executivo, currículo, acadêmico, técnico)
├── styles.ts            (174 linhas)  — 5 presets, 5 temas editor, margens, cores
├── types.ts             (55 linhas)   — Interfaces TypeScript
├── vite.config.ts       (23 linhas)   — Config Vite
├── tsconfig.json        (28 linhas)   — Config TypeScript
├── package.json         (23 linhas)   — Dependências
├── .gitignore           (24 linhas)
├── components/
│   ├── A4DocPreview.tsx (757 linhas)  — Motor de paginação A4
│   ├── SettingsPanel.tsx(625 linhas)  — UI de configurações (4 tabs)
│   └── Toolbar.tsx      (208 linhas)  — Toolbar de formatação
└── utils/
    └── heuristics.ts    (154 linhas)  — Extração heurística de metadados
```

**Total de linhas de código (excluindo node_modules): ~2.864**

---

## 2. Dependências

### Runtime (package.json)
| Pacote | Versão | Status |
|---|---|---|
| react | ^19.2.0 | npm (mas import map aponta para CDN!) |
| react-dom | ^19.2.0 | npm (mas import map aponta para CDN!) |
| lucide-react | ^1.17.0 | npm |
| motion | ^12.40.0 | npm |

### DevDependencies (package.json)
| Pacote | Versão |
|---|---|
| @types/node | ^22.14.0 |
| @vitejs/plugin-react | ^5.0.0 |
| typescript | ~5.8.2 |
| vite | ^6.2.0 |

### CDNs no index.html (Sprint 1 deve migrar)
| Biblioteca | CDN | Uso |
|---|---|---|
| Tailwind CSS | cdn.tailwindcss.com | Estilização |
| marked | cdn.jsdelivr.net/npm/marked | Parse Markdown → HTML |
| jspdf | cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1 | Geração PDF |
| html2canvas | cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1 | Captura visual |

### Import Maps (CDN para React!)
```json
{
  "react/": "https://aistudiocdn.com/react@^19.2.0/",
  "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/"
}
```
**ALERTA:** React e ReactDOM estão como npm em package.json mas o import map do index.html aponta para aistudiocdn.com. O Vite deve resolver via npm em build, mas em dev o browser pode usar o import map CDN.

### NÃO instaladas (precisam ser adicionadas)
| Pacote | Uso | Sprint |
|---|---|---|
| DOMPurify | Sanitização HTML | Sprint 2 |
| marked (npm) | Parse Markdown | Sprint 1 |
| jspdf (npm) | Geração PDF | Sprint 1 |
| html2canvas (npm) | Captura visual | Sprint 1 |

---

## 3. Configurações

### tsconfig.json
- **strict: true: NÃO HABILITADO** ← achado crítico
- target: ES2022
- module: ESNext
- jsx: react-jsx
- noEmit: true
- paths: `@/*` → `./*`
- allowImportingTsExtensions: true

### vite.config.ts
- Porta: 3000, host: 0.0.0.0
- Plugin: @vitejs/plugin-react
- **GEMINI_API_KEY exposta via `process.env.API_KEY` e `process.env.GEMINI_API_KEY`** ← risco de segurança
- Alias: `@` → root

### .gitignore
- **NÃO inclui `.env`** ← risco de segurança (GEMINI_API_KEY pode ser commitada)
- Inclui: node_modules, dist, logs, .vscode

---

## 4. Arquitetura

### Fluxo de dados
```
App.tsx (estado global)
  ├── markdownText (string)
  ├── config (DocumentConfig)
  ├── selectedTemplateId (string)
  └── overriddenFields (Record<string, boolean>)
      │
      ├── Toolbar.tsx → insere markdown no editor
      ├── A4DocPreview.tsx → renderiza preview paginado
      │     ├── marked.parse() → HTML
      │     ├── paginateHtml() → páginas físicas
      │     └── renderPages() → DOM com .a4-page-node
      ├── SettingsPanel.tsx → altera config
      │     ├── Tab: Templates
      │     ├── Tab: Estética (presets, fontes, tema editor)
      │     ├── Tab: Capa
      │     └── Tab: Estrutura (páginas, headers)
      └── utils/heuristics.ts → extrai metadados do markdown
```

### Componentes
| Componente | Responsabilidade | Linhas |
|---|---|---|
| App.tsx | Estado global, handlers, PDF generation, drag & drop | 666 |
| A4DocPreview.tsx | Preview paginado A4, splitting de conteúdo | 757 |
| SettingsPanel.tsx | 4 tabs de configuração (templates, estilo, capa, estrutura) | 625 |
| Toolbar.tsx | Botões de formatação markdown, importar, limpar, restaurar | 208 |

### Templates existentes
1. **Relatório Executivo** — preset: executive, cover: bold, A4 portrait
2. **Currículo Profissional** — preset: modern, cover: disabled, A4 portrait
3. **Artigo Acadêmico** — preset: classic, cover: minimal, A4 portrait
4. **Manual Técnico API** — preset: tech, cover: disabled, A4 portrait

### Sistema de temas do editor (EDITOR_THEME_CLASSES)
5 temas: light, dark, sand, forest, ocean

### Estilo de presets (STYLE_PRESETS)
5 presets: modern, classic, tech, moleskine, executive

---

## 5. Achados Críticos

| # | Achado | Impacto | Sprint |
|---|---|---|---|
| 1 | CDNs em runtime (Tailwind, marked, jspdf, html2canvas) | Deploy instável, bloqueia Vercel | Sprint 1 |
| 2 | Import maps apontam para aistudiocdn.com | React pode carregar de CDN em dev | Sprint 1 |
| 3 | tsconfig.json sem `strict: true` | Tipos fracos, bugs silenciosos | Sprint 1 |
| 4 | GEMINI_API_KEY exposta em vite.config.ts | Segurança | Sprint 0 (corrigir) |
| 5 | .gitignore não inclui `.env` | Chaves podem ser commitadas | Sprint 0 (corrigir) |
| 6 | Sem testes automatizados | Regressões silenciosas | Sprint 0B |
| 7 | Git não inicializado | Sem histórico, sem rollback | Sprint 0 (corrigir) |
| 8 | HTML renderizado sem sanitização (marked.parse + dangerouslySetInnerHTML) | XSS | Sprint 2 |
| 9 | App.tsx tem 666 linhas | Acoplamento alto | Futuro |
| 10 | A4DocPreview.tsx tem 757 linhas | Complexidade alta | Futuro |
| 11 | marked/jspdf/html2canvas usados como globals (declare const) | Type safety fraco | Sprint 1 |

---

## 6. O que existe e funciona

- [x] 4 templates com markdown e config recomendada
- [x] Sistema de presets visuais (5 estilos)
- [x] Preview paginado A4 com splitting inteligente
- [x] Geração PDF via html2canvas + jspdf
- [x] Drag & drop de arquivos .md/.txt
- [x] Importação por botão
- [x] Extração heurística de metadados (título, subtítulo, autor, data, instituição)
- [x] Toolbar com 11 ações de formatação
- [x] 5 temas do editor
- [x] Configurações de capa (4 layouts, 7 cores de destaque)
- [x] Configurações de página (A4/Letter, margens, orientação)
- [x] Header/footer configurável
- [x] Nome do PDF baseado no título da capa

---

## 7. O que NÃO existe (a ser implementado)

- [ ] Git inicializado
- [ ] .env protegido
- [ ] Dependências npm (marked, jspdf, html2canvas)
- [ ] Tailwind via npm/PostCSS
- [ ] DOMPurify
- [ ] tsconfig strict mode
- [ ] Testes automatizados
- [ ] Validação de tamanho de importação (8MB)
- [ ] Confirmação antes de substituir conteúdo
- [ ] Deploy na Vercel

---

## 8. Próximos passos (Sprint 0 restante + Sprint 1)

### Imediato (Sprint 0 — corrigir)
1. Adicionar `.env` ao .gitignore
2. Remover GEMINI_API_KEY de vite.config.ts ou documentar
3. Inicializar git (`git init && git add -A && git commit -m "initial"`)

### Sprint 1 (Migração de dependências)
1. Instalar marked, jspdf, html2canvas via npm
2. Remover CDNs do index.html
3. Remover import maps do index.html
4. Converter declarações `declare const` para imports
5. Instalar Tailwind via npm + PostCSS
6. Habilitar `strict: true` no tsconfig.json
7. Corrigir erros de tipo resultantes
