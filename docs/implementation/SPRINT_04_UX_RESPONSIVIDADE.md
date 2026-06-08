# Sprint 4 — UX, responsividade e melhorias visuais

## Objetivo

Implementar loading/progresso na exportação PDF, notificações de sucesso/erro, responsividade mobile (botões Editor/Preview, overlay de configurações) e garantir toolbar com 44px de área de toque.

---

## Impacto UI/UX

**Classificação:** Sim.

Esta sprint altera diretamente a interface: botões, notificações, layout mobile.

- Deve seguir `docs/design/UI_UX_GUIDE.md`.
- Deve validar mobile e desktop.
- Deve prever estados visuais (loading, erro, sucesso).
- Deve evitar aparência genérica de IA.

---

## Escopo da sprint

- Implementar spinner no botão de exportar durante geração do PDF.
- Desabilitar botão durante geração; prevenir múltiplos cliques.
- Timeout de 30 segundos com mensagem de erro.
- Implementar componente de notificação (toast) para sucesso/erro.
- Implementar alternância Editor/Preview em mobile (< 768px).
- Implementar overlay/modal de configurações em mobile.
- Garantir toolbar com >= 44px de área de toque em mobile.
- Garantir que app funciona em 320px sem scroll horizontal.

## Fora do escopo

- Alterar templates.
- Alterar sanitização.
- Implementar autosave.
- Alterar regras de negócio.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| Componente de exportação/botão | Alterar | Spinner, desabilitar, timeout |
| Novo componente Toast | Criar | Notificações de sucesso/erro |
| Header | Alterar | Botões Editor/Preview (mobile) |
| SettingsPanel | Alterar | Overlay em mobile |
| Toolbar | Alterar | 44px touch target |
| CSS/Tailwind | Alterar | Responsividade |

**Nota:** Caminhos são prováveis. Confirmar após Sprint 0.

---

## Tarefas em ordem

### Tarefa 4.1 — Implementar loading na exportação

**Descrição:** Ao clicar em "Exportar PDF", o botão deve mostrar spinner e texto "Gerando PDF...", ficar desabilitado e prevenir múltiplos cliques. Timeout de 30 segundos.

**Impacto UI/UX:** Sim — altera botão de exportar.

**Arquivos prováveis:**
- Componente de exportação/botão

**Critério de aceite:**
- Clicar em exportar → botão mostra spinner e "Gerando PDF...".
- Botão fica desabilitado durante geração.
- Múltiplos cliques não disparam múltiplas gerações.
- Se geração exceder 30s → mensagem de erro.
- Após conclusão → botão volta ao estado normal.

**Validação:**
- Clicar em exportar → verificar spinner.
- Clicar múltiplas vezes → verificar que só gera 1 PDF.
- Documento muito longo → verificar timeout.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar a lógica de geração do PDF.

---

### Tarefa 4.2 — Implementar notificações (toast)

**Descrição:** Criar componente de notificação toast que mostra mensagens de sucesso/erro e desaparece automaticamente após 5 segundos.

**Impacto UI/UX:** Sim — novo componente visual.

**Arquivos prováveis:**
- Novo componente `Toast.tsx` ou similar

**Critério de aceite:**
- Sucesso na exportação → toast positivo com nome do arquivo.
- Erro na exportação → toast de erro com descrição.
- Toast desaparece após 5 segundos.
- Toast não bloqueia a interface.

**Design (seguir UI_UX_GUIDE.md):**
- Cores: sucesso verde (#15803D), erro vermelho (#B91C1C).
- Posição: canto superior direito ou inferior.
- Animação: fade in/out discreto.

**Validação:**
- Exportar com sucesso → verificar toast.
- Simular erro → verificar toast.
- Esperar 5s → verificar desaparecimento.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar comportamento de exportação além de adicionar feedback.

---

### Tarefa 4.3 — Implementar responsividade mobile

**Descrição:** Em mobile (< 768px), implementar botões "Editor" / "Preview" no header para alternar entre as áreas. Configurações acessíveis via overlay/modal.

**Impacto UI/UX:** Sim — altera layout mobile.

**Arquivos prováveis:**
- Header
- SettingsPanel

**Critério de aceite:**
- Em mobile (< 768px), botões "Editor" / "Preview" aparecem no header.
- Clicar em "Editor" mostra o editor.
- Clicar em "Preview" mostra o preview.
- Botão de configurações abre overlay/modal.
- App funciona em tela de 320px sem scroll horizontal.
- Não há sobreposição de elementos.

**Design (seguir UI_UX_GUIDE.md):**
- Botões com >= 44px de área de toque.
- Overlay de configurações com botão de fechar.
- Layout em uma coluna.

**Validação:**
- Abrir DevTools → simular mobile 320px.
- Verificar botões Editor/Preview.
- Verificar overlay de configurações.
- Verificar que não há scroll horizontal.

**Riscos:**
- Layout pode quebrar em telas muito pequenas.

**O que NÃO alterar:**
- Não alterar layout desktop (>= 1024px).

---

### Tarefa 4.4 — Garantir toolbar 44px touch target

**Descrição:** Verificar e ajustar botões da toolbar para terem ao menos 44px de área de toque em mobile.

**Impacto UI/UX:** Sim — acessibilidade mobile.

**Arquivos prováveis:**
- Toolbar

**Critério de aceite:**
- Botões da toolbar >= 44px em mobile.
- Botões não ficam espremidos.

**Validação:**
- Inspecionar no DevTools → verificar tamanho dos botões.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar funcionalidade da toolbar.

---

## Comandos de validação da sprint

```bash
# Build
npm run build

# Preview local
npm run preview
```

---

## Testes necessários

- **Testes manuais:** Loading, notificações, mobile, toolbar.
- **Testes de responsividade:** 320px, 768px, 1024px.
- **Testes de regressão:** Funcionalidades existentes continuam.

---

## Fluxo manual de validação

1. Abrir app no desktop.
2. Clicar em exportar → verificar spinner e botão desabilitado.
3. Verificar toast de sucesso após exportação.
4. Abrir DevTools → simular mobile 320px.
5. Verificar botões Editor/Preview no header.
6. Alternar entre Editor e Preview.
7. Abrir configurações via overlay.
8. Verificar toolbar com botões >= 44px.
9. Exportar PDF em mobile.

---

## Riscos da sprint

- Layout mobile pode ter edge cases em telas muito pequenas.
- Overlay de configurações pode não funcionar bem em todos os navegadores mobile.

---

## Critérios finais de aceite da sprint

- [ ] Botão de exportar mostra spinner e fica desabilitado.
- [ ] Timeout de 30s funciona.
- [ ] Toast de sucesso/erro funciona.
- [ ] Botões Editor/Preview funcionam em mobile.
- [ ] Configurações acessíveis via overlay em mobile.
- [ ] Toolbar >= 44px em mobile.
- [ ] App funciona em 320px sem scroll horizontal.
- [ ] Build completa sem erros.

---

## O que NÃO deve ser alterado nesta sprint

- Templates.
- Sanitização.
- Regras de negócio (numeração, `---`, etc.).
- Exportação PDF além do feedback visual.
