# Sprint 3 — Correções de regra de negócio

## Objetivo

Corrigir comportamentos de regra de negócio definidos no PRD v1.1: `---` em code blocks, numeração de página (capa não contada), preview com conteúdo vazio e definição explícita de "sessão".

---

## Impacto UI/UX

**Classificação:** Sim.

Esta sprint altera o comportamento visível do preview (numeração, estado vazio, quebra de página).

- Deve seguir `docs/design/UI_UX_GUIDE.md`.
- Deve validar mobile e desktop.
- Deve verificar estados visuais (vazio, numeração).
- Deve evitar aparência genérica de IA.

---

## Escopo da sprint

- Corrigir parser de `---` para ignorar dentro de code blocks e HTML.
- Corrigir numeração de página: capa não contada, centro do rodapé.
- Implementar estado vazio do preview com mensagem orientativa.
- Definir "sessão" como aba aberta; configurações resetam no reload.

## Fora do escopo

- Alterar templates.
- Alterar configurações visuais além do que já existe.
- Implementar autosave (PD-01 pendente).
- Alterar exportação PDF.

---

## Arquivos prováveis a criar/alterar

| Arquivo | Ação | Observação |
|---|---|---|
| Lógica de paginação | Alterar | `---` em code blocks |
| Componente de preview | Alterar | Numeração, estado vazio |
| Estado global/contexto | Alterar | Definição de sessão |

**Nota:** Caminhos são prováveis. Confirmar após Sprint 0.

---

## Tarefas em ordem

### Tarefa 3.1 — Corrigir `---` em code blocks

**Descrição:** Modificar a lógica de detecção de `---` para ignorar quando dentro de bloco de código (``` ``` ```) ou HTML (`<pre>`, `<code>`).

**Impacto UI/UX:** Sim — altera comportamento do preview.

**Arquivos prováveis:**
- Lógica de paginação/parser

**Critério de aceite:**
- `---` isolado na linha cria quebra de página.
- `---` dentro de ``` ``` ``` NÃO cria quebra de página.
- `---` dentro de `<pre>` ou `<code>` NÃO cria quebra de página.
- `---` com espaços antes/depois NÃO cria quebra de página.

**Validação:**
- Criar Markdown com `---` em cada cenário e verificar preview.
- Testar com documento que tem code blocks e `---` dentro deles.

**Riscos:**
- Parser pode não distinguir contexto corretamente.
- Pode quebrar quebras de página existentes.

**O que NÃO alterar:**
- Não alterar o parser Markdown (marked).
- Não alterar a lógica de captura do preview.

---

### Tarefa 3.2 — Corrigir numeração de página

**Descrição:** Garantir que a numeração "Página X de Y" começa em 1 na primeira página do corpo (capa não é contada). Posição: centro do rodapé.

**Impacto UI/UX:** Sim — altera visual do preview e PDF.

**Arquivos prováveis:**
- Componente de preview
- Lógica de numeração

**Critério de aceite:**
- Com capa habilitada: numeração começa em 1 no corpo.
- Sem capa: numeração começa em 1 na primeira página.
- Numeração mostra "Página X de Y" no centro do rodapé.
- Quebras manuais (`---`) incrementam normalmente.

**Validação:**
- Habilitar capa → verificar que numeração começa em 1 no corpo.
- Desabilitar capa → verificar que numeração começa em 1.
- Inserir `---` → verificar que número incrementa.

**Riscos:** Nenhum significativo.

**O que NÃO alterar:**
- Não alterar layout do rodapé além da numeração.

---

### Tarefa 3.3 — Implementar preview vazio

**Descrição:** Quando o editor estiver vazio, mostrar no preview uma página A4 em branco com texto centralizado e sutil: "Comece a digitar ou selecione um template".

**Impacto UI/UX:** Sim — novo estado visual.

**Arquivos prováveis:**
- Componente de preview

**Critério de aceite:**
- Editor vazio → preview mostra página A4 em branco com mensagem.
- Mensagem é centralizada e sutil (não domina a tela).
- Quando conteúdo é digitado, mensagem desaparece e preview renderiza.

**Validação:**
- Limpar editor → verificar mensagem.
- Digitar texto → verificar que mensagem desaparece.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não alterar o template padrão que carrega ao abrir.

---

### Tarefa 3.4 — Definir "sessão" explicitamente

**Descrição:** Garantir que configurações visuais são mantidas em memória enquanto a aba está aberta, e que recarregar a página restaura configurações padrão.

**Impacto UI/UX:** Sim — comportamento de reload.

**Arquivos prováveis:**
- Estado global/contexto de configurações

**Critério de aceite:**
- Alterar configuração → recarregar página → configuração volta ao padrão.
- Conteúdo do editor volta ao template padrão no reload.

**Validação:**
- Alterar preset → F5 → verificar que voltou ao padrão.
- Digitar conteúdo → F5 → verificar que voltou ao template.

**Riscos:** Nenhum.

**O que NÃO alterar:**
- Não implementar autosave (PD-01 pendente).

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

- **Testes manuais:** `---` em code blocks, numeração, preview vazio, reload.
- **Testes de regressão:** Exportação PDF continua funcionando.

---

## Fluxo manual de validação

1. Abrir app.
2. Limpar editor → verificar preview vazio com mensagem.
3. Digitar conteúdo com code block contendo `---` → verificar que NÃO cria quebra.
4. Inserir `---` isolado → verificar que cria quebra.
5. Habilitar capa → verificar numeração começa em 1 no corpo.
6. Alterar configuração → F5 → verificar que voltou ao padrão.
7. Exportar PDF → verificar que numeração está correta no PDF.

---

## Riscos da sprint

- Correção de `---` em code blocks pode ser complexa dependendo do parser.
- Numeração pode ter edge cases com capas e quebras manuais.

---

## Critérios finais de aceite da sprint

- [ ] `---` em code block não cria quebra de página.
- [ ] Numeração começa em 1 no corpo (capa não contada).
- [ ] Preview vazio mostra mensagem orientativa.
- [ ] Recarregar restaura configurações padrão.
- [ ] Build completa sem erros.

---

## O que NÃO deve ser alterado nesta sprint

- Templates.
- Exportação PDF (além da numeração).
- Configurações visuais disponíveis.
- Responsividade.
