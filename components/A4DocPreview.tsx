import React, { useMemo, useState, useEffect } from 'react';
import { DocumentConfig, PresetType, MarginSize } from '../types';
import { STYLE_PRESETS, MARGINS, FONT_SIZES, LINE_HEIGHTS } from '../styles';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const getCommonStyles = (selectorPrefix: string, alignmentSetting: string, activeHeadingColor: string) => {
  const alignmentCSS = alignmentSetting === 'justify' ? 'justify' : 'left';
  return `
    ${selectorPrefix} h1 { font-family: inherit; font-size: 1.85rem; color: ${activeHeadingColor}; font-weight: 700; margin-top: 1rem; margin-bottom: 0.6rem; line-height: 1.25; }
    ${selectorPrefix} h2 { font-family: inherit; font-size: 1.4rem; color: ${activeHeadingColor}; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; line-height: 1.3; }
    ${selectorPrefix} h3 { font-family: inherit; font-size: 1.15rem; color: ${activeHeadingColor}; font-weight: 600; margin-top: 0.8rem; margin-bottom: 0.4rem; }
    ${selectorPrefix} p { margin-bottom: 0.8rem; text-align: ${alignmentCSS}; }
    ${selectorPrefix} blockquote { border-left: 3px solid ${activeHeadingColor}; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #4b5563; }
    ${selectorPrefix} a { color: ${activeHeadingColor}; text-decoration: underline; }
    ${selectorPrefix} ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.8rem; }
    ${selectorPrefix} ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.8rem; }
    ${selectorPrefix} li { margin-bottom: 0.25rem; }
    ${selectorPrefix} table { border-collapse: collapse; width: 100%; margin: 1rem 0; font-size: 0.85em; }
    ${selectorPrefix} th { background-color: #f8fafc; border-bottom: 2px solid #cbd5e1; padding: 0.4rem 0.6rem; text-align: left; font-weight: 600; }
    ${selectorPrefix} td { border-bottom: 1px solid #e2e8f0; padding: 0.4rem 0.6rem; }
    ${selectorPrefix} pre { background-color: #0f172a; color: #f8fafc; padding: 0.8rem 1rem; border-radius: 0.375rem; overflow-x: auto; margin: 1rem 0; font-family: monospace; font-size: 0.8em; }
    ${selectorPrefix} code { font-family: monospace; font-size: 0.85em; padding: 0.1rem 0.25rem; background-color: #f1f5f9; border-radius: 0.25rem; color: #e11d48; }
    ${selectorPrefix} pre code { background-color: transparent; color: inherit; padding: 0; border-radius: 0; }
    ${selectorPrefix} input[type="checkbox"] { margin-right: 0.4rem; transform: scale(1.1); pointer-events: none; }
  `;
};

interface A4DocPreviewProps {
  markdownText: string;
  config: DocumentConfig;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isGenerating?: boolean;
}

