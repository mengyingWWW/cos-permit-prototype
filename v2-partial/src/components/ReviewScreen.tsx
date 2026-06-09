import { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Screen, AIFlag } from '../types';
import { AI_FLAGS, PARTIAL_AI_FLAGS, REVIEW_APPLICATION } from '../data';
import { AI_CONFIG } from '../config';

interface ReviewScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SEVERITY_CONFIG = {
  error: {
    icon: AlertTriangle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    headerBg: 'bg-red-50',
    label: 'Issue',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconColor: 'text-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    headerBg: 'bg-amber-50',
    label: 'Warning',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    headerBg: 'bg-blue-50',
    label: 'Suggestion',
  },
};

function FlagCard({
  flag,
  showCitation,
  onToggle,
  onAccept,
  onDismiss,
}: {
  flag: AIFlag;
  showCitation: boolean;
  onToggle: () => void;
  onAccept: () => void;
  onDismiss: () => void;
}) {
  const cfg = SEVERITY_CONFIG[flag.severity];
  const Icon = cfg.icon;

  if (flag.status === 'dismissed') {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 flex items-center justify-between gap-2 opacity-60">
        <span className="text-xs text-gray-500 line-through">{flag.issue}</span>
        <button onClick={onDismiss} className="text-xs text-gray-400 hover:text-gray-600 flex-shrink-0">Undo</button>
      </div>
    );
  }

  if (flag.status === 'accepted') {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
          <span className="text-xs text-emerald-800 font-medium">{flag.issue}</span>
        </div>
        <span className="text-xs text-emerald-600 flex-shrink-0">Accepted</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden fade-in`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className={`w-full flex items-start gap-2.5 px-3 py-3 text-left hover:opacity-90 transition-opacity`}
      >
        <Icon size={14} className={`${cfg.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${cfg.badgeBg} ${cfg.badgeText}`}>
              {cfg.label}
            </span>
            {showCitation && flag.codeRef && (
              <span className="text-[10px] text-gray-500 font-mono">{flag.codeRef}</span>
            )}
          </div>
          <p className="text-xs font-semibold text-gray-800 leading-snug">{flag.issue}</p>
          <p className="text-[10px] text-gray-500 mt-0.5">{flag.pageRef}</p>
        </div>
        {flag.expanded ? <ChevronUp size={13} className="text-gray-400 flex-shrink-0 mt-1" /> : <ChevronDown size={13} className="text-gray-400 flex-shrink-0 mt-1" />}
      </button>

      {/* Expanded detail */}
      {flag.expanded && (
        <div className="px-3 pb-3 space-y-3 fade-in">
          <p className="text-xs text-gray-700 leading-relaxed">{flag.detail}</p>

          {/* Code citation — full mode only */}
          {showCitation && flag.codeRef && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-mono font-semibold text-gray-500">{flag.codeRef}</span>
              </div>
              <p className="text-xs font-semibold text-gray-800 mb-1">{flag.codeTitle}</p>
              <p className="text-xs text-gray-600 leading-relaxed italic">"{flag.codeText}"</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAccept}
              className="flex-1 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Accept &amp; Address
            </button>
            <button
              onClick={onDismiss}
              className="flex-1 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ApplicationDocument({ flags }: { flags: AIFlag[] }) {
  const { title, fields } = REVIEW_APPLICATION;
  const activeFlags = flags.filter(f => f.status === 'open');

  const flaggedFields = new Set(activeFlags.map(f => f.field));

  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm mx-auto" style={{ maxWidth: 640 }}>
      <h1 className="text-center font-bold text-lg py-5 px-6 border-b border-gray-200">
        {title}
      </h1>
      <div className="px-6 py-4">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {fields.map((f) => {
              const isFlagged = flaggedFields.has(f.label);
              const flagData = activeFlags.find(af => af.field === f.label);
              const flagCfg = flagData ? SEVERITY_CONFIG[flagData.severity] : null;
              return (
                <tr key={f.label} className={`border border-gray-300 ${isFlagged ? 'relative' : ''}`}>
                  <td className="px-3 py-2.5 font-semibold text-gray-700 bg-gray-50 w-48 align-top border-r border-gray-300">
                    {f.label}
                  </td>
                  <td className={`px-3 py-2.5 align-top ${isFlagged && flagCfg ? flagCfg.bg : ''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <span className={isFlagged ? 'font-medium' : ''}>{f.value}</span>
                      {isFlagged && flagData && flagCfg && (
                        <div
                          className={`flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded ${flagCfg.badgeBg} ${flagCfg.badgeText}`}
                          title={flagData.issue}
                        >
                          <Sparkles size={9} />
                          AI Flag
                        </div>
                      )}
                    </div>
                    {isFlagged && flagData && (
                      <p className={`text-[11px] mt-1 ${flagCfg?.badgeText ?? 'text-gray-500'}`}>
                        {flagData.issue}
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ReviewScreen({ onNavigate }: ReviewScreenProps) {
  const showCitation = AI_CONFIG.review === 'full';
  const initialFlags = AI_CONFIG.review === 'partial' ? PARTIAL_AI_FLAGS : AI_FLAGS;
  const [flags, setFlags] = useState<AIFlag[]>(initialFlags);

  const toggleFlag = (id: string) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, expanded: !f.expanded } : f));
  };
  const acceptFlag = (id: string) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, status: 'accepted', expanded: false } : f));
  };
  const dismissFlag = (id: string) => {
    setFlags(prev => prev.map(f => {
      if (f.id === id) return { ...f, status: f.status === 'dismissed' ? 'open' : 'dismissed', expanded: false };
      return f;
    }));
  };

  const openCount = flags.filter(f => f.status === 'open').length;
  const errorCount = flags.filter(f => f.severity === 'error' && f.status === 'open').length;
  const warnCount = flags.filter(f => f.severity === 'warning' && f.status === 'open').length;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('form')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-base font-semibold text-gray-900">AI Review Report</h1>
              <p className="text-xs text-gray-500">Building Plans &amp; Evaluation</p>
            </div>
          </div>
          {(AI_CONFIG.review === 'full' || AI_CONFIG.review === 'partial') && (
            <div className="flex items-center gap-2">
              {openCount > 0 && (
                <div className="flex items-center gap-2">
                  {errorCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-full">
                      <AlertTriangle size={11} /> {errorCount} Issue{errorCount > 1 ? 's' : ''}
                    </span>
                  )}
                  {warnCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-full">
                      <AlertTriangle size={11} /> {warnCount} Warning{warnCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-ai-50 border border-ai-200 text-ai-700 text-sm font-semibold rounded-xl">
                <Sparkles size={13} />
                {flags.length} Annotations
              </span>
            </div>
          )}
        </div>

        {/* Page toolbar */}
        <div className="flex items-center justify-between px-6 py-2 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-400">
              <ChevronLeft size={14} />
            </button>
            <span>Page</span>
            <span className="w-8 h-7 border border-gray-300 bg-white rounded text-center text-sm leading-7">1</span>
            <span>of 1</span>
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 text-gray-400">
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
              <ZoomOut size={14} />
            </button>
            <span className="text-xs font-medium px-2">ZOOM 75%</span>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
              <ZoomIn size={14} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 transition-colors ml-1">
              <Maximize2 size={13} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
              <Download size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Document viewer */}
        <div className="flex-1 overflow-y-auto scrollbar-thin py-6 px-6">
          <ApplicationDocument flags={flags} />
        </div>

        {/* AI Annotations panel */}
        {(AI_CONFIG.review === 'full' || AI_CONFIG.review === 'partial') && (
          <div className="w-[340px] min-w-[340px] bg-white border-l border-gray-200 flex flex-col overflow-hidden">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-ai-500 flex items-center justify-center">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-800">AI Review Flags</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-ai-600 bg-ai-50 border border-ai-200 rounded px-1.5 py-0.5 font-semibold">
                <Sparkles size={9} />
                AI Generated
              </div>
            </div>

            {/* AI transparency note */}
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex-shrink-0">
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {showCitation
                  ? 'Each flag cites the specific municipal code or regulation. You can expand any flag to read the source. All flags are advisory — you remain in control.'
                  : 'These flags highlight potential issues with your application. Expand each one for details. All flags are advisory — you remain in control.'
                }
              </p>
            </div>

            {/* Summary */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span className="text-gray-600">{flags.filter(f => f.severity === 'error').length} issue</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span className="text-gray-600">{flags.filter(f => f.severity === 'warning').length} warnings</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                <span className="text-gray-600">{flags.filter(f => f.severity === 'info').length} suggestion</span>
              </div>
            </div>

            {/* Flag list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3 space-y-2.5">
              {flags.map(flag => (
                <FlagCard
                  key={flag.id}
                  flag={flag}
                  showCitation={showCitation}
                  onToggle={() => toggleFlag(flag.id)}
                  onAccept={() => acceptFlag(flag.id)}
                  onDismiss={() => dismissFlag(flag.id)}
                />
              ))}
            </div>

            {/* Submit CTA */}
            <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
              {openCount > 0 && errorCount > 0 ? (
                <div className="mb-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                  <AlertTriangle size={13} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">
                    Resolve {errorCount} critical issue{errorCount > 1 ? 's' : ''} before submitting.
                  </p>
                </div>
              ) : openCount === 0 ? (
                <div className="mb-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <p className="text-xs text-emerald-700 font-medium">All flags resolved. Ready to submit.</p>
                </div>
              ) : null}
              <button
                onClick={() => alert('Application submitted to SDCI. Record number: 25TMP-270798')}
                disabled={errorCount > 0}
                className={`w-full py-3 text-sm font-semibold rounded-xl transition-colors ${
                  errorCount > 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-seattle-800 text-white hover:bg-seattle-700'
                }`}
              >
                Submit to SDCI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
