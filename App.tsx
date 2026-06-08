import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  Settings, 
  Download, 
  Sparkles, 
  Info, 
  BookOpen, 
  Eye, 
  Menu, 
  X,
  Plus,
  HelpCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileCode,
  FilePlus2,
  ListRestart,
  Upload
} from 'lucide-react';
import { DocumentConfig, MarkdownTemplate } from './types';
import { TEMPLATES } from './templates';
import { STYLE_PRESETS, EDITOR_THEME_CLASSES } from './styles';
import { Toolbar } from './components/Toolbar';
import { SettingsPanel } from './components/SettingsPanel';
import { A4DocPreview } from './components/A4DocPreview';
import { extractHeuristics } from './utils/heuristics';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// PRD seção 7.10: sequência de sanitização do nome do PDF
const sanitizePdfName = (rawName: string): string => {
  let name = rawName
    .normalize('NFD')                    // 1. NFD decomposition
    .replace(/[\u0300-\u036f]/g, '')     // 2. Remove diacritics
    .toLowerCase()                       // 3. Lowercase
    .replace(/[\s_]+/g, '-')             // 4. Spaces/underscores → hyphens
    .replace(/[^a-z0-9-]/g, '')          // 5. Remove non-alphanumeric (keep hyphens)
    .replace(/-{2,}/g, '-')              // 6. Collapse multiple hyphens
    .replace(/^-|-$/g, '')               // 7. Remove leading/trailing hyphens
    .slice(0, 80);                       // 8. Limit to 80 chars

  return name || 'documento';            // 9. Fallback
};

