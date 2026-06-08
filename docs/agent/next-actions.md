# Próximas Ações

Atualizado em: 2026-06-07
Projeto: `/mnt/c/Dev/markdown-para-pdf`

## 1. Próxima ação imediata

Executar Sprint 1 — migrar dependências de CDN para npm (7 tarefas).

## 2. Status atual

Sprints 0 e 00B concluídas. 22 testes passando. Plano v2.0 completo. Todos os PDs resolvidos.

## 3. Sprint 1 — Tarefas

1. Instalar marked via npm, remover CDN, converter `declare const` para import.
2. Instalar jspdf via npm, remover CDN, converter `declare const` para import.
3. Instalar html2canvas via npm, remover CDN, converter `declare const` para import.
4. Instalar Tailwind CSS via npm + PostCSS, remover CDN script.
5. Remover import maps do index.html.
6. Habilitar `strict: true` no tsconfig.json.
7. Corrigir erros de tipo resultantes do strict mode.

## 4. Sequência completa de sprints

```
Sprint 0    Preparação           CONCLUÍDA
Sprint 00B  Fundação de testes   CONCLUÍDA
Sprint 1    Migração de deps     Pendente ← PRÓXIMA
Sprint 2    Sanitização+nome     Pendente
Sprint 3    Regras de negócio    Pendente
Sprint 4    UX+responsividade    Pendente
Sprint 5    Deploy+validação     Pendente
```

## 5. Riscos da Sprint 1

- Tailwind CDN → npm pode quebrar todas as classes CSS.
- marked API pode diferir entre CDN global e npm import.
- strict mode pode revelar dezenas de erros de tipo.

## 6. Não fazer nesta etapa

- Não implementar funcionalidades novas.
- Não pular a migração de CDNs.
- Não ignorar erros de tipo do strict mode.
- Não criar novos templates, presets ou temas.
