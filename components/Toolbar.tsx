import React from 'react';
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Link, 
  Image, 
  Code, 
  Quote, 
  List, 
  CheckSquare, 
  Table, 
  ArrowRightLeft,
  FilePlus2,
  Undo2,
  Trash2,
  ChevronDown,
  Sparkles,
  Upload
} from 'lucide-react';

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
  onClear: () => void;
  onRestoreDefault: () => void;
  onImportFile: (content: string, fileName?: string) => void;
  charCount: number;
  wordCount: number;
  readTime: number;
  activeTheme: {
    bg: string;
    editorBg: string;
    text: string;
    border: string;
    panelBg: string;
    activeItem: string;
  };
}

export const Toolbar: React.FC<ToolbarProps> = ({ 
  onInsert, 
  onClear, 
  onRestoreDefault,
  onImportFile,
  charCount,
  wordCount,
  readTime,
  activeTheme
}) => {
  const [showRestoreConfirm, setShowRestoreConfirm] = React.useState(false);
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  React.useEffect(() => {
    let t: any;
    if (showRestoreConfirm) {
      t = setTimeout(() => setShowRestoreConfirm(false), 3000);
    }
    return () => clearTimeout(t);
  }, [showRestoreConfirm]);

  React.useEffect(() => {
    let t: any;
    if (showClearConfirm) {
      t = setTimeout(() => setShowClearConfirm(false), 3000);
    }
    return () => clearTimeout(t);
  }, [showClearConfirm]);

  const actions = [
    { label: 'Negrito', before: '**', after: '**', icon: <Bold className="w-4 h-4" /> },
    { label: 'Itálico', before: '*', after: '*', icon: <Italic className="w-4 h-4" /> },
    { label: 'Título 1', before: '# ', after: '', icon: <Heading1 className="w-4 h-4" /> },
    { label: 'Título 2', before: '## ', after: '', icon: <Heading2 className="w-4 h-4" /> },
    { label: 'Código', before: '```javascript\n', after: '\n```', icon: <Code className="w-4 h-4" /> },
    { label: 'Citação', before: '> ', after: '', icon: <Quote className="w-4 h-4" /> },
    { label: 'Lista', before: '- ', after: '', icon: <List className="w-4 h-4" /> },
    { label: 'Checklist', before: '- [ ] ', after: '', icon: <CheckSquare className="w-4 h-4" /> },
    { label: 'Link', before: '[', after: '](https://exemplo.com)', icon: <Link className="w-4 h-4" /> },
    { label: 'Imagem', before: '![Legenda](', after: ')', icon: <Image className="w-4 h-4" /> },
    { label: 'Tabela', before: '| Cabeçalho | Info |\n| :--- | :--- |\n| Item 1 | Valor |\n| Item 2 | Mais |\n', after: '', icon: <Table className="w-4 h-4" /> },
  ];

  return (
    <div className={`sticky top-0 z-20 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2 p-2 ${activeTheme.panelBg}/95 backdrop-blur-xs border-b ${activeTheme.border} rounded-t-lg select-none shadow-sm transition-colors duration-200`}>
      {/* Markdown Insert Actions */}
      <div className="flex flex-wrap gap-1 items-center">
        {actions.map((act) => (
          <button
            key={act.label}
            id={`btn-${act.label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onInsert(act.before, act.after)}
            type="button"
            className="p-1.5 opacity-85 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:opacity-100 rounded transition-all duration-150 text-inherit"
            title={act.label}
          >
            {act.icon}
          </button>
        ))}

        <div className={`h-4 w-[1px] ${activeTheme.border} mx-1 hidden sm:block`} />

        {/* Page Break Custom Button */}
        <button
          onClick={() => onInsert('\n\n---\n\n')}
          type="button"
          id="btn-pagebreak"
          className="px-2 py-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded transition-colors"
          title="Inserir Quebra de Página Física no PDF"
        >
          <FilePlus2 className="w-3.5 h-3.5" />
          <span>Fim de Página (---)</span>
        </button>
      </div>

      {/* Editor Context Options */}
      <div className="flex items-center gap-2 text-xs opacity-85 text-inherit">
        <span className="hidden xl:inline">
          {wordCount} palavras • {charCount} caract. • {readTime} min leitura
        </span>

        <div className={`h-4 w-[1px] ${activeTheme.border} mx-1 hidden xl:block`} />

        <div className="flex gap-1.5 text-inherit animate-none">
          <button
            onClick={() => {
              const input = document.getElementById('file-import-hidden-input');
              if (input) input.click();
            }}
            type="button"
            id="btn-import-file"
            className="p-1.5 px-2.5 flex items-center gap-1.5 rounded text-[11px] font-medium transition-all duration-200 opacity-80 hover:opacity-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-emerald-700 dark:text-emerald-400"
            title="Importar arquivo de texto (.md, .txt ou .markdown)"
          >
            <Upload className="w-3.5 h-3.5 animate-none" />
            <span>Importar</span>
          </button>
          <input
            id="file-import-hidden-input"
            type="file"
            accept=".md,.txt,.markdown"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 8 * 1024 * 1024) {
                  alert('Arquivo muito grande. O limite é 8MB.');
                  e.target.value = '';
                  return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                  const content = event.target?.result;
                  if (typeof content === 'string') {
                    onImportFile(content, file.name);
                  }
                };
                reader.readAsText(file);
                e.target.value = '';
              }
            }}
          />

          <button
            onClick={() => {
              if (showRestoreConfirm) {
                onRestoreDefault();
                setShowRestoreConfirm(false);
              } else {
                setShowRestoreConfirm(true);
                setShowClearConfirm(false);
              }
            }}
            type="button"
            id="btn-restore"
            className={`p-1.5 px-2.5 flex items-center gap-1.5 rounded text-[11px] font-medium transition-all duration-200 ${
              showRestoreConfirm 
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-300 dark:border-amber-800 animate-pulse' 
                : 'opacity-80 hover:opacity-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 text-inherit'
            }`}
            title="Restaurar o modelo padrão inicial (clique de novo para confirmar)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>{showRestoreConfirm ? 'Confirmar?' : 'Restaurar'}</span>
          </button>

          <button
            onClick={() => {
              if (showClearConfirm) {
                onClear();
                setShowClearConfirm(false);
              } else {
                setShowClearConfirm(true);
                setShowRestoreConfirm(false);
              }
            }}
            type="button"
            id="btn-clear"
            className={`p-1.5 px-2.5 flex items-center gap-1.5 rounded text-[11px] font-medium transition-all duration-200 ${
              showClearConfirm 
                ? 'bg-rose-600 text-white dark:bg-rose-700 animate-pulse font-bold' 
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30'
            }`}
            title="Limpar todo o texto do editor (clique de novo para confirmar)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{showClearConfirm ? 'Certeza?' : 'Limpar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
