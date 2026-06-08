# Sprint 0 — Preparação e auditoria do projeto

## Objetivo

Mapear a codebase real, entender a arquitetura atual, confirmar dependências, identificar CDNs, verificar configurações e documentar o estado antes de qualquer alteração.

Esta sprint NÃO implementa funcionalidades. É puramente investigativa.

---

## Impacto UI/UX

**Classificação:** Não aplicável.

Esta sprint não altera nenhuma tela, componente ou fluxo. Apenas lê e documenta.

---

## Arquivos a inspecionar

| Arquivo | Finalidade |
|---|---|
| `package.json` | Dependências instaladas, scripts disponíveis |
| `index.html` | CDNs atuais, meta tags, import maps |
| `vite.config.ts` | Config de build, GEMINI_API_KEY, aliases |
| `tsconfig.json` | Strict mode, paths, target |
| `.gitignore` | Proteção de .env |
| `App.tsx` | Componente principal, estrutura geral |
| `index.tsx` | Entry point |
| `components/A4DocPreview.tsx` | Preview paginado |
| `components/SettingsPanel.tsx` | Painel de configurações |
| `components/Toolbar.tsx` | Toolbar de formatação |
| `templates.ts` | Templates existentes |
| `styles.ts` | Estilos/configurações visuais |
| `types.ts` | Definições de tipos |
| `utils/heuristics.ts` | Heurísticas de metadados |
| `docs/design/UI_UX_GUIDE.md` | Guia visual obrigatório |

**Nota:** Todos os caminhos são prováveis e devem ser confirmados na codebase real.

---

## Estrutura a mapear

- Componentes React existentes e suas responsabilidades.
- Como o Markdown é parseado e renderizado.
- Como o preview paginado funciona.
- Como a exportação PDF funciona.
- Como as configurações visuais são gerenciadas.
- Como os templates são carregados.
- Como a importação de arquivos funciona.
- Estado global da aplicação.
- Estilos e temas existentes.

---

## Dependências a verificar

| Dependência | Status esperado | Onde verificar |
|---|---|---|
| react | Instalada como npm | `package.json` |
| react-dom | Instalada como npm | `package.json` |
| vite | Instalada como devDep | `package.json` |
| typescript | Instalada como devDep | `package.json` |
| Tailwind CSS | CDN no index.html | `index.html` |
| marked | CDN no index.html | `index.html` |
| jspdf | CDN no index.html | `index.html` |
| html2canvas | CDN no index.html | `index.html` |
| DOMPurify | NÃO instalada | `package.json` |
| GEMINI_API_KEY | Referenciada em vite.config.ts | `vite.config.ts` |

---

## Comandos iniciais

```bash
# Verificar se o app inicia
npm run dev

# Verificar build
npm run build

# Verificar tipos (se disponível)
npx tsc --noEmit
```

**Nota:** Comandos devem ser confirmados no `package.json`.

---

## Tarefas em ordem

### Tarefa 0.1 — Ler package.json

**Descrição:** Ler e documentar todas as dependências e scripts disponíveis.

**Critério de aceite:**
- Lista de dependências (runtime e dev) documentada.
- Scripts disponíveis documentados.
- Comparação com CDNs do index.html feita.

### Tarefa 0.2 — Ler index.html e mapear CDNs

**Descrição:** Identificar todas as CDNs carregadas via `<script>` no index.html.

**Critério de aceite:**
- Lista de CDNs com URLs completas.
- Import maps documentados.
- Meta tags existentes documentadas.

### Tarefa 0.3 — Ler vite.config.ts

**Descrição:** Entender configuração de build, aliases e variáveis de ambiente.

**Critério de aceite:**
- GEMINI_API_KEY identificada e localizada.
- Aliases documentados.
- Define/replace documentado.

### Tarefa 0.4 — Ler tsconfig.json

**Descrição:** Verificar se strict mode está habilitado.

**Critério de aceite:**
- Status de `strict: true` documentado.
- Paths e target documentados.

### Tarefa 0.5 — Mapear componentes

**Descrição:** Ler todos os componentes React e documentar suas responsabilidades.

**Critério de aceite:**
- Árvore de componentes documentada.
- Responsabilidade de cada componente documentada.
- Estado global identificado.

### Tarefa 0.6 — Ler templates.ts

**Descrição:** Listar templates existentes e suas configurações recomendadas.

**Critério de aceite:**
- Templates listados com nome, descrição e config.
- Comportamento de seleção de template documentado.

### Tarefa 0.7 — Verificar .gitignore

**Descrição:** Confirmar que `.env` está protegido.

**Critério de aceite:**
- `.env` está na lista de ignorados (ou será adicionado).

### Tarefa 0.8 — Verificar existência de testes

**Descrição:** Mapear se existem testes automatizados.

**Critério de aceite:**
- Status de testes documentado (existem/não existem).

---

## Critérios de aceite da sprint

- [ ] Todos os arquivos relevantes foram lidos.
- [ ] Dependências mapeadas e comparadas com CDNs.
- [ ] GEMINI_API_KEY localizada.
- [ ] Estrutura de componentes documentada.
- [ ] Templates existentes listados.
- [ ] Status de testes documentado.
- [ ] `.gitignore` verificado.

---

## Riscos

- Nenhum risco técnico (sprint de leitura apenas).
- Risco de mapeamento incompleto se não ler todos os arquivos.

---

## O que NÃO deve ser alterado

- Nenhum arquivo deve ser modificado nesta sprint.
- Apenas leitura e documentação.
