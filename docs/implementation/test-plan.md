# Plano de Testes

Projeto: `/mnt/c/Dev/markdown-para-pdf`
Versão: 2.0 (PDs resolvidos)
Data: 2026-06-07

---

## 1. Estratégia geral de validação

O projeto não possui testes automatizados. A validação é feita por:

1. **Build**: `npm run build` deve gerar `dist/` sem erro.
2. **Dev**: `npm run dev` deve iniciar sem erro no console.
3. **TypeScript**: `npx tsc --noEmit` deve passar sem erros.
4. **Manual**: cada sprint tem fluxo manual de validação.

Não há framework de teste configurado (sem vitest, jest, etc.).

---

## 2. Comandos prováveis

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Typecheck
npx tsc --noEmit

# Preview do build
npm run preview
```

**Nota:** Comandos confirmados no `package.json`.

---

## 3. Testes por sprint

### Sprint 0 — Preparação (CONCLUÍDA)

- Nenhum teste necessário (sprint de leitura apenas).

### Sprint 1 — Migração de dependências

| Teste | Tipo | Como verificar |
|---|---|---|
| App inicia sem erro | Manual | `npm run dev` → abrir no browser → sem erro no console |
| Build funciona | Manual | `npm run build` → `dist/` gerado sem erro |
| Preview renderiza Markdown | Manual | Digitar Markdown → preview atualiza |
| PDF exporta | Manual | Clicar "Baixar PDF" → arquivo baixado |
| Não há CDNs no HTML | Manual | Verificar `index.html` sem `<script src="cdn...">` |
| Não há erros de tipo | Manual | `npx tsc --noEmit` sem erros |
| Tailwind funciona | Manual | Classes Tailwind aplicadas no visual |

### Sprint 2 — Sanitização e nome do PDF

| Teste | Tipo | Como verificar |
|---|---|---|
| XSS bloqueado | Manual | Inserir `<script>alert('xss')</script>` no Markdown → não executa |
| HTML válido funciona | Manual | Inserir `<strong>texto</strong>` → renderiza como negrito |
| Links funcionam | Manual | Inserir `<a href="...">link</a>` → renderiza como link |
| Iframe removido | Manual | Inserir `<iframe src="...">` → removido do output |
| onclick removido | Manual | Inserir `<div onclick="alert(1)">` → atributo removido |
| Nome do PDF descritivo | Manual | Exportar com título "Relatório Q2" → arquivo `relatorio-q2.pdf` |
| Importação > 8MB rejeitada | Manual | Importar arquivo > 8MB → mensagem de erro |
| Confirmação antes de substituir | Manual | Trocar template com conteúdo → modal de confirmação |

### Sprint 3 — Regras de negócio

| Teste | Tipo | Como verificar |
|---|---|---|
| `---` cria quebra | Manual | Inserir `---` isolado → nova página no preview |
| `---` em code block NÃO cria quebra | Manual | Inserir `---` dentro de bloco de código → sem quebra |
| Preview vazio mostra mensagem | Manual | Limpar editor → preview mostra "Comece a digitar..." |
| Numeração correta | Manual | Documento com capa → numeração começa em 1 no corpo |
| Encoding UTF-8 BOM | Manual | Importar arquivo com BOM → conteúdo correto |

### Sprint 4 — UX e responsividade

| Teste | Tipo | Como verificar |
|---|---|---|
| Mobile 320px funciona | Manual | Abrir em DevTools 320px → sem scroll horizontal |
| Botões Editor/Preview alternam | Manual | Em mobile → botões alternam áreas |
| 44px área de toque | Manual | Verificar botões da toolbar ≥ 44px |
| Notificação 5s | Manual | Exportar → notificação desaparece após 5s |
| Spinner exportar | Manual | Clicar exportar → botão mostra spinner e desabilita |
| Timeout 30s | Manual | (Difícil de testar; verificar código) |

### Sprint 5 — Deploy e validação

| Teste | Tipo | Como verificar |
|---|---|---|
| GEMINI_API_KEY removida | Manual | Buscar no bundle de produção |
| Meta tags presentes | Manual | Verificar `<head>` do index.html |
| Build de produção OK | Manual | `npm run build` → sem erro |
| App funciona na Vercel | Manual | Deploy → acessar URL → funciona |
| Chrome funciona | Manual | Testar no Chrome |
| Firefox funciona | Manual | Testar no Firefox |
| Safari funciona | Manual | Testar no Safari |
| Edge funciona | Manual | Testar no Edge |

---

## 4. Critérios de aprovação

Para considerar o MVP pronto:

- [ ] `npm run build` funciona sem erro.
- [ ] App abre sem erro no browser.
- [ ] Usuário pode digitar Markdown e ver preview.
- [ ] Usuário pode importar arquivo .md.
- [ ] Usuário pode ajustar configurações visuais.
- [ ] Usuário pode exportar PDF com nome descritivo.
- [ ] HTML `<script>` não é executado.
- [ ] CDNs não estão no bundle de produção.
- [ ] GEMINI_API_KEY não está exposta.
- [ ] App funciona em mobile (320px).
- [ ] Botão de exportar mostra spinner.
- [ ] `---` em code block não cria quebra.
- [ ] Preview vazio mostra mensagem orientativa.
- [ ] Não há erros no console do browser.
