/**
 * Heuristics-based Markdown Content Parser
 * Extracts Title, Subtitle, Author, Date, Institution, and Headers/Footers from a markdown document
 */

export interface ParsedHeuristics {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  institution: string;
  headerText: string;
  footerText: string;
}

export function extractHeuristics(markdown: string): ParsedHeuristics {
  if (!markdown) {
    return {
      title: '',
      subtitle: '',
      author: '',
      date: '',
      institution: '',
      headerText: '',
      footerText: ''
    };
  }

  const lines = markdown.split('\n').map(l => l.trim());
  
  let title = '';
  let subtitle = '';
  let author = '';
  let date = '';
  let institution = '';
  let headerText = '';
  let footerText = '';

  // Helper to remove markdown markers (such as **, *, `, # or links)
  const cleanMarkup = (str: string): string => {
    return str
      .replace(/[\*\`_~#]/g, '') // remove symbols
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // replace markdown links with plain text
      .trim();
  };

  // 1. Extract Title
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      break;
    } else if (line.startsWith('## ') && !title) {
      title = line.substring(3).trim();
    }
  }

  // 2. Extract Subtitle
  if (title) {
    const titleIndex = lines.findIndex(l => l.includes(title));
    if (titleIndex !== -1 && titleIndex + 1 < lines.length) {
      for (let i = titleIndex + 1; i < Math.min(titleIndex + 5, lines.length); i++) {
        const nextLine = lines[i];
        if (nextLine && !nextLine.startsWith('#') && !nextLine.startsWith('---') && 
            !/^(por|autor|author|data|date|instituição|institution|empresa|membro)/i.test(nextLine)) {
          subtitle = nextLine;
          break;
        } else if (nextLine.startsWith('## ')) {
          subtitle = nextLine.substring(3).trim();
          break;
        }
      }
    }
  }
  
  if (!subtitle) {
    // If not found near title, look for first H2 block anywhere in document
    const h2Match = markdown.match(/^##\s+(.+)$/m);
    if (h2Match) {
      subtitle = h2Match[1].trim();
    }
  }

  // 3. Extract Author
  for (const line of lines) {
    const authorMatch = line.match(/^(?:Autor|Autores|Por|Author|Authors|Elenco|Apresentado|Escrito\s+por):\s*(.*)$/i);
    if (authorMatch && authorMatch[1].trim()) {
      author = authorMatch[1].trim();
      break;
    }
  }
  if (!author) {
    const authorRegexComplex = /(?:Autor|Author|Por):\s*\*?\*?([^*#\n\r]+)/i;
    const complexMatch = markdown.match(authorRegexComplex);
    if (complexMatch && complexMatch[1].trim()) {
      author = complexMatch[1].trim();
    }
  }

  // 4. Extract Date
  for (const line of lines) {
    const dateMatch = line.match(/^(?:Data|Date|Época):\s*(.*)$/i);
    if (dateMatch && dateMatch[1].trim()) {
      date = dateMatch[1].trim();
      break;
    }
  }
  if (!date) {
    // Guess Portuguese months like "Maio de 2026", "Dezembro 2025" or English dates
    const dateRegex = /\b(?:Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro|January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:de\s+)?\d{4}\b/i;
    const dateFound = markdown.match(dateRegex);
    if (dateFound) {
      date = dateFound[0].trim();
    } else {
      // Guess formatted dates DD/MM/YYYY
      const dmyRegex = /\b\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{4}\b/;
      const dmyFound = markdown.match(dmyRegex);
      if (dmyFound) date = dmyFound[0].trim();
    }
  }

  // 5. Extract Institution
  for (const line of lines) {
    const instMatch = line.match(/^(?:Instituição|Institution|Organização|Empresa|Company|Organization|Universidade|Faculdade|Grupo):\s*(.*)$/i);
    if (instMatch && instMatch[1].trim()) {
      institution = instMatch[1].trim();
      break;
    }
  }

  // 6. Generate Header / Footer heuristic targets
  if (title) {
    headerText = cleanMarkup(title);
    if (institution) {
      headerText = `${cleanMarkup(institution)} • ${cleanMarkup(title)}`;
    }
  }

  const confMatch = markdown.match(/(Confidencial|Internal Use|Rascunho|Draft|Privado|Private)/i);
  if (confMatch) {
    footerText = confMatch[0].trim();
  } else {
    footerText = 'Confidencial — Apenas para Uso Interno';
  }

  return {
    title: title ? cleanMarkup(title) : '',
    subtitle: subtitle ? cleanMarkup(subtitle) : '',
    author: author ? cleanMarkup(author) : '',
    date: date ? cleanMarkup(date) : '',
    institution: institution ? cleanMarkup(institution) : '',
    headerText: headerText ? cleanMarkup(headerText) : '',
    footerText: footerText ? cleanMarkup(footerText) : ''
  };
}
