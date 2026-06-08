# Sprint 5 — Deploy na Vercel e validação final

## Objetivo

Configurar deploy na Vercel, adicionar meta tags obrigatórias, executar checklist final de validação e garantir que o MVP está pronto para uso.

---

## Impacto UI/UX

**Classificação:** Indireto.

Meta tags afetam compartilhamento e aparência em links. O deploy em si não altera a interface, mas configuração incorreta pode impedir acesso.

---

## Escopo da sprint

- Adicionar meta tags obrigatórias ao `index.html` (title, description, favicon, og:title, og:description).
- Configurar `vercel.json` ou equivalente para SPA redirect.
- Executar checklist final do PRD seção 16.
- Verificar bundle de produção.

## Fora do escopo

- Alterar funcionalidades.
- Alterar visual.
- Adicionar analytics.
- Configurar domínio personalizado.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| `index.html` | Alterar | Meta tags |
| `vercel.json` | Criar | Config de deploy |

**Nota:** Caminhos são prováveis. Confirmar após Sprint 0.

---

## Tarefas em ordem

### Tarefa 5.1 — Configurar meta tags

**Descrição:** Adicionar meta tags obrigatórias ao `index.html`: title, description, favicon, Open Graph.

**Impacto UI/UX:** Indireto — afeta aparência em links compartilhados.

**Arquivos prováveis:**
- `index.html`

**Critério de aceite:**
- `<title>` presente e descritivo.
- `<meta name="description">` presente.
- Favicon configurado.
- `og:title` presente.
- `og:description` presente.

**Validação:**
- Abrir `index.html` e verificar tags.
- Compartilhar URL e verificar preview.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar scripts ou imports.

---

### Tarefa 5.2 — Configurar Vercel

**Descrição:** Criar `vercel.json` com configuração para SPA (redirect para index.html se necessário).

**Impacto UI/UX:** Não.

**Arquivos prováveis:**
- `vercel.json`

**Critério de aceite:**
- `vercel.json` existe com configuração correta.
- Framework: Vite detectado automaticamente.
- Build command: `npm run build`.
- Output directory: `dist`.

**Validação:**
- `vercel deploy` (se CLI disponível) ou verificar config.

**Riscos:**
- Config incorreta pode impedir deploy.

**O que NÃO alterar:**
- Não alterar `vite.config.ts` para deploy.

---

### Tarefa 5.3 — Executar checklist final

**Descrição:** Verificar todos os critérios de aceite gerais do PRD (seção 16) e o checklist de qualidade.

**Impacto UI/UX:** Não.

**Arquivos prováveis:** Todos.

**Critério de aceite:**
- Todos os itens do checklist abaixo marcados como OK.

**Checklist PRD seção 16:**
- [ ] App abre sem erro.
- [ ] Usuário pode digitar Markdown e ver preview.
- [ ] Usuário pode importar arquivo `.md`.
- [ ] Usuário pode ajustar configurações visuais.
- [ ] Usuário pode exportar PDF.
- [ ] PDF tem nome descritivo.
- [ ] HTML perigoso é sanitizado.
- [ ] App funciona em mobile (320px).
- [ ] App funciona em Chrome, Firefox, Safari, Edge.
- [ ] Não há erros no console.
- [ ] CDNs foram substituídas.
- [ ] GEMINI_API_KEY não está exposta.
- [ ] Preview e PDF têm mesma quantidade de páginas.
- [ ] Botão de exportar mostra feedback visual.
- [ ] `---` em code block não cria quebra.

**Validação:**
- Testar cada item manualmente.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Nenhum arquivo (apenas verificação).

---

## Comandos de validação da sprint

```bash
# Build
npm run build

# Verificar meta tags
grep -E "<title>|<meta name=\"description\"|og:title" index.html

# Verificar bundle
ls -la dist/

# Verificar ausência de CDNs e GEMINI
grep -r "cdn\\|GEMINI" dist/

# Preview local final
npm run preview
```

---

## Testes necessários

- **Testes manuais:** Todos os critérios do PRD seção 16.
- **Testes de compatibilidade:** Chrome, Firefox, Safari, Edge.
- **Testes de responsividade:** 320px, 768px, 1024px, 1440px.

---

## Fluxo manual de validação

1. Executar `npm run build`.
2. Executar `npm run preview`.
3. Abrir no navegador.
4. Testar cada critério da seção 16 do PRD.
5. Testar em mobile (DevTools).
6. Verificar console sem erros.
7. Exportar PDF e verificar.

---

## Riscos da sprint

- Deploy na Vercel pode ter problemas de configuração.
- Alguns critérios podem não passar na primeira tentativa.

---

## Critérios finais de aceite da sprint

- [ ] Meta tags presentes no `index.html`.
- [ ] `vercel.json` configurado.
- [ ] Todos os critérios do PRD seção 16 passam.
- [ ] Build completa sem erros.
- [ ] Bundle não contém CDNs nem GEMINI_API_KEY.

---

## O que NÃO deve ser alterado nesta sprint

- Funcionalidades existentes.
- Visual ou layout.
- Templates.
- Configurações visuais.

---

## Sugestões fora do escopo

As seguintes sugestões NÃO fazem parte da implementação atual:

- Configurar domínio personalizado na Vercel.
- Adicionar Vercel Analytics.
- Adicionar Sentry para error tracking.
- Implementar PWA (service worker).
- Adicionar testes automatizados.