export const A4DocPreview: React.FC<A4DocPreviewProps> = ({
  markdownText,
  config,
  containerRef,
  isGenerating = false
}) => {
  const { layout, coverPage, headingColor, headerFooter } = config;

  const isPortrait = layout.orientation === 'portrait';
  const isA4 = layout.pageSize === 'A4';

  const pageMmWidth = isA4 ? (isPortrait ? 210 : 297) : (isPortrait ? 215.9 : 279.4);
  const pageMmHeight = isA4 ? (isPortrait ? 297 : 210) : (isPortrait ? 279.4 : 215.9);

  const expectedWidthPx = pageMmWidth * 3.779527559;
  const expectedHeightPx = pageMmHeight * 3.779527559;

  const [containerWidth, setContainerWidth] = useState<number>(850);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Set initial width
    setContainerWidth(element.getBoundingClientRect().width || element.clientWidth || 850);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect && entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  // Accounts for padding/border width in container: px-1 is 4px per side (8px), px-4 is 16px per side (32px).
  // Use a safe padding margin of 40px to ensure beautiful centering and no clipping.
  const paddingBuffer = 40;
  const availableWidth = containerWidth - paddingBuffer;

  const scale = (isGenerating || availableWidth >= expectedWidthPx)
    ? 1
    : Math.max(0.3, availableWidth / expectedWidthPx);

  // Split markdown by lines that contain only hyphens (page breaks)
  const sections = useMemo(() => {
    if (!markdownText) return [''];
    
    // Split by horizontal rules
    // Match line breaks with standard hyphens --- or ---- e.g., \n---\n or \n---\r\n
    const parts = markdownText.split(/(?:\r?\n)+---+(?:\r?\n)+/);
    return parts.map(part => part.trim());
  }, [markdownText]);

// Convert each markdown section into HTML
  const parsedSections = useMemo(() => {
    return sections.map((section) => {
      if (typeof marked !== 'undefined') {
        try {
          return DOMPurify.sanitize(marked.parse(section) as string, {
            ALLOWED_TAGS: ['strong', 'em', 'br', 'p', 'div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'hr'],
            ALLOWED_ATTR: ['class', 'id', 'href', 'src', 'alt', 'title', 'colspan', 'rowspan', 'align', 'type', 'checked', 'disabled'],
            ALLOW_DATA_ATTR: false,
          });
        } catch (e) {
          console.error("Erro ao processar markdown", e);
          return `<p>Erro ao formatar bloco: ${section}</p>`;
        }
      }
      return section;
    });
  }, [sections]);

  // Styling Preset selected
  const preset = STYLE_PRESETS[layout.preset];

  // Map margins to standard width/padding
  const marginPadding = MARGINS[layout.margins];

  // Helper function to paginate HTML into discrete pages based on layout settings and exact DOM heights
  const paginateHtml = (
    htmlContent: string,
    layoutSetting: typeof layout,
    headerFooterSetting: typeof headerFooter,
    presetStyle: typeof preset
  ): string[] => {
    if (typeof document === 'undefined' || typeof DOMParser === 'undefined') {
      return [htmlContent];
    }

    // Determine physical size heights in pixels at 96 DPI
    const isPortrait = layoutSetting.orientation === 'portrait';
    const isA4 = layoutSetting.pageSize === 'A4';
    
    let pageHeightMm = 297;
    if (isA4) {
      pageHeightMm = isPortrait ? 297 : 210;
    } else { // Letter
      pageHeightMm = isPortrait ? 279.4 : 215.9;
    }
    
    const totalPageHeightPx = Math.floor(pageHeightMm * 3.7795);
    
    // Header & Footer take up space
    let totalAvailableHeightPx = totalPageHeightPx;
    if (headerFooterSetting.showHeader) {
      totalAvailableHeightPx -= 48; // approx header height in px
    }
    if (headerFooterSetting.showFooter || headerFooterSetting.showPageNumbers) {
      totalAvailableHeightPx -= 48; // approx footer height in px
    }
    
    // Safety buffer to prevent snug line clipping
    const targetMaxHeight = totalAvailableHeightPx - 10;

    // Create testing scratchpad
    const scratchpad = document.createElement('div');
    scratchpad.id = 'scratchpad-measuring-container';
    scratchpad.style.position = 'absolute';
    scratchpad.style.visibility = 'hidden';
    scratchpad.style.top = '-9999px';
    scratchpad.style.left = '-9999px';
    scratchpad.style.width = isPortrait ? (isA4 ? '210mm' : '215.9mm') : (isA4 ? '297mm' : '279.4mm');
    scratchpad.style.boxSizing = 'border-box';
    
    const marginPaddingClass = MARGINS[layoutSetting.margins];
    const sizeClass = FONT_SIZES[layoutSetting.fontSize];
    const heightClass = LINE_HEIGHTS[layoutSetting.lineHeight];
    
    scratchpad.className = `prose-html-rendered ${presetStyle.fontFamily} ${marginPaddingClass} ${sizeClass} ${heightClass}`;
    document.body.appendChild(scratchpad);

    const measureHeight = (elList: Element[]) => {
      scratchpad.innerHTML = '';
      
      const styleEl = document.createElement('style');
      styleEl.innerHTML = getCommonStyles('#scratchpad-measuring-container', layoutSetting.alignment, headingColor);
      scratchpad.appendChild(styleEl);

      elList.forEach(el => scratchpad.appendChild(el.cloneNode(true)));
      return scratchpad.scrollHeight;
    };

    const pages: string[] = [];
    let currentPageElements: Element[] = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const elements = Array.from(doc.body.children);

    const isHeading = (element: Element) => {
      return ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName);
    };

    const isShortText = (element: Element) => {
      const shortTags = ['P', 'BLOCKQUOTE', 'LI', 'SPAN', 'DIV'];
      if (!shortTags.includes(element.tagName)) return false;
      const text = element.textContent || '';
      return text.trim().length > 0 && text.length < 300;
    };

    const getCarryElements = (elementsList: Element[]) => {
      const len = elementsList.length;
      if (len === 0) return { carryElements: [], remainingElements: [] };

      let idx = len - 1;
      let foundHeading = false;
      while (idx >= 0 && isHeading(elementsList[idx])) {
        foundHeading = true;
        idx--;
      }
      
      if (!foundHeading && idx >= 0 && isShortText(elementsList[idx])) {
        let checkIdx = idx - 1;
        let headingFoundBefore = false;
        while (checkIdx >= 0 && checkIdx >= idx - 2) {
          if (isHeading(elementsList[checkIdx])) {
            headingFoundBefore = true;
            break;
          }
          if (!isShortText(elementsList[checkIdx])) {
            break;
          }
          checkIdx--;
        }
        if (headingFoundBefore) {
          idx = checkIdx - 1;
          while (idx >= 0 && isHeading(elementsList[idx])) {
            idx--;
          }
        }
      }
      
      const carryCount = len - 1 - idx;
      if (carryCount > 0) {
        return {
          carryElements: elementsList.slice(len - carryCount),
          remainingElements: elementsList.slice(0, len - carryCount)
        };
      }
      
      return { carryElements: [], remainingElements: elementsList };
    };

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      
      const testList = [...currentPageElements, el];
      const height = measureHeight(testList);

      if (height <= targetMaxHeight) {
        currentPageElements.push(el);
      } else {
        // Encontra quebra de página
        const { carryElements, remainingElements } = getCarryElements(currentPageElements);
        const isSplit = ['UL', 'OL', 'TABLE', 'PRE'].includes(el.tagName);

        if (carryElements.length > 0) {
          if (remainingElements.length > 0) {
            // Existe conteúdo antes do cabeçalho que pode ser finalizado na página atual
            const testFreshList = [...carryElements, el];
            const freshHeight = measureHeight(testFreshList);

            if (freshHeight <= targetMaxHeight) {
              // Ambos cabem juntos em uma nova página
              pages.push(remainingElements.map(pEl => pEl.outerHTML).join(''));
              currentPageElements = [...carryElements, el];
              continue;
            } else {
              // Não cabem juntos na nova página inteira
              if (isSplit) {
                // Sendo quebrável (tabela/lista/pre), finaliza a página com o que havia antes do cabeçalho,
                // e começa a nova página estritamente com os cabeçalhos. O bloco quebrável continuará a ser
                // dividido a partir de agora na nova página.
                pages.push(remainingElements.map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [...carryElements];
                // Não usa 'continue' -> prossegue para a lógica de partição do elemento
              } else {
                // Não-quebrável (ex: parágrafo longo). Movemos ambos para a nova página mesmo que estoure levemente
                pages.push(remainingElements.map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [...carryElements, el];
                continue;
              }
            }
          } else {
            // Nenhum conteúdo antes do cabeçalho (já estávamos no topo da página)
            if (isSplit) {
              // Como o elemento é quebrável, prosseguimos para fatiar o elemento a partir daqui
            } else {
              // Não quebrável. Força a inserção
              currentPageElements.push(el);
              continue;
            }
          }
        } else {
          // Sem nenhum cabeçalho ou texto curto pendente para mover
          if (isSplit) {
            // Prossegue para fatiar o elemento quebrável
          } else {
            // Checa se cabe limpo em nova página
            const freshHeight = measureHeight([el]);
            if (freshHeight <= targetMaxHeight) {
              pages.push(currentPageElements.map(pEl => pEl.outerHTML).join(''));
              currentPageElements = [el];
              continue;
            } else {
              // Não cabe nem mesmo sozinho numa página nova. Força inserção.
              currentPageElements.push(el);
              continue;
            }
          }
        }

        // Now we are on a fresh page, and 'el' STILL doesn't fit. Let's split it if possible.

        // 1. Unordered and Ordered Lists (UL, OL)
        if (el.tagName === 'UL' || el.tagName === 'OL') {
          const liItems = Array.from(el.children);
          const listShell = el.cloneNode(false) as HTMLElement;
          let currentListShell = listShell.cloneNode(false) as HTMLElement;
          let startNumber = 1;
          
          for (let j = 0; j < liItems.length; j++) {
            const li = liItems[j];
            
            // Measure current list shell plus the new item
            const testShell = currentListShell.cloneNode(false) as HTMLElement;
            Array.from(currentListShell.children).forEach(child => testShell.appendChild(child.cloneNode(true)));
            testShell.appendChild(li.cloneNode(true));
            
            const testHeight = measureHeight([...currentPageElements, testShell]);
            if (testHeight > targetMaxHeight) {
              if (currentListShell.children.length > 0) {
                pages.push([...currentPageElements, currentListShell].map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [];
                currentListShell = listShell.cloneNode(false) as HTMLElement;
                if (el.tagName === 'OL') {
                  currentListShell.setAttribute('start', startNumber.toString());
                }
              } else if (currentPageElements.length > 0) {
                pages.push(currentPageElements.map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [];
              }
            }
            currentListShell.appendChild(li.cloneNode(true));
            startNumber++;
          }
          
          if (currentListShell.children.length > 0) {
            currentPageElements.push(currentListShell);
          }
          continue;
        }

        // 2. Tables (TABLE)
        if (el.tagName === 'TABLE') {
          const allRows = Array.from(el.querySelectorAll('tr'));
          const headerRow = el.querySelector('thead tr') || el.querySelector('tr:has(th)') || el.querySelector('tr');
          const hasHeader = headerRow && (headerRow.querySelector('th') || el.querySelector('thead'));
          const actualHeader = hasHeader ? headerRow : null;
          const dataRows = allRows.filter(row => row !== actualHeader);

          const tableShell = el.cloneNode(false) as HTMLElement;
          tableShell.innerHTML = '';
          
          let currentTable = tableShell.cloneNode(false) as HTMLElement;
          if (actualHeader) {
            const tHead = el.querySelector('thead') ? el.querySelector('thead')?.cloneNode(false) as HTMLElement : null;
            if (tHead) {
              tHead.appendChild(actualHeader.cloneNode(true));
              currentTable.appendChild(tHead);
            } else {
              currentTable.appendChild(actualHeader.cloneNode(true));
            }
          }

          for (let j = 0; j < dataRows.length; j++) {
            const row = dataRows[j];
            
            const testTable = currentTable.cloneNode(true) as HTMLElement;
            const testBody = testTable.querySelector('tbody') || testTable;
            testBody.appendChild(row.cloneNode(true));
            
            const testHeight = measureHeight([...currentPageElements, testTable]);
            if (testHeight > targetMaxHeight) {
              const currentTableRows = currentTable.querySelectorAll('tr');
              const hasData = actualHeader ? currentTableRows.length > 1 : currentTableRows.length > 0;
              
              if (hasData) {
                pages.push([...currentPageElements, currentTable].map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [];
                currentTable = tableShell.cloneNode(false) as HTMLElement;
                if (actualHeader) {
                  const tHead = el.querySelector('thead') ? el.querySelector('thead')?.cloneNode(false) as HTMLElement : null;
                  if (tHead) {
                    tHead.appendChild(actualHeader.cloneNode(true));
                    currentTable.appendChild(tHead);
                  } else {
                    currentTable.appendChild(actualHeader.cloneNode(true));
                  }
                }
              } else if (currentPageElements.length > 0) {
                pages.push(currentPageElements.map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [];
              }
            }
            
            const tbodyActive = currentTable.querySelector('tbody');
            if (tbodyActive) {
              tbodyActive.appendChild(row.cloneNode(true));
            } else if (el.querySelector('tbody')) {
              let newTbody = currentTable.querySelector('tbody') as HTMLElement | null;
              if (!newTbody) {
                newTbody = el.querySelector('tbody')?.cloneNode(false) as HTMLElement;
                currentTable.appendChild(newTbody);
              }
              newTbody.appendChild(row.cloneNode(true));
            } else {
              currentTable.appendChild(row.cloneNode(true));
            }
          }

          const finalRows = currentTable.querySelectorAll('tr');
          const finalHasData = actualHeader ? finalRows.length > 1 : finalRows.length > 0;
          if (finalHasData) {
            currentPageElements.push(currentTable);
          }
          continue;
        }

        // 3. Preformatted Code Blocks (PRE)
        if (el.tagName === 'PRE') {
          const codeEl = el.querySelector('code');
          const codeText = codeEl ? codeEl.textContent || '' : el.textContent || '';
          
          const lines = codeText.split('\n');
          
          const preShell = el.cloneNode(false) as HTMLElement;
          preShell.innerHTML = '';
          const codeShell = (codeEl ? codeEl.cloneNode(false) : document.createElement('code')) as HTMLElement;
          codeShell.innerHTML = '';
          preShell.appendChild(codeShell);

          let currentPre = preShell.cloneNode(true) as HTMLElement;
          let currentCode = currentPre.querySelector('code') || currentPre;
          
          for (let j = 0; j < lines.length; j++) {
            const line = lines[j];
            
            const testPre = currentPre.cloneNode(true) as HTMLElement;
            const testCode = testPre.querySelector('code') || testPre;
            testCode.textContent = (testCode.textContent ? testCode.textContent + '\n' : '') + line;
            
            const testHeight = measureHeight([...currentPageElements, testPre]);
            if (testHeight > targetMaxHeight) {
              const hasContent = currentCode.textContent && currentCode.textContent.trim().length > 0;
              if (hasContent) {
                pages.push([...currentPageElements, currentPre].map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [];
                currentPre = preShell.cloneNode(true) as HTMLElement;
                currentCode = currentPre.querySelector('code') || currentPre;
              } else if (currentPageElements.length > 0) {
                pages.push(currentPageElements.map(pEl => pEl.outerHTML).join(''));
                currentPageElements = [];
              }
            }
            
            const separator = currentCode.textContent ? '\n' : '';
            currentCode.textContent = currentCode.textContent + separator + line;
          }

          if (currentCode.textContent && currentCode.textContent.trim().length > 0) {
            currentPageElements.push(currentPre);
          }
          continue;
        }

        // Standard split fallback
        currentPageElements.push(el);
      }
    }

    if (currentPageElements.length > 0) {
      pages.push(currentPageElements.map(pEl => pEl.outerHTML).join(''));
    }

    document.body.removeChild(scratchpad);
    return pages.length > 0 ? pages : [htmlContent];
  };

  // Generate a list of discrete pages
  const allPages = useMemo(() => {
    const listPages: { sectionIndex: number; htmlContent: string; isFirstInSection: boolean }[] = [];
    
    parsedSections.forEach((sectionHtml, sectionIdx) => {
      const paginated = paginateHtml(sectionHtml, layout, headerFooter, preset);
      paginated.forEach((pageHtml, pIdx) => {
        listPages.push({
          sectionIndex: sectionIdx,
          htmlContent: pageHtml,
          isFirstInSection: pIdx === 0
        });
      });
    });
    
    return listPages;
  }, [parsedSections, layout, headerFooter, preset]);

  // Total pages including cover page
  const totalPages = allPages.length + (coverPage.enabled ? 1 : 0);

  // A4 physical dimensions (Portrait: 210mm x 297mm, Landscape: 297mm x 210mm)
  // Letter physical dimensions (Portrait: 215.9mm x 279.4mm)
  const pageStyles = useMemo<React.CSSProperties>(() => {
    const isPortrait = layout.orientation === 'portrait';
    const isA4 = layout.pageSize === 'A4';

    let width = '';
    let height = '';

    if (isA4) {
      width = isPortrait ? '210mm' : '297mm';
      height = isPortrait ? '297mm' : '210mm';
    } else { // Letter
      width = isPortrait ? '215.9mm' : '279.4mm';
      height = isPortrait ? '279.4mm' : '215.9mm';
    }

    // Determine background color of page (cream for moleskine, pure white to print for others)
    const bgColor = layout.preset === 'moleskine' ? '#FAF6EE' : '#FFFFFF';
    const textColor = layout.preset === 'moleskine' ? '#3F220F' : '#1e293b';

    return {
      width,
      height, // Keep exact physical height so that the elements are strictly paginated
      backgroundColor: bgColor,
      color: textColor,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    };
  }, [layout.orientation, layout.pageSize, layout.preset]);

  // Render Cover Page
  const renderCoverPage = (scaleValue: number) => {
    if (!coverPage.enabled) return null;

    const accent = coverPage.accentColor;
    
    // Choose cover background based on theme
    let bgClass = "bg-white text-slate-800";
    if (coverPage.theme === 'bold') {
      bgClass = "text-white";
    }

    const wrapperStyle: React.CSSProperties = {
      width: `${expectedWidthPx * scaleValue}px`,
      height: `${expectedHeightPx * scaleValue}px`,
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    };

    const isMoleskine = layout.preset === 'moleskine';
    const borderStyle = isMoleskine ? '1px solid #FAF6EE' : '1px solid #e2e8f0';

    return (
      <div style={wrapperStyle}>
        <div
          className="a4-page-node shadow-lg select-none relative overflow-hidden flex flex-col justify-between"
          style={{
            ...pageStyles,
            padding: '24mm 20mm',
            border: borderStyle,
            transform: `scale(${scaleValue})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          data-page-index="1"
        >
        {/* Scoped font-family implementation */}
        <span className={`${preset.fontFamily}`} />

        {/* Dynamic Cover Styles */}
        {coverPage.theme === 'stripe' && (
          <div 
            className="absolute top-0 left-0 right-0 h-8" 
            style={{ backgroundColor: accent }} 
          />
        )}

        {coverPage.theme === 'split' && (
          <div 
            className="absolute top-0 bottom-0 left-0 w-6" 
            style={{ backgroundColor: accent }} 
          />
        )}

        {coverPage.theme === 'bold' && (
          <div 
            className="absolute inset-0 z-0" 
            style={{ backgroundColor: accent }} 
          />
        )}

        {/* Top/Institution */}
        <div className={`z-10 ${coverPage.theme === 'bold' ? 'text-white/80' : 'text-slate-500'} uppercase font-bold tracking-widest text-xs`}>
          {coverPage.institution || 'Documento Oficial'}
        </div>

        {/* Center / Titles */}
        <div className="my-auto z-10 space-y-4">
          {coverPage.theme === 'bold' ? (
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight underline-offset-8">
                {coverPage.title || 'Título da Capa'}
              </h1>
              {coverPage.subtitle && (
                <p className="text-xl text-white/90 font-light leading-relaxed max-w-xl">
                  {coverPage.subtitle}
                </p>
              )}
            </div>
          ) : (
            <div className={`space-y-4 ${coverPage.theme === 'split' ? 'pl-4' : ''}`}>
              <h1 
                className={`text-4xl md:text-5xl font-extrabold tracking-tight`}
                style={{ color: coverPage.theme === 'minimal' ? '#0f172a' : accent }}
              >
                {coverPage.title || 'Título da Capa'}
              </h1>
              
              <div className="h-[2px] w-20" style={{ backgroundColor: accent }} />
              
              {coverPage.subtitle && (
                <p className="text-lg text-slate-600 font-light leading-relaxed max-w-xl">
                  {coverPage.subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom / Author, Date */}
        <div className="z-10 flex items-end justify-between border-t border-slate-200/30 pt-6">
          <div>
            <div className={`font-bold ${coverPage.theme === 'bold' ? 'text-white' : 'text-slate-800'} text-sm`}>
              {coverPage.author || 'Nome do Autor'}
            </div>
            <div className={`text-xs ${coverPage.theme === 'bold' ? 'text-white/75' : 'text-slate-500'} mt-0.5`}>
              Autor Cooperado
            </div>
          </div>
          <div className={`text-right text-xs ${coverPage.theme === 'bold' ? 'text-white/75' : 'text-slate-500'}`}>
            {coverPage.date || 'Fevereiro 2026'}
          </div>
        </div>
      </div>
    </div>
    );
  };

  // Compile scoped CSS styling for rendering standard tagged markdown elements
  const createScopedStyles = (pageId: string) => {
    return getCommonStyles(`#${pageId}`, layout.alignment, headingColor);
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center gap-6 py-6 px-1 md:px-4 bg-slate-200 dark:bg-slate-950 flex-grow overflow-y-auto max-h-[80vh] md:max-h-none shadow-inner border border-slate-300 dark:border-slate-800 rounded-lg custom-print-pages w-full"
    >
      {/* Cover Page */}
      {renderCoverPage(scale)}

      {/* Structured Content Pages */}
      {allPages.map(({ sectionIndex, htmlContent, isFirstInSection }, index) => {
        const pageIdx = index + (coverPage.enabled ? 2 : 1);
        const pageId = `render-page-${pageIdx}`;

        const wrapperStyle: React.CSSProperties = {
          width: `${expectedWidthPx * scale}px`,
          height: `${expectedHeightPx * scale}px`,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        };

        return (
          <div key={pageId} style={wrapperStyle}>
            <div
              id={pageId}
              className="a4-page-node shadow-lg select-text relative flex flex-col justify-between border border-slate-200 dark:border-slate-850 overflow-hidden"
              style={{
                ...pageStyles,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              data-page-index={pageIdx}
            >
              {/* Embed dynamic styles for Markdown elements specific to this preset */}
              <style dangerouslySetInnerHTML={{ __html: createScopedStyles(pageId) }} />

              {/* Header banner */}
              {headerFooter.showHeader && (
                <div 
                  className="w-full text-[10px] text-slate-400 dark:text-slate-500 uppercase flex items-center justify-between border-b border-slate-100 pb-1.5 z-10"
                  style={{ padding: '8mm 12mm 0mm 12mm' }}
                >
                  <span>{headerFooter.headerText || 'Documento Oficial'}</span>
                  <span>Seção {sectionIndex + 1}{isFirstInSection ? '' : ' (cont.)'}</span>
                </div>
              )}

              {/* Page Body Core Area */}
              <div 
                className={`flex-grow overflow-hidden ${preset.fontFamily} ${marginPadding} ${FONT_SIZES[layout.fontSize]} ${LINE_HEIGHTS[layout.lineHeight]}`}
                style={{
                  textAlign: layout.alignment === 'justify' ? 'justify' : 'left',
                }}
              >
                <div 
                  className="prose-html-rendered"
                  dangerouslySetInnerHTML={{ __html: htmlContent }} 
                />
              </div>

              {/* Footer banner */}
              {(headerFooter.showFooter || headerFooter.showPageNumbers) && (
                <div 
                  className="w-full text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between border-t border-slate-100 pt-1.5 z-10 bg-transparent"
                  style={{ padding: '0mm 12mm 8mm 12mm' }}
                >
                  <span>
                    {headerFooter.showFooter ? (headerFooter.footerText || 'Criado no Elegant Markdown') : ''}
                  </span>
                  <span>
                    {headerFooter.showPageNumbers ? `Página ${pageIdx} de ${totalPages}` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="text-center text-xs text-slate-400 dark:text-slate-600 mt-2 select-none py-1 border-t border-slate-300 dark:border-slate-800 w-full max-w-sm">
        Fim de Visualização • {totalPages} {totalPages === 1 ? 'página simulada' : 'páginas simuladas'}
      </div>
    </div>
  );
};
