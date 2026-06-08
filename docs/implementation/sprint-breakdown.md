# Divisão de Sprints

Projeto: `/mnt/c/Dev/markdown-para-pdf`
Versão: 2.0 (PDs resolvidos)
Data: 2026-06-07

---

## 1. Lista de sprints

| Sprint | Nome | Objetivo | Tarefas | Status |
|---|---|---|---|---|
| Sprint 0 | Preparação | Mapear codebase | 8 | CONCLUÍDA |
| Sprint 1 | Migração de dependências | Substituir CDNs por npm | 7 | Pendente |
| Sprint 2 | Sanitização e nome do PDF | DOMPurify + nome descritivo + importação | 5 | Pendente |
| Sprint 3 | Regras de negócio | `---` em code blocks, preview vazio, numeração | 4 | Pendente |
| Sprint 4 | UX e responsividade | Mobile, notificações, confirmação | 4 | Pendente |
| Sprint 5 | Deploy e validação | Vercel, meta tags, checklist final | 5 | Pendente |

**Total de tarefas:** 33 (8 concluídas + 25 pendentes)

---

## 2. Dependências entre sprints

```
Sprint 0 (CONCLUÍDA)
    │
    ▼
Sprint 1 (Migração de dependências) ← BLOQUEANTE
    │
    ├──► Sprint 2 (Sanitização + nome PDF)
    │
    ├──► Sprint 3 (Regras de negócio)
    │        │
    │        ▼
    │    Sprint 4 (UX + responsividade)
    │
    ▼
Sprint 5 (Deploy + validação) ← ÚLTIMA
```

- Sprint 1 é pré-requisito de todas as outras.
- Sprint 2 e 3 podem ser executadas em paralelo após Sprint 1.
- Sprint 4 é mais segura após Sprint 3.
- Sprint 5 é a última (deploy).

---

## 3. Ordem segura de execução

1. **Sprint 0** → CONCLUÍDA.
2. **Sprint 1** → Migrar CDNs. Mais crítica. Pode quebrar build.
3. **Sprint 2** → Sanitização + nome do PDF. Segurança.
4. **Sprint 3** → Regras de negócio. Correções de comportamento.
5. **Sprint 4** → UX e responsividade. Polish visual.
6. **Sprint 5** → Deploy. Última.

---

## 4. Riscos por sprint

### Sprint 1 — Migração de dependências
- **Alto:** Tailwind CDN → npm pode quebrar todas as classes CSS.
- **Alto:** marked API pode diferir entre CDN global e npm import.
- **Médio:** jspdf/html2canvas types podem não estar disponíveis.
- **Médio:** strict mode pode revelar dezenas de erros de tipo.

### Sprint 2 — Sanitização e nome do PDF
- **Médio:** DOMPurify pode remover HTML legítimo (whitelist muito restritiva).
- **Baixo:** Sequência de sanitização do nome pode ter edge cases.

### Sprint 3 — Regras de negócio
- **Médio:** Detectar `---` dentro de code blocks requer parser Markdown correto.
- **Baixo:** Numeração de página pode ter off-by-one com capa.

### Sprint 4 — UX e responsividade
- **Médio:** Layout mobile pode quebrar em telas muito pequenas.
- **Baixo:** 44px de toque pode conflitar com design atual.

### Sprint 5 — Deploy e validação
- **Médio:** Configuração Vercel pode ter edge cases (SPA redirect).
- **Baixo:** Meta tags podem estar incompletas.

---

## 5. Critérios de pronto por sprint

### Sprint 0 (CONCLUÍDA)
- [x] Codebase mapeada.
- [x] Git inicializado.
- [x] .gitignore corrigido.

### Sprint 1
- [ ] `npm run dev` funciona sem erro.
- [ ] `npm run build` gera `dist/` sem erro.
- [ ] Não há CDNs no `index.html`.
- [ ] Import maps removidos.
- [ ] `strict: true` habilitado.
- [ ] Sem erros de tipo TypeScript.
- [ ] Preview renderiza Markdown.
- [ ] PDF exporta com sucesso.

### Sprint 2
- [ ] `<script>alert('xss')</script>` não executa.
- [ ] HTML válido renderiza corretamente.
- [ ] Nome do PDF segue sequência de sanitização.
- [ ] Importação > 8MB é rejeitada.
- [ ] Confirmação antes de substituir conteúdo funciona.

### Sprint 3
- [ ] `---` isolado cria quebra de página.
- [ ] `---` em code block NÃO cria quebra.
- [ ] Preview vazio mostra mensagem orientativa.
- [ ] Numeração começa em 1 no corpo (capa não contada).

### Sprint 4
- [ ] App funciona em 320px sem scroll horizontal.
- [ ] Botões Editor/Preview alternam em mobile.
- [ ] Botões da toolbar ≥ 44px.
- [ ] Notificações desaparecem após 5s.
- [ ] Spinner no botão de exportar funciona.

### Sprint 5
- [ ] GEMINI_API_KEY removida do código.
- [ ] Meta tags presentes no `index.html`.
- [ ] `npm run build` funciona.
- [ ] App funciona na Vercel.
- [ ] Funciona em Chrome, Firefox, Safari, Edge.
