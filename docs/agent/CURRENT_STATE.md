# Current State

## Estado atual
MVP `markdown-para-pdf` completo, auditado, com correção de checklist e correção de oklch deployadas. 37 testes passando. Arquitetura mapeada. Working directory limpo. 24 commits.

## Última ação relevante
Bug oklch corrigido: Tailwind CSS 4 gera cores em formato `oklch()` que o `html2canvas` não suporta. Plugin Vite `oklchFallbackPlugin` adicionado em `vite.config.ts` para converter oklch→hex no build via `generateBundle`. 0 ocorrências de oklch no CSS de saída. Arquitetura mapeada em `docs/architecture/`.

## Arquivos relevantes
- `vite.config.ts` — plugin oklch-to-srgb adicionado
- `docs/architecture/architecture.map.json` — mapa de arquitetura
- `docs/architecture/architecture.html` — visualização standalone
- `docs/architecture/architecture.review.md` — revisão conceitual
- `docs/audit/validation-report.md` — validação pós-correção
- `docs/evolution/retrospective-v1.md` — retrospectiva do ciclo v1
- `docs/audit/final-audit.md` — auditoria final
- `docs/product/PRD_v1.1.md` — PRD consolidado
- `docs/design/UI_UX_GUIDE.md` — guia visual

## Pendências imediatas
- Capturar screenshots preview/PDF para evidência visual (Média)
- Adicionar teste de componente (A4DocPreview render) (Média)
- Code splitting chunk 953KB (Baixa)

## Riscos atuais
- Fidelidade preview/PDF sem screenshots reais (Média)
- Testes sem componente/integração (Média)
- Cross-browser não validado (Média)

## Próxima ação recomendada
Iniciar v2: code splitting, teste de componente, Lighthouse, screenshots.

## Não fazer agora
- Não recomeçar PRD, plano ou sprints
- Não criar novas funcionalidades sem autorização
- Não remover `input` do ALLOWED_TAGS

## Seguro rodar `/new`?
Sim — correção oklch deployada, arquitetura mapeada, working directory limpo.