// PRD seção 7.10: prioridade de escolha do nome
const getPdfFileName = (config: DocumentConfig, markdownText: string, importedFileName?: string): string => {
  let rawName = '';

  // Priority 1: cover page title (if cover enabled and title filled)
  if (config.coverPage.enabled && config.coverPage.title?.trim()) {
    rawName = config.coverPage.title.trim();
  }

  // Priority 2: first heading # in markdown
  if (!rawName) {
    const headingMatch = markdownText.match(/^#\s+(.+)$/m);
    if (headingMatch) {
      rawName = headingMatch[1].trim();
    }
  }

  // Priority 3: imported file name
  if (!rawName && importedFileName) {
    rawName = importedFileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  }

  // Priority 4: first 50 chars of content
  if (!rawName) {
    rawName = markdownText.trim().slice(0, 50);
  }

  return sanitizePdfName(rawName) + '.pdf';
};

const DEFAULT_CONFIG: DocumentConfig = {
  coverPage: {
    enabled: true,
    title: 'Relatório Trimestral Q2',
    subtitle: 'Análise Avançada de Performance Comercial e Liderança Orgânica',
    author: 'Grupo Corporativo Beta S/A',
    institution: 'Departamento de Estratégia',
    date: 'Junho de 2026',
    theme: 'bold',
    accentColor: '#1E40AF'
  },
  layout: {
    preset: 'executive',
    fontSize: 'md',
    lineHeight: 'relaxed',
    alignment: 'justify',
    pageSize: 'A4',
    orientation: 'portrait',
    margins: 'normal'
  },
  headingColor: '#1E40AF',
  headerFooter: {
    showHeader: true,
    showFooter: true,
    headerText: 'Grupo Beta S/A • Relatório Estratégico',
    footerText: 'Confidencial — Apenas para Uso Interno',
    showPageNumbers: true
  },
  editorTheme: 'dark'
};

const INITIAL_MARKDOWN = TEMPLATES[0].markdown; // Preload Executive Report as default

const App: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>(INITIAL_MARKDOWN);
  const [config, setConfig] = useState<DocumentConfig>(DEFAULT_CONFIG);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(TEMPLATES[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [importNotification, setImportNotification] = useState<string | null>(null);
  const [overriddenFields, setOverriddenFields] = useState<Record<string, boolean>>({});
  const [importedFileName, setImportedFileName] = useState<string | undefined>(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const handleToggleOverride = (field: string) => {
    setOverriddenFields(prev => {
      const nextVal = !prev[field];
      
      // If we are restoring to auto (nextVal is false), let's trigger single-turn re-parse in sync effect
      return {
        ...prev,
        [field]: nextVal
      };
    });
  };

  const handleSetOverride = (field: string, val: boolean) => {
    setOverriddenFields(prev => {
      if (prev[field] === val) return prev;
      return {
        ...prev,
        [field]: val
      };
    });
  };

  const handleImportFile = (content: string, fileName?: string) => {
    const doImport = () => {
      setMarkdownText(content);
      setSelectedTemplateId('');
      setOverriddenFields({});
      setImportedFileName(fileName);
      
      if (fileName) {
        const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        if (cleanName) {
          setConfig(prev => ({
            ...prev,
            coverPage: {
              ...prev.coverPage,
              title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
            }
          }));
          handleSetOverride('title', true);
        }
      }

      setImportNotification("Arquivo carregado com sucesso!");
      setTimeout(() => {
        setImportNotification(null);
      }, 4000);
    };

    if (markdownText.trim().length > 0) {
      setPendingAction(() => doImport);
      setShowConfirmModal(true);
    } else {
      doImport();
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setImportNotification('Arquivo muito grande. O limite é 8MB.');
        setTimeout(() => setImportNotification(null), 5000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        let content = event.target?.result;
        if (typeof content === 'string') {
          // Remove UTF-8 BOM if present
          if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
          }
          // Check for replacement character (U+FFFD) — encoding issue
          if (content.includes('\uFFFD')) {
            // Retry with Latin-1
            const retryReader = new FileReader();
            retryReader.onload = (retryEvent) => {
              const retryContent = retryEvent.target?.result;
              if (typeof retryContent === 'string') {
                handleImportFile(retryContent, file.name);
              }
            };
            retryReader.onerror = () => {
              setImportNotification('Não foi possível ler o arquivo. Verifique o formato e tente novamente.');
              setTimeout(() => setImportNotification(null), 5000);
            };
            retryReader.readAsText(file, 'ISO-8859-1');
            return;
          }
          handleImportFile(content, file.name);
        }
      };
      reader.onerror = () => {
        setImportNotification('Não foi possível ler o arquivo. Verifique o formato e tente novamente.');
        setTimeout(() => setImportNotification(null), 5000);
      };
      reader.readAsText(file, 'UTF-8');
    }
  };

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Statistics calculation
  const stats = useMemo(() => {
    const chars = markdownText.length;
    const words = markdownText.trim() === '' ? 0 : markdownText.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    return { chars, words, readTime };
  }, [markdownText]);

  // Insert markdown tag at cursor
  const handleInsertMarkdown = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = before + (selected || '') + after;
    const newMarkdown = text.substring(0, start) + replacement + text.substring(end);
    
    setMarkdownText(newMarkdown);
    
    // Refocus and place cursor elegantly
    setTimeout(() => {
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(
        start + before.length, 
        start + before.length + (selected ? selected.length : 0)
      );
    }, 10);
  };

  // Change of templates
  const handleSelectTemplate = (templateId: string) => {
    const found = TEMPLATES.find(t => t.id === templateId);
    if (!found) return;

    const doSwitch = () => {
      setMarkdownText(found.markdown);
      setSelectedTemplateId(templateId);
      setOverriddenFields({});
      setImportedFileName(undefined);
      if (found.recommendedConfig) {
        setConfig(prev => ({
          ...prev,
          ...found.recommendedConfig,
          editorTheme: prev.editorTheme
        }));
      }
    };

    if (markdownText.trim().length > 0) {
      setPendingAction(() => doSwitch);
      setShowConfirmModal(true);
    } else {
      doSwitch();
    }
  };

  const handleClear = () => {
    setMarkdownText("");
    // Keep overrides as is, or reset. Keeping as is is more expectable when just clearing.
  };

  const handleRestoreDefault = () => {
    setMarkdownText(INITIAL_MARKDOWN);
    setOverriddenFields({}); // Reset manual overrides
    setConfig(DEFAULT_CONFIG);
    setSelectedTemplateId(TEMPLATES[0].id);
  };

  // PDF Generation Sequence! Pre-paginated content elements are exported directly
  const handleGeneratePdf = async () => {
    if (!previewContainerRef.current || isGenerating) return;

    setIsGenerating(true);
    setIsSuccess(false);

    try {
      // Find all computed pages inside the A4DocPreview canvas container
      const pageElements = previewContainerRef.current.querySelectorAll('.a4-page-node');
      
      if (pageElements.length === 0) {
        throw new Error("Nenhuma página encontrada para exportar.");
      }

      const isPortrait = config.layout.orientation === 'portrait';
      const isA4 = config.layout.pageSize === 'A4';

      const pdf = new jsPDF({
        orientation: isPortrait ? 'p' : 'l',
        unit: 'mm',
        format: isA4 ? 'a4' : 'letter',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const isMoleskine = config.layout.preset === 'moleskine';
      const bgColorHex = isMoleskine ? '#FAF6EE' : '#FFFFFF';

      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i] as HTMLElement;

        const canvas = await html2canvas(pageEl, {
          scale: 2.0, // Clean, crisp vector detail output
          useCORS: true,
          backgroundColor: bgColorHex,
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.85);

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      const fileName = getPdfFileName(config, markdownText, importedFileName);
      pdf.save(fileName);

      // Successfully finish down flow
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      console.error("Erro na geração do PDF:", error);
      setPdfError("Ocorreu um erro ao converter o PDF. Remova ou reduza imagens excessivas se necessário.");
      setTimeout(() => setPdfError(null), 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  // Heuristic sync effect for automatic non-AI metadata parsing
  useEffect(() => {
    const parsed = extractHeuristics(markdownText);
    
    setConfig(prev => {
      const nextCover = { ...prev.coverPage };
      const nextHeaderFooter = { ...prev.headerFooter };
      let changed = false;

      if (!overriddenFields.title && parsed.title && prev.coverPage.title !== parsed.title) {
        nextCover.title = parsed.title;
        changed = true;
      }
      if (!overriddenFields.subtitle && parsed.subtitle && prev.coverPage.subtitle !== parsed.subtitle) {
        nextCover.subtitle = parsed.subtitle;
        changed = true;
      }
      if (!overriddenFields.author && parsed.author && prev.coverPage.author !== parsed.author) {
        nextCover.author = parsed.author;
        changed = true;
      }
      if (!overriddenFields.institution && parsed.institution && prev.coverPage.institution !== parsed.institution) {
        nextCover.institution = parsed.institution;
        changed = true;
      }
      if (!overriddenFields.date && parsed.date && prev.coverPage.date !== parsed.date) {
        nextCover.date = parsed.date;
        changed = true;
      }
      if (!overriddenFields.headerText && parsed.headerText && prev.headerFooter.headerText !== parsed.headerText) {
        nextHeaderFooter.headerText = parsed.headerText;
        changed = true;
      }
      if (!overriddenFields.footerText && parsed.footerText && prev.headerFooter.footerText !== parsed.footerText) {
        nextHeaderFooter.footerText = parsed.footerText;
        changed = true;
      }

      if (changed) {
        return {
          ...prev,
          coverPage: nextCover,
          headerFooter: nextHeaderFooter
        };
      }
      return prev;
    });
  }, [markdownText, overriddenFields]);

  // Sync editorTheme changes to html document root if needed
  useEffect(() => {
    if (config.editorTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config.editorTheme]);

  const activeTheme = EDITOR_THEME_CLASSES[config.editorTheme];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${activeTheme.bg} ${activeTheme.text}`}>
      
      {/* Upper Navigation Header */}
      <header className={`px-4 py-3 md:px-6 border-b flex items-center justify-between ${activeTheme.panelBg} ${activeTheme.border} transition-all shadow-sm z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md">
            <FileText className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-md sm:text-lg font-bold flex items-center gap-1.5 leading-none">
              <span>PDF Forge</span>
              <span className="text-[10px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider">PRO</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Escritura Markdown com Estilização Editorial Sutil
            </p>
          </div>
        </div>

        {/* Compile / Download Controls */}
        <div className="flex items-center gap-2">
          {/* Tips Button */}
          <button
            onClick={() => setShowTips(!showTips)}
            className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-blue-500"
            title="Dicas de paginação"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Settings mobile toggle */}
          <button
            onClick={() => setIsMobileSettingsOpen(!isMobileSettingsOpen)}
            className="p-2 lg:hidden hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
            title="Abrir Configurações"
          >
            {isMobileSettingsOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
          </button>

          {/* Core Master Print CTA */}
          <button
            id="main-pdf-generate-btn"
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            style={{ backgroundColor: config.coverPage.accentColor }}
            className="px-4 py-2 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md hover:brightness-110 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Forjando PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Baixar PDF Elegante</span>
                <span className="sm:hidden">Baixar PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Double Column workspace layout */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        
        {/* Mobile Settings Sidebar Overlay */}
        {isMobileSettingsOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 lg:hidden flex justify-end">
            <div className="w-[85vw] max-w-sm bg-white dark:bg-slate-900 h-[100dvh] flex flex-col shadow-2xl">
              <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-4">
                  <span className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <Settings className="w-4 h-4 text-blue-500" />
                    Visual & Capa
                  </span>
                  <button 
                    onClick={() => setIsMobileSettingsOpen(false)}
                    className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  <SettingsPanel
                    config={config}
                    onChangeConfig={setConfig}
                    onSelectTemplate={handleSelectTemplate}
                    selectedTemplateId={selectedTemplateId}
                    overriddenFields={overriddenFields}
                    onToggleOverride={handleToggleOverride}
                    onSetOverride={handleSetOverride}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Left Column: Markdown Input editor */}
        <div 
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`col-span-1 lg:col-span-4 xl:col-span-5 flex flex-col h-[45vh] lg:h-auto border-b lg:border-b-0 lg:border-r ${activeTheme.border} relative`}
        >
          <Toolbar 
            onInsert={handleInsertMarkdown}
            onClear={handleClear}
            onRestoreDefault={handleRestoreDefault}
            onImportFile={handleImportFile}
            charCount={stats.chars}
            wordCount={stats.words}
            readTime={stats.readTime}
            activeTheme={activeTheme}
          />
          <div className="flex-grow relative h-full">
            <textarea
              ref={textareaRef}
              id="markdown-editor"
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
              className={`w-full h-full p-4 focus:ring-0 focus:outline-none border-none font-mono text-xs sm:text-sm resize-none absolute inset-0 ${activeTheme.editorBg} ${activeTheme.text} transition-colors duration-200 leading-relaxed`}
              placeholder="Digite seu Markdown aqui. Use '---' em uma linha vazia para quebrar páginas fisicamente se desejar."
              spellCheck="false"
            />

            {/* Drag & drop visual feedback */}
            {isDragging && (
              <div className="absolute inset-0 bg-emerald-600/10 backdrop-blur-xs border-2 border-dashed border-emerald-500 z-30 flex flex-col items-center justify-center p-4 rounded-b-lg">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl flex flex-col items-center gap-3 border border-slate-200 dark:border-slate-800 transition-all">
                  <Upload className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 text-center">Solte seu arquivo .md, .markdown ou .txt aqui para carregar!</span>
                </div>
              </div>
            )}

            {/* Subtle Import success overlay message */}
            {importNotification && (
              <div className="absolute bottom-4 right-4 bg-emerald-500 dark:bg-emerald-600 text-white font-semibold text-xs py-2 px-3.5 rounded-lg shadow-lg flex items-center gap-2 z-25 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>{importNotification}</span>
              </div>
            )}
          </div>
        </div>

        {/* Center/Right Column: Live Physical stacked pages preview */}
        <div className="col-span-1 lg:col-span-4 flex flex-col h-[55vh] lg:h-auto overflow-hidden bg-slate-100 dark:bg-slate-950">
          <div className="p-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              Simulador Editorial de Impressão (Papel)
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">Tempo Real</span>
            </div>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto flex justify-center">
            <A4DocPreview 
              markdownText={markdownText}
              config={config}
              containerRef={previewContainerRef}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        {/* Rightmost Panel (Desktop Only): Config elements panel */}
        <div className={`hidden lg:block lg:col-span-4 xl:col-span-3 h-full border-l ${activeTheme.border} ${activeTheme.bg} overflow-y-auto`}>
          <div className={`p-3 border-b ${activeTheme.border} ${activeTheme.panelBg} sticky top-0 z-10 flex items-center justify-between shadow-xs`}>
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-blue-500" />
              Visual e Atributos de Capa
            </span>
          </div>
          <div className="p-3">
            <SettingsPanel
              config={config}
              onChangeConfig={setConfig}
              onSelectTemplate={handleSelectTemplate}
              selectedTemplateId={selectedTemplateId}
              overriddenFields={overriddenFields}
              onToggleOverride={handleToggleOverride}
              onSetOverride={handleSetOverride}
            />
          </div>
        </div>
      </main>

      {/* Success Download Dialog Alert Box overlay */}
      {isSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
          <div className="text-xs">
            <strong className="block text-sm font-bold">PDF Forjado!</strong>
            PDF compilado e descarregado com sucesso.
          </div>
        </div>
      )}

      {/* Error Dialog Alert Box overlay */}
      {pdfError && (
        <div className="fixed bottom-6 right-6 z-50 bg-rose-600 text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-sm animate-pulse border border-rose-500">
          <div className="p-1 rounded-full bg-white/20 text-white">
            <X className="w-4 h-4 shrink-0" />
          </div>
          <div className="text-xs">
            <strong className="block text-sm font-bold">Erro ao Forjar!</strong>
            {pdfError}
          </div>
        </div>
      )}

      {/* Pagination Tips modal board */}
      {showTips && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-150 dark:border-slate-800">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Segredos do PDF Perfeito</span>
              </div>
              <button 
                onClick={() => setShowTips(false)}
                className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-300">
              <p>
                Este gerador utiliza renderização física de folhas no navegador. Para conseguir PDFs impecáveis que parecem criados por designers profissionais, siga estas regras simples:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs">A</div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Quebra de Páginas Inteligente</strong>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Insira três traços <code className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded font-mono text-rose-500">---</code> em uma linha vazia para ditar onde a folha acaba. Isso inicia uma folha limpa imediatamente para o conteúdo seguinte!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 font-bold text-xs">B</div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Capas Sob Medida</strong>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ative a Capa do Documento na aba <strong>Capa / Capa</strong> para gerar uma belíssima folha de rosto. O corpo principal do documento começará na página 2!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-bold text-xs">C</div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Visualização "O que você vê é o que você tem"</strong>
                    <p className="text-xs text-slate-500 mt-0.5">
                      As páginas no simulador têm altura fixa correspondente aos padrões A4 ou Ofício baseados nas proporções reais. Se o seu conteúdo transbordar uma página, ordene o conteúdo inserindo quebras no editor.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowTips(false)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs rounded-lg hover:brightness-110 shadow"
              >
                Entendi! Começar a Forjar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Substituir conteúdo?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                O conteúdo atual será perdido. Deseja continuar?
              </p>
            </div>
            <div className="flex gap-2 p-4 pt-0">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingAction(null);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  if (pendingAction) {
                    pendingAction();
                    setPendingAction(null);
                  }
                }}
                className="flex-1 px-4 py-2 text-sm font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
              >
                Substituir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
