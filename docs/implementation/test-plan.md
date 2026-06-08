# Plano de Testes

**Projeto:** Markdown para PDF
**PRD de origem:** `docs/product/PRD_v1.1.md`
**Data:** 2026-06-07

---

## 1. Estratégia geral de validação

O projeto não possui testes automatizados configurados. A validação será feita por:

1. **Build verification:** `npm run build` deve completar sem erros.
2. **Manual testing:** cada sprint terá um fluxo manual de validação.
3. **Console verification:** o console do navegador não deve ter erros.
4. **Visual inspection:** comparação entre preview e PDF exportado.

---

## 2. Comandos prováveis

| Comando | Finalidade | Observação |
|---|---|---|
| `npm run dev` | Iniciar servidor de desenvolvimento | Porta 3000 |
| `npm run build` | Gerar bundle de produção | Deve completar sem erros |
| `npm run preview` | Visualizar bundle de produção local | Verificar se app funciona |

**Nota:** O projeto não tem scripts de lint, typecheck ou test configurados no `package.json`. Se necessário, adicionar `tsc --noEmit` para typecheck.

Comandos adicionais que podem ser necessários:
- `npx tsc --noEmit` — verificar tipos TypeScript.
- Verificação manual no DevTools do navegador.

---

## 3. Testes por sprint

### Sprint 0 — Preparação

- **Testes unitários:** Nenhum (sprint de leitura).
- **Testes manuais:** Verificar que `npm run dev` inicia sem erros.
- **Testes de regressão:** Nenhum.

### Sprint 1 — Migração de dependências

- **Testes manuais:**
  - App abre sem erro no navegador.
  - Classes Tailwind são aplicadas (cores, layout).
  - Markdown é renderizado no preview.
  - PDF é exportado corretamente.
  - Nenhuma CDN no `index.html`.
  - GEMINI_API_KEY não está no bundle (`grep -r "GEMINI" dist/`).
- **Testes de regressão:**
  - Todas as funcionalidades existentes continuam funcionando.
  - Preview paginado funciona.
  - Templates carregam.

### Sprint 2 — Sanitização e nome do PDF

- **Testes manuais:**
  - Inserir `<script>alert('xss')</script>` no Markdown → não executa.
  - Inserir `<strong>texto</strong>` → renderiza como negrito.
  - Inserir `<iframe src="...">` → removido do output.
  - Exportar PDF com título "Relatório Trimestral Q2" → arquivo `relatorio-trimestral-q2.pdf`.
  - Importar arquivo UTF-8 com BOM → carrega corretamente.
- **Testes de segurança:**
  - Verificar XSS com múltiplas variantes de `<script>`.
  - Verificar que `onclick` e atributos `on*` são removidos.

### Sprint 3 — Regras de negócio

- **Testes manuais:**
  - Inserir `---` dentro de bloco de código → NÃO cria quebra de página.
  - Inserir `---` isolado → cria quebra de página.
  - Habilitar capa → numeração começa em 1 no corpo.
  - Desabilitar capa → numeração começa em 1 na primeira página.
  - Editor vazio → preview mostra mensagem orientativa.
  - Recarregar página → configurações voltam ao padrão.

### Sprint 4 — UX e responsividade

- **Testes manuais:**
  - Clicar em exportar → botão mostra spinner e fica desabilitado.
  - Exportar PDF com sucesso → toast de sucesso aparece e desaparece após 5s.
  - Simular erro de exportação → toast de erro aparece.
  - Abrir em mobile (< 768px) → botões Editor/Preview aparecem.
  - Alternar entre Editor e Preview em mobile.
  - Configurações acessíveis via overlay em mobile.
  - Botões da toolbar >= 44px em mobile.
  - Sem scroll horizontal em tela de 320px.

### Sprint 5 — Deploy e validação

- **Testes manuais:**
  - App abre na URL da Vercel sem erro.
  - Todos os critérios de aceite gerais do PRD (seção 16).
  - Meta tags presentes (verificar com DevTools).
  - Favicon aparece.
  - PDF exportado na Vercel funciona.

---

## 4. Critérios de aprovação

A implementação é considerada pronta quando:

- [ ] `npm run build` completa sem erros.
- [ ] Nenhuma CDN no `index.html`.
- [ ] GEMINI_API_KEY não está no bundle.
- [ ] HTML `<script>` não é executado no preview.
- [ ] Nome do PDF segue sequência de sanitização.
- [ ] `---` em code block não cria quebra de página.
- [ ] Numeração começa em 1 no corpo (capa não contada).
- [ ] Preview vazio mostra mensagem orientativa.
- [ ] Botão de exportar mostra spinner e fica desabilitado.
- [ ] Notificações de sucesso/erro funcionam.
- [ ] App funciona em mobile 320px sem scroll horizontal.
- [ ] App funciona em desktop >= 1024px com editor e preview lado a lado.
- [ ] Não há erros no console do navegador.
- [ ] App abre na Vercel sem erro.
