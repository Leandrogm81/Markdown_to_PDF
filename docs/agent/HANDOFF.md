# Handoff — Continuidade de Sessão

## 1. Objetivo atual

MVP `markdown-para-pdf` completo e pronto para deploy na Vercel. Todas as 5 sprints de implementação concluídas.

## 2. Estado geral do projeto

- Projeto: `/mnt/c/Dev/markdown-para-pdf`
- Stack: Vite + React 19 + TypeScript, sem backend
- Git: todas as sprints commitadas
- Testes: Vitest + RTL, 22 testes passando
- Build: `npm run build` OK, `npx tsc --noEmit` OK (strict mode), `npm test` OK
- PRD v1.1 consolidado em `docs/product/PRD_v1.1.md`
- 7 sprints concluídas (Sprints 0, 00B, 1, 2, 3, 4, 5)
- 25 tarefas de implementação concluídas

## 3. O que foi feito (resumo das sprints)

- **Sprint 0**: Mapeamento da codebase, git inicializado
- **Sprint 00B**: Vitest + RTL, 22 smoke tests
- **Sprint 1**: jspdf, html2canvas, Tailwind migrados de CDN para npm. Import maps removidos. Strict mode habilitado.
- **Sprint 2**: DOMPurify sanitização. Nome do PDF descritivo (PRD 7.10). Validação 8MB. Modal de confirmação.
- **Sprint 3**: `---` em code blocks não cria quebra. Preview vazio com mensagem. Numeração de página (exclui capa). Encoding UTF-8/Latin-1.
- **Sprint 4**: Header responsivo 320px. Botões 44px. Notificações 5s. Timeout 30s PDF.
- **Sprint 5**: GEMINI_API_KEY removida. Meta tags + favicon. vercel.json SPA. Build validado.

## 4. Decisões tomadas (ativas)

- Autosave local NÃO no MVP
- Tamanho máximo importação: 8MB
- Confirmação antes de substituir conteúdo: SIM
- Manter 5 presets, 4 temas de capa, 4 templates, 7 heurísticas
- Sem limite de tamanho/páginas do PDF
- DOMPurify como sanitização
- Sem tema escuro no MVP
- Deploy na Vercel como site estático

## 5. Arquivos importantes

| Arquivo | Função |
|---|---|
| `docs/product/PRD_v1.1.md` | PRD consolidado |
| `docs/design/UI_UX_GUIDE.md` | Guia visual |
| `docs/implementation/SPRINT_*_TAREFAS.md` | Tarefas por sprint |
| `docs/evolution/DECISIONS.md` | Decisões permanentes |
| `docs/evolution/CHANGELOG.md` | Histórico de mudanças |
| `vercel.json` | Config SPA para Vercel |
| `public/favicon.svg` | Favicon do app |

## 6. Próximos passos

1. Fazer push do repositório para o GitHub.
2. Conectar repositório ao Vercel.
3. Deploy automático.
4. Validar em produção.
5. Configurar domínio customizado (opcional).

## 7. O que o próximo agente NÃO deve fazer

- Não recomeçar PRD, plano ou sprints.
- Não re-quebrar tarefas.
- Não criar novos templates/presets/temas.
- Não adicionar autosave ou tema escuro.
- Não alterar funcionalidades sem justificativa.

## 8. Segurança para troca de sessão

- Seguro rodar `/new`? Sim
- Motivo: MVP completo, todas as sprints commitadas.
- Nome sugerido: `markdown-para-pdf-deploy-vercel`
