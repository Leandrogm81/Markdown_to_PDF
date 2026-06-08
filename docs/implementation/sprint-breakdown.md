# Divisão de Sprints

**Projeto:** Markdown para PDF
**PRD de origem:** `docs/product/PRD_v1.1.md`
**Data:** 2026-06-07

---

## 1. Lista de sprints

| Sprint | Nome | Objetivo | Tarefas |
|---|---|---|---|
| 0 | Preparação | Mapear codebase e validar ambiente | 8 tarefas |
| 1 | Migração de dependências | Substituir CDNs por npm, remover GEMINI_API_KEY | 7 tarefas |
| 2 | Sanitização e nome do PDF | DOMPurify, nome descritivo, encoding | 4 tarefas |
| 3 | Regras de negócio | `---` em code blocks, numeração, preview vazio, sessão | 4 tarefas |
| 4 | UX e responsividade | Loading, notificações, mobile, toolbar | 4 tarefas |
| 5 | Deploy e validação | Vercel, meta tags, checklist final | 3 tarefas |

---

## 2. Dependências entre sprints

```
Sprint 0 (Preparação)
  └── Sprint 1 (Migração de dependências)
        ├── Sprint 2 (Sanitização e nome)
        ├── Sprint 3 (Regras de negócio)
        │     └── Sprint 4 (UX e responsividade)
        └── Sprint 5 (Deploy e validação) — depende de TODAS as anteriores
```

- Sprint 0 é independente.
- Sprint 1 depende de Sprint 0.
- Sprint 2 e 3 dependem de Sprint 1.
- Sprint 4 depende de Sprint 1 (e idealmente de Sprint 3).
- Sprint 5 depende de todas.

---

## 3. Ordem segura de execução

1. **Sprint 0** — obrigatória primeiro. Mapeia a codebase real.
2. **Sprint 1** — bloqueante para todas as outras. Sem CDNs migradas, nada funciona em produção.
3. **Sprint 2** — pode ser executada imediatamente após Sprint 1. É independente de Sprint 3.
4. **Sprint 3** — pode ser parcialmente paralela com Sprint 2, mas mais segura sequencial.
5. **Sprint 4** — depende de Sprint 1; idealmente após Sprint 3.
6. **Sprint 5** — última. Deploy só após todas as correções.

---

## 4. Riscos por sprint

| Sprint | Risco principal | Impacto | Mitigação |
|---|---|---|---|
| 0 | Mapeamento incompleto | Médio | Ler todos os arquivos relevantes |
| 1 | Migração de CDNs quebra o build | Alto | Validar build após cada tarefa |
| 1 | GEMINI_API_KEY referenciada em código | Alto | grep completo antes de remover |
| 2 | Sanitização muito restritiva | Médio | Testar com HTML válido |
| 2 | Sanitização muito permissiva | Alto | Usar whitelist explícita |
| 3 | `---` em code blocks não detectado corretamente | Médio | Testar com múltiplos cenários |
| 4 | Layout quebrado em mobile | Médio | Testar em 320px real |
| 5 | Deploy Vercel falha | Médio | Configurar corretamente antes de deploy |

---

## 5. Critérios de pronto por sprint

### Sprint 0
- Todos os arquivos relevantes foram lidos.
- Dependências mapeadas.
- CDNs identificadas.
- GEMINI_API_KEY identificada.
- Estrutura de componentes documentada.

### Sprint 1
- `npm run build` completa sem erros.
- Nenhuma CDN no `index.html`.
- GEMINI_API_KEY não está no bundle.
- App funciona no navegador.
- Classes Tailwind funcionam.

### Sprint 2
- `<script>` não é executado no preview.
- Tags permitidas funcionam.
- Nome do PDF segue sanitização.
- Arquivo UTF-8 com BOM carrega.

### Sprint 3
- `---` em code block não cria quebra.
- Numeração correta (capa não contada).
- Preview vazio mostra mensagem.
- Recarregar restaura padrões.

### Sprint 4
- Botão de exportar mostra spinner.
- Notificações funcionam.
- Mobile funciona em 320px.
- Toolbar >= 44px em mobile.

### Sprint 5
- App abre na Vercel.
- Meta tags presentes.
- Checklist final 100%.
