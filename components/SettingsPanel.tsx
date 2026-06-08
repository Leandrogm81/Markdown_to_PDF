import React from 'react';
import { 
  BookOpen, 
  Palette, 
  FileText, 
  SlidersHorizontal,
  Layers,
  ChevronRight,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { DocumentConfig, CoverPageConfig, LayoutConfig, HeaderFooterConfig, EditorTheme, PresetType, FontSize, LineHeight, Alignment, PageSize, Orientation, MarginSize } from '../types';
import { TEMPLATES } from '../templates';
import { STYLE_PRESETS, ACCENT_COLORS } from '../styles';

interface SettingsPanelProps {
  config: DocumentConfig;
  onChangeConfig: (newConfig: DocumentConfig) => void;
  onSelectTemplate: (templateId: string) => void;
  selectedTemplateId: string;
  overriddenFields: Record<string, boolean>;
  onToggleOverride: (field: string) => void;
  onSetOverride: (field: string, val: boolean) => void;
}

export const SyncLabel: React.FC<{
  htmlFor: string;
  label: string;
  field: string;
  isOverridden: boolean;
  onToggle: (field: string) => void;
}> = ({ htmlFor, label, field, isOverridden, onToggle }) => {
  return (
    <div className="flex items-center justify-between mb-1 select-none">
      <label className="font-semibold block text-slate-700 dark:text-slate-350" htmlFor={htmlFor}>
        {label}
      </label>
      <button
        type="button"
        onClick={() => onToggle(field)}
        className={`text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1 transition-all focus:outline-none cursor-pointer ${
          isOverridden
            ? 'bg-amber-50 text-amber-700 hover:bg-emerald-50 hover:text-emerald-700 border border-amber-200/55 dark:bg-amber-950/25 dark:text-amber-400 dark:border-amber-900/40 dark:hover:bg-emerald-950/25 dark:hover:text-emerald-300'
            : 'bg-emerald-55 dark:bg-emerald-950/35 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200/50'
        }`}
        title={
          isOverridden 
            ? "Este campo possui valor customizado. Clique para re-sincronizar automaticamente com o texto!" 
            : "Preenchido de forma inteligente a partir do texto do rascunho de Markdown."
        }
      >
        <Sparkles className="w-2.5 h-2.5 shrink-0" />
        <span>{isOverridden ? "Manual (clique p/ Auto)" : "Automático"}</span>
      </button>
    </div>
  );
};

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  config,
  onChangeConfig,
  onSelectTemplate,
  selectedTemplateId,
  overriddenFields,
  onToggleOverride,
  onSetOverride
}) => {
  const [activeTab, setActiveTab] = React.useState<'templates' | 'style' | 'cover' | 'page'>('style');

  const updateCover = (key: keyof CoverPageConfig, value: any) => {
    onChangeConfig({
      ...config,
      coverPage: {
        ...config.coverPage,
        [key]: value
      }
    });
  };

  const updateLayout = (key: keyof LayoutConfig, value: any) => {
    onChangeConfig({
      ...config,
      layout: {
        ...config.layout,
        [key]: value
      }
    });
  };

  const updateHeaderFooter = (key: keyof HeaderFooterConfig, value: any) => {
    onChangeConfig({
      ...config,
      headerFooter: {
        ...config.headerFooter,
        [key]: value
      }
    });
  };

  const updateConfig = (key: keyof DocumentConfig, value: any) => {
    onChangeConfig({
      ...config,
      [key]: value
    });
  };

  const tabs = [
    { id: 'templates', label: 'Modelos', icon: <BookOpen className="w-4 h-4" />, tooltip: 'Modelos Iniciais' },
    { id: 'style', label: 'Estética', icon: <Palette className="w-4 h-4" />, tooltip: 'Tipografia e Temas' },
    { id: 'cover', label: 'Capa', icon: <FileText className="w-4 h-4" />, tooltip: 'Capa de Documento' },
    { id: 'page', label: 'Estrutura', icon: <SlidersHorizontal className="w-4 h-4" />, tooltip: 'Páginas e Cabeçalho' },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden text-slate-800 dark:text-slate-100">
      
      {/* Tab Navigation header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[75px] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold rounded-md transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            <span className="text-center leading-tight whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Accordion panel/content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5">
        
        {/* TEMPLATES TAB */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Modelos Pré-desenhados</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecione um rascunho. Isso preencherá o editor de markdown e aplicará a formatação ideal recomendada automaticamente.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  id={`tmpl-btn-${tmpl.id}`}
                  onClick={() => onSelectTemplate(tmpl.id)}
                  className={`group p-3.5 text-left border rounded-lg transition-all flex items-start gap-3.5 cursor-pointer ${
                    selectedTemplateId === tmpl.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-955/20 ring-1 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-450 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850/50'
                  }`}
                >
                  <div className={`p-2 rounded-md ${
                    selectedTemplateId === tmpl.id ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{tmpl.name}</span>
                      {selectedTemplateId === tmpl.id && (
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          Ativo
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 md:line-clamp-none">
                      {tmpl.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STYLE/ESTETICA TAB */}
        {activeTab === 'style' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Estilo de Formatação</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecione um estilo estrutural para as fontes, cabeçalhos, citações e tabelas do seu PDF.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-505 dark:text-slate-300">Escolha de Estilo Gótico ou Editorial</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                {(Object.keys(STYLE_PRESETS) as PresetType[]).map((presetKey) => {
                  const prest = STYLE_PRESETS[presetKey];
                  const fontPreview = presetKey === 'classic' || presetKey === 'moleskine' ? 'Georgia / Serif' : presetKey === 'tech' ? 'Monospace' : 'Inter / Sans';
                  return (
                    <button
                      key={presetKey}
                      id={`preset-btn-${presetKey}`}
                      onClick={() => updateLayout('preset', presetKey)}
                      className={`p-3 text-left border rounded-lg transition-all ${
                        config.layout.preset === presetKey
                          ? 'border-blue-550 bg-blue-50/20 dark:bg-blue-950/20 ring-1 ring-blue-500'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">{prest.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{fontPreview}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Custom Typography properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="font-size-select">
                  Tamanho da Letra
                </label>
                <select
                  id="font-size-select"
                  value={config.layout.fontSize}
                  onChange={(e) => updateLayout('fontSize', e.target.value as FontSize)}
                  className="w-full text-xs p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-205 dark:border-slate-700 rounded-lg cursor-pointer"
                >
                  <option value="sm">Pequeno (sm)</option>
                  <option value="md">Médio (md)</option>
                  <option value="lg">Grande (lg)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="align-select">
                  Alinhamento do Texto
                </label>
                <select
                  id="align-select"
                  value={config.layout.alignment}
                  onChange={(e) => updateLayout('alignment', e.target.value as Alignment)}
                  className="w-full text-xs p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-205 dark:border-slate-700 rounded-lg cursor-pointer"
                >
                  <option value="left">Alinhado à Esquerda</option>
                  <option value="justify">Justificado</option>
                </select>
              </div>
            </div>

            <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Editor Theme */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="editor-theme-select">
                Vibe / Paleta do Editor de Texto
              </label>
              <select
                id="editor-theme-select"
                value={config.editorTheme}
                onChange={(e) => updateConfig('editorTheme', e.target.value as EditorTheme)}
                className="w-full text-xs p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-205 dark:border-slate-700 rounded-lg cursor-pointer"
              >
                <option value="light">Claro Limpo</option>
                <option value="dark">Escuro Cósmico</option>
                <option value="sand">Areia / Sepia Escrita</option>
                <option value="forest">Cerrado / Floresta Verde</option>
                <option value="ocean">Neblina de Verão</option>
              </select>
            </div>
          </div>
        )}

        {/* COVER PAGE TAB */}
        {activeTab === 'cover' && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Capa de Documento</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Se ativado, adicionará automaticamente uma linda primeira página formal ao seu arquivo final.
              </p>
            </div>

            {/* Toggle Cover */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Adicionar Capa do Documento</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Gera uma folha de rosto decorada e formal</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="checkbox-cover-enabled"
                  checked={config.coverPage.enabled}
                  onChange={(e) => updateCover('enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {config.coverPage.enabled && (
              <div className="space-y-3.5 pt-2">
                <div>
                  <SyncLabel
                    htmlFor="cover-title"
                    label="Título Principal"
                    field="title"
                    isOverridden={!!overriddenFields.title}
                    onToggle={onToggleOverride}
                  />
                  <input
                    type="text"
                    id="cover-title"
                    value={config.coverPage.title}
                    onChange={(e) => {
                      updateCover('title', e.target.value);
                      onSetOverride('title', true);
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-750 rounded-lg text-xs"
                    placeholder="Digite o título principal..."
                  />
                </div>

                <div>
                  <SyncLabel
                    htmlFor="cover-subtitle"
                    label="Subtítulo"
                    field="subtitle"
                    isOverridden={!!overriddenFields.subtitle}
                    onToggle={onToggleOverride}
                  />
                  <input
                    type="text"
                    id="cover-subtitle"
                    value={config.coverPage.subtitle}
                    onChange={(e) => {
                      updateCover('subtitle', e.target.value);
                      onSetOverride('subtitle', true);
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-750 rounded-lg text-xs"
                    placeholder="Subtítulo ou contexto adicional..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3.5 xl:gap-2">
                  <div>
                    <SyncLabel
                      htmlFor="cover-author"
                      label="Autor / Elenco"
                      field="author"
                      isOverridden={!!overriddenFields.author}
                      onToggle={onToggleOverride}
                    />
                    <input
                      type="text"
                      id="cover-author"
                      value={config.coverPage.author}
                      onChange={(e) => {
                        updateCover('author', e.target.value);
                        onSetOverride('author', true);
                      }}
                      className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-750 rounded-lg text-xs"
                      placeholder="Nome do autor..."
                    />
                  </div>
                  <div>
                    <SyncLabel
                      htmlFor="cover-date"
                      label="Data / Época"
                      field="date"
                      isOverridden={!!overriddenFields.date}
                      onToggle={onToggleOverride}
                    />
                    <input
                      type="text"
                      id="cover-date"
                      value={config.coverPage.date}
                      onChange={(e) => {
                        updateCover('date', e.target.value);
                        onSetOverride('date', true);
                      }}
                      className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-750 rounded-lg text-xs"
                      placeholder="Ex: Maio de 2026..."
                    />
                  </div>
                </div>

                <div>
                  <SyncLabel
                    htmlFor="cover-institute"
                    label="Instituição ou Organização"
                    field="institution"
                    isOverridden={!!overriddenFields.institution}
                    onToggle={onToggleOverride}
                  />
                  <input
                    type="text"
                    id="cover-institute"
                    value={config.coverPage.institution}
                    onChange={(e) => {
                      updateCover('institution', e.target.value);
                      onSetOverride('institution', true);
                    }}
                    className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-750 rounded-lg text-xs"
                    placeholder="Ex: Universidade Beta S/A..."
                  />
                </div>

                {/* Cover theme layout type */}
                <div>
                  <label className="block font-semibold mb-1" htmlFor="cover-theme-select">Tema de Layout da Capa</label>
                  <select
                    id="cover-theme-select"
                    value={config.coverPage.theme}
                    onChange={(e) => updateCover('theme', e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-7r0 rounded-lg cursor-pointer"
                  >
                    <option value="minimal">Clássico Minimalista (Delicado)</option>
                    <option value="bold">Faixa Negrito (Forte Bloco)</option>
                    <option value="split">Moderno Dividido (Premium)</option>
                    <option value="stripe">Barra Colorida Superior (Elegante)</option>
                  </select>
                </div>

                {/* Circle Accent Color Picker */}
                <div>
                  <label className="block font-semibold mb-1.5">Cor de Destaque / Identidade</label>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {ACCENT_COLORS.map((col) => (
                      <button
                        key={col.value}
                        id={`accent-col-btn-${col.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => {
                          onChangeConfig({
                            ...config,
                            headingColor: col.value,
                            coverPage: {
                              ...config.coverPage,
                              accentColor: col.value
                            }
                          });
                        }}
                        type="button"
                        className={`w-6 h-6 rounded-full cursor-pointer transition-all border ${
                          config.coverPage.accentColor === col.value
                            ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900 border-white scale-110'
                            : 'border-slate-300 dark:border-slate-700 hover:scale-105'
                        } ${col.class}`}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE AND HEADER TAB */}
        {activeTab === 'page' && (
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Layout & Estrutura Física</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ajuste os parâmetros físicos das páginas do PDF para impressão ideal ou compartilhamento.
              </p>
            </div>

            {/* Layout Parameters Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-semibold mb-1" htmlFor="page-size-select">Formato da Folha</label>
                <select
                  id="page-size-select"
                  value={config.layout.pageSize}
                  onChange={(e) => updateLayout('pageSize', e.target.value as PageSize)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer"
                >
                  <option value="A4">A4 (Padrão)</option>
                  <option value="Letter">Ofício / Letter (EUA)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1" htmlFor="page-margins-select">Margens de Segurança</label>
                <select
                  id="page-margins-select"
                  value={config.layout.margins}
                  onChange={(e) => updateLayout('margins', e.target.value as MarginSize)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer"
                >
                  <option value="narrow">Estreita (12mm) — Mais espaço</option>
                  <option value="normal">Normal (20mm) — Padrão</option>
                  <option value="wide">Larga (30mm) — Acadêmico</option>
                  <option value="none">Nenhuma (0mm)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="page-orientation-select">Orientação da Página</label>
              <select
                id="page-orientation-select"
                value={config.layout.orientation}
                onChange={(e) => updateLayout('orientation', e.target.value as Orientation)}
                className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer animate-none"
              >
                <option value="portrait">Vertical (Retrato)</option>
                <option value="landscape">Horizontal (Paisagem)</option>
              </select>
            </div>

            <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Cabeçalhos e Rodapés */}
            <div className="space-y-3">
              <span className="font-bold text-slate-900 dark:text-white block">Acessórios de Página (Cabeçalhos / Rodapés)</span>
              
              {/* Header Toggles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="checkbox-header-show"
                      checked={config.headerFooter.showHeader}
                      onChange={(e) => updateHeaderFooter('showHeader', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-550"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-300">Mostrar Cabeçalho</span>
                  </label>
                </div>
                {config.headerFooter.showHeader && (
                  <div className="space-y-1">
                    <SyncLabel
                      htmlFor="header-text-input"
                      label="Texto do Cabeçalho"
                      field="headerText"
                      isOverridden={!!overriddenFields.headerText}
                      onToggle={onToggleOverride}
                    />
                    <input
                      type="text"
                      id="header-text-input"
                      value={config.headerFooter.headerText}
                      onChange={(e) => {
                        updateHeaderFooter('headerText', e.target.value);
                        onSetOverride('headerText', true);
                      }}
                      className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-755 rounded-lg text-xs"
                      placeholder="Texto de cabeçalho..."
                    />
                  </div>
                )}
              </div>

              {/* Footer Toggles */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="checkbox-footer-show"
                      checked={config.headerFooter.showFooter}
                      onChange={(e) => updateHeaderFooter('showFooter', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-550"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-300">Mostrar Rodapé</span>
                  </label>
                </div>
                {config.headerFooter.showFooter && (
                  <div className="space-y-1">
                    <SyncLabel
                      htmlFor="footer-text-input"
                      label="Texto do Rodapé"
                      field="footerText"
                      isOverridden={!!overriddenFields.footerText}
                      onToggle={onToggleOverride}
                    />
                    <input
                      type="text"
                      id="footer-text-input"
                      value={config.headerFooter.footerText}
                      onChange={(e) => {
                        updateHeaderFooter('footerText', e.target.value);
                        onSetOverride('footerText', true);
                      }}
                      className="w-full p-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-755 rounded-lg text-xs"
                      placeholder="Texto de rodapé..."
                    />
                  </div>
                )}
              </div>

              {/* Page Number Toggle */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="checkbox-page-numbers-show"
                    checked={config.headerFooter.showPageNumbers}
                    onChange={(e) => updateHeaderFooter('showPageNumbers', e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-550"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-300 block">Exibir Numeração de Páginas</span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-normal">Ex: "Página X de Y" no rodapé</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
