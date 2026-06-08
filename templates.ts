import { MarkdownTemplate } from './types';

export const TEMPLATES: MarkdownTemplate[] = [
  {
    id: 'report_executivo',
    name: 'Relatório Executivo',
    icon: 'Briefcase',
    description: 'Relatório profissional corporativo com sumário executivo, tabelas e citações.',
    markdown: `# Relatório Trimestral de Performance
*Departamento de Desenvolvimento Comercial — Q2*

---

## 1. Sumário Executivo

Este documento apresenta a análise de conversão e faturamento obtidos durante o **segundo trimestre**. Observamos uma expansão substancial de canais orgânicos em detrimento de investimentos patrocinados diretos.

### Principais Indicadores (KPIs)

- **Faturamento Bruto:** R$ 1.250.000,00 *(+18.5% MoM)*
- **Custo de Aquisição (CAC):** R$ 42,50 *(-12.3% MoM)*
- **Taxa de Retenção (LTV):** 89% *(+2.1% MoM)*

> "A descentralização das campanhas de marketing gerou uma redução inédita na dependência de canais pagos, consolidando nossa liderança orgânica local."
> — *Diretoria Executiva de Growth*

---

## 2. Cronograma de Avanços Atuais

Nossos marcos operacionais foram sequenciados visando mitigar riscos no pipeline global:

- [x] Conclusão da fase ALPHA de desenvolvimento web.
- [x] Integração com sistemas de faturamento locais.
- [ ] Lançamento beta fechado em 3 capitais regionais.
- [ ] Publicação do estudo de caso nacional no portal.

---

## 3. Matriz de Investimentos Operacionais

A distribuição orçamentária seguiu estritamente as diretrizes de governança listadas abaixo:

| Área Estratégica | Q1 Realizado | Q2 Planejado | Variação (%) |
| :--- | :---: | :---: | :---: |
| Infraestrutura Cloud | R$ 12.000 | R$ 14.500 | +20.8% |
| Marketing e Atração | R$ 45.000 | R$ 38.000 | -15.5% |
| Treinamento e Pessoas | R$ 15.000 | R$ 20.000 | +33.3% |
| Segurança de Dados | R$ 8.000 | R$ 11.000 | +37.5% |

---

## 4. Recomendações e Próximos Passos

Baseando-nos nos dados empíricos compilados, recomendamos focar em:

1. **Automação de Pipelines:** Reduzir processos manuais nos relatórios de faturamento.
2. **Capacitação Interna:** Aumentar em 15 horas mensais o plano de mentoria técnica.
3. **Reestruturação Cloud:** Agrupar microserviços redundantes para economizar até 8% adicionais de orçamento.
`,
    recommendedConfig: {
      layout: {
        preset: 'executive',
        fontSize: 'md',
        lineHeight: 'relaxed',
        alignment: 'justify',
        pageSize: 'A4',
        orientation: 'portrait',
        margins: 'normal'
      },
      coverPage: {
        enabled: true,
        title: 'Relatório Trimestral Q2',
        subtitle: 'Análise Avançada de Performance Comercial e Liderança Orgânica',
        author: 'Grupo Corporativo Beta S/A',
        institution: 'Departamento de Estratégia',
        date: 'Junho de 2026',
        theme: 'bold',
        accentColor: '#1E40AF'
      }
    }
  },
  {
    id: 'curriculo_moderno',
    name: 'Currículo Profissional',
    icon: 'User',
    description: 'Layout polido com seções de perfil, histórico profissional e habilidades estruturadas.',
    markdown: `# Heitor Martins da Silva
*Engenheiro de Software Sênior — São Paulo, Brasil*  
**Email:** heitor.dev@example.com | **Telefone:** (11) 98888-7777 | **GitHub:** github.com/heitor-silva

---

## Perfil Profissional

Engenheiro de software com mais de 8 anos de experiência desenvolvendo aplicações escaláveis e focadas em alto desempenho. Especialista na criação de arquiteturas distribuídas tolerantes a falhas e interfaces que combinam simplicidade com grande eficiência de interação.

---

## Experiência Profissional

### **TechCorp Solutions** — *Arquiteto de Software Sênior (2022 - Presente)*
- Liderança técnica de um time multifuncional com 8 engenheiros.
- Projetou o novo motor de pagamentos, reduzindo o tempo médio de transação em **45%**.
- Migrou a arquitetura legada monolítica para microsserviços usando Docker e Kubernetes.

### **Z-Tech Innovations** — *Desenvolvedor Full Stack Sênior (2019 - 2022)*
- Desenvolveu e manteve APIs críticas que processam mais de 5 milhões de requisições diárias.
- Implementou testes automatizados que aumentaram a cobertura de código para **92%**.
- Coordenou a unificação de design systems internos, reduzindo o tempo de criação de features de UI em 30%.

---

## Habilidades e Competências

- **Back-End:** Node.js, Go, Python, APIs RESTful, GraphQL, gRPC
- **Front-End:** React, TypeScript, Tailwind CSS, Next.js
- **Banco de Dados:** PostgreSQL, Redis, MongoDB, Elasticsearch
- **DevOps:** AWS (EC2/S3/RDS/Lambda), Docker, CI/CD pipelines, Terraform
- **Metodologia:** Scrum, Engenharia Ágil, Clean Architecture

---

## Formação Acadêmica

### **Universidade de São Paulo (USP)**
- *Bacharelado em Ciência da Computação* — (2014 - 2018)
- Projeto de Conclusão de Curso focado em Aprendizado de Máquina e Redes Neurais Aplicadas.
`,
    recommendedConfig: {
      layout: {
        preset: 'modern',
        fontSize: 'md',
        lineHeight: 'normal',
        alignment: 'left',
        pageSize: 'A4',
        orientation: 'portrait',
        margins: 'narrow'
      },
      coverPage: {
        enabled: false,
        title: 'Currículo',
        subtitle: 'Heitor Martins da Silva',
        author: 'Heitor Martins',
        institution: 'Tecnologia da Informação',
        date: '2026',
        theme: 'minimal',
        accentColor: '#0F172A'
      }
    }
  },
  {
    id: 'artigo_academico',
    name: 'Artigo Acadêmico',
    icon: 'BookOpen',
    description: 'Estilo clássico e sóbrio com resumo, seções numeradas, citações e referências.',
    markdown: `# Modelagem Matemática de Fluxos Urbanos em Redes Complexas
*Laboratório de Cidades Inteligentes & Redes Conectadas*

---

## Resumo

Este artigo explora a otimização de fluxo veicular urbano por meio de análises grafocêntricas aplicadas ao transporte metropolitano. Desenvolvemos um algoritmo preditivo alimentado por canais históricos que reduz congestionamentos nos horários de pico em até vinte por cento.

---

## 1. Introdução

O crescimento demográfico ordenado nas metrópoles modernas impõe severos desafios às malhas logísticas estabelecidas. Modelos estáticos de tráfego mostram-se ineficazes frente à natureza caótica das demandas por mobilidade urbana imediata.

### 1.1 Objetivos de Estudo

- Mapeamento dinâmico de nós críticos da malha urbana principal.
- Implementação de redirecionamentos automatizados adaptados ao tráfego do momento.

---

## 2. Metodologia Proposta

A simulação de fluxo assenta-se na clássica teoria de grafos orientados onde cada interseção viária representa um vértice $V$ e cada via representa uma aresta orientada $E$:

1. **Coleta de Inputs:** Sensores de indução magnética instalados nas vias coletam a ocupação métrica.
2. **Cálculo de Pesos:** Atualização concorrente do custo de viagem com base no congestionamento estimado.
3. **Roteamento Dinâmico:** Aplicação iterativa das rotas nos nós selecionados.

> "A eficiência de uma rede de transporte reside inteiramente na flexibilidade de redirecionamento em tempo recorde perante anomalias súbitas."
> — *Estudos de Logística Viária, 2024*

---

## 3. Experimentos e Discussão

Utilizando dados de tráfego público consolidados da região metropolitana piloto de testes, simulamos trinta dias corridos em regimes de alta saturação. Os resultados apontam para uma economia global de energia da frota monitorada.

---

## 4. Referências Bibliográficas

1. **SILVA, J. A.** *Grafos Aplicados ao Tráfego Urbano.* Editora Acadêmica, São Paulo, 2021.
2. **RODRIGUES, L. F. & ALMEIDA, T.** *Algoritmos de Roteamento Dinâmico em Redes Viárias.* Journal of Urban Computing, vol. 18, pp. 112-124, 2023.
`,
    recommendedConfig: {
      layout: {
        preset: 'classic',
        fontSize: 'md',
        lineHeight: 'relaxed',
        alignment: 'justify',
        pageSize: 'A4',
        orientation: 'portrait',
        margins: 'wide'
      },
      coverPage: {
        enabled: true,
        title: 'Estudo de Fluxos Urbanos',
        subtitle: 'Abordagem Teórica de Redes Complexas e Otimização Dinâmica',
        author: 'Prof. Dr. Ricardo Albuquerque Ramos e Pesquisadores',
        institution: 'Instituto de Ciências Matemáticas e Tecnologia Avançada',
        date: 'Janeiro de 2026',
        theme: 'minimal',
        accentColor: '#334155'
      }
    }
  },
  {
    id: 'documentacao_tecnica',
    name: 'Manual Técnico API',
    icon: 'Cpu',
    description: 'Focado em desenvolvedores, com formatação destacada para trechos de código e tabelas de parâmetros.',
    markdown: `# Guia de Integração da API de Faturamento
*Versão 4.2.1-Beta — Documentação para Desenvolvedores*

---

## 1. Visão Geral do Sistema

Este manual documenta as rotas públicas de faturamento distribuído para canais de e-commerce e faturamento instantâneo por meio de Webhooks e chamadas HTTP REST normais.

---

## 2. Exemplo de Implementação

Utilize o trecho de código em TypeScript abaixo para inicializar a autenticação e despachar seu primeiro lote de cobrança com segurança:

\`\`\`typescript
import { BillingClient } from '@custom-api';

const client = new BillingClient({
  apiKey: process.env.BILLING_API_KEY,
  environment: 'production'
});

async function processOrder(orderId: string) {
  try {
    const response = await client.createInvoice({
      orderId,
      currency: "BRL",
      amountValue: 849.90
    });
    console.log('Fatura criada: ' + response.id);
  } catch (err) {
    console.error('Erro no processamento da fatura', err);
  }
}
\`\`\`

---

## 3. Referência de Rotas / Parâmetros

### \`POST /v2/invoices\`

Cria um registro imutável de cobrança no banco central de faturamento.

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :---: | :--- |
| \`orderId\` | \`string\` | **Sim** | Identificador UUID única do pedido externo. |
| \`currency\` | \`string\` | **Sim** | Moeda local da taxa (Ex: \`BRL\`, \`USD\`). |
| \`amountValue\` | \`number\` | **Sim** | Valor nominal exato da transação comercial. |
| \`customerId\` | \`string\` | Não | Código de referência do cliente comprador. |

---

## 4. Tratamento de Erros e Retornos

A API sinaliza anomalias por meio de grupos de status HTTP padrão:

- \`400 Bad Request:\` Parâmetros ausentes ou mal estruturados no JSON enviado.
- \`401 Unauthorized:\` Token de API ausente ou sem credencial ativa para a conta.
- \`422 Unprocessable:\` Limite diário de emissões excedido para a chave associada.
`,
    recommendedConfig: {
      layout: {
        preset: 'tech',
        fontSize: 'sm',
        lineHeight: 'snug',
        alignment: 'left',
        pageSize: 'A4',
        orientation: 'portrait',
        margins: 'narrow'
      },
      coverPage: {
        enabled: false,
        title: 'Manual de Integração',
        subtitle: 'Rotas de Software, Parâmetros e Microsserviços de Transações',
        author: 'Equipe de Core Engineering',
        institution: 'Tecnologia Alpha',
        date: '2026',
        theme: 'split',
        accentColor: '#0D9488'
      }
    }
  }
];
