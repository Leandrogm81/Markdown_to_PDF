# Próximas Ações

Atualizado em: 2026-06-07
Projeto: `/mnt/c/Dev/markdown-para-pdf`

## 1. Próxima ação imediata

Executar Sprint 1 — migrar dependências de CDN para npm (7 tarefas).

## 2. Status atual

Sprint 0 completa. Codebase mapeada. Git inicializado. PDs resolvidos.

## 3. Sprint 1 — Tarefas

1. Instalar marked via npm, remover CDN, converter `declare const` para import.
2. Instalar jspdf via npm, remover CDN, converter `declare const` para import.
3. Instalar html2canvas via npm, remover CDN, converter `declare const` para import.
4. Instalar Tailwind CSS via npm + PostCSS, remover CDN script e config inline.
5. Remover import maps do index.html (React já via npm/Vite).
6. Habilitar `strict: true` no tsconfig.json.
7. Corrigir erros de tipo resultantes do strict mode.

## 4. Riscos da Sprint 1

- Migração Tailwind CDN → npm pode quebrar todas as classes.
- marked API pode diferir entre CDN global e npm import.
- jspdf/html2canvas types podem não estar disponíveis.
- strict mode pode revelar dezenas de erros de tipo.

## 5. Não fazer nesta etapa

- Não implementar funcionalidades novas.
- Não pular a migração de CDNs.
- Não ignorar erros de tipo do strict mode.
