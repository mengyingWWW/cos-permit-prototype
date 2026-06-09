import { useState } from 'react';
import { TrendingUp, TrendingDown, Info, ChevronDown, CheckCircle2, Circle, Clock } from 'lucide-react';
import type { Screen } from '../types';
import {
  PERMIT_RECORDS,
  TIMELINE_STAGES,
  AI_TIMELINE_METRICS,
  BAR_CHART_DATA,
  LINE_CHART_DATA,
} from '../data';
import { AI_CONFIG } from '../config';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'In Review') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        In Review
      </span>
    );
  }
  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
      {status}
    </span>
  );
}

function BarChart() {
  const max = Math.max(...BAR_CHART_DATA.map(d => d.value));
  const chartH = 120;
  const barW = 20;
  const gap = 10;
  const totalW = BAR_CHART_DATA.length * (barW + gap) - gap;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${totalW + 40} ${chartH + 60}`} className="w-full" style={{ maxHeight: 180 }}>
        {/* Y axis labels */}
        {[0, 40, 80, 120, 160].map((v) => (
          <g key={v}>
            <text
              x={28}
              y={chartH - (v / max) * chartH + 4}
              textAnchor="end"
              fontSize="9"
              fill="#9ca3af"
            >
              {v}
            </text>
            <line
              x1={32}
              y1={chartH - (v / max) * chartH}
              x2={totalW + 40}
              y2={chartH - (v / max) * chartH}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          </g>
        ))}
        {/* Bars */}
        {BAR_CHART_DATA.map((d, i) => {
          const x = 34 + i * (barW + gap);
          const h = (d.value / max) * chartH;
          const y = chartH - h;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barW} height={h} fill="#3b82f6" rx="2" opacity="0.85" />
              <text
                x={x + barW / 2}
                y={chartH + 14}
                textAnchor="middle"
                fontSize="7.5"
                fill="#6b7280"
                transform={`rotate(-35, ${x + barW / 2}, ${chartH + 14})`}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function LineChart() {
  const vals = LINE_CHART_DATA.map(d => d.value);
  const minV = 10;
  const maxV = 14;
  const chartH = 80;
  const chartW = 260;
  const padL = 30;
  const padB = 20;

  const toX = (i: number) => padL + (i / (LINE_CHART_DATA.length - 1)) * (chartW - padL - 10);
  const toY = (v: number) => chartH - ((v - minV) / (maxV - minV)) * chartH;

  const points = LINE_CHART_DATA.map((d, i) => `${toX(i)},${toY(d.value)}`).join(' ');
  const areaPoints = [
    `${toX(0)},${chartH}`,
    ...LINE_CHART_DATA.map((d, i) => `${toX(i)},${toY(d.value)}`),
    `${toX(LINE_CHART_DATA.length - 1)},${chartH}`,
  ].join(' ');

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${chartW} ${chartH + padB + 10}`} className="w-full" style={{ maxHeight: 150 }}>
        {/* Y labels */}
        {[10, 12, 14].map((v) => (
          <g key={v}>
            <text x={padL - 4} y={toY(v) + 3.5} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
            <line x1={padL} y1={toY(v)} x2={chartW - 10} y2={toY(v)} stroke="#f3f4f6" strokeWidth="1" />
          </g>
        ))}
        {/* Area */}
        <polygon points={areaPoints} fill="#3b82f6" opacity="0.08" />
        {/* Line */}
        <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
        {/* Dots */}
        {LINE_CHART_DATA.map((d, i) => (
          <circle key={i} cx={toX(i)} cy={toY(d.value)} r="3.5" fill="#3b82f6" />
        ))}
        {/* X labels */}
        {LINE_CHART_DATA.map((d, i) => (
          <text key={i} x={toX(i)} y={chartH + padB + 2} textAnchor="middle" fontSize="9" fill="#9ca3af">
            {d.year.replace(/[ab]$/, '')}
          </text>
        ))}
      </svg>
    </div>
  );
}

function AITimelineTracker({ permitType }: { permitType: string }) {
  const [showBasis, setShowBasis] = useState(false);
  const { planReviewDays, correctionDays, totalIssueDays, basisFactors } = AI_TIMELINE_METRICS;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Your{' '}
            <span className="text-seattle-700">"{permitType}"</span>{' '}
            AI Time Tracker
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-3.5 h-3.5 rounded-full bg-ai-500 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">AI</span>
            </div>
            <p className="text-xs text-gray-500">
              This estimate is generated by AI using your personal data and situation.
            </p>
            <button
              onClick={() => setShowBasis(v => !v)}
              className="ml-1 text-xs text-ai-600 hover:text-ai-700 underline underline-offset-2 flex items-center gap-0.5"
            >
              <Info size={11} />
              View basis
            </button>
          </div>
        </div>
      </div>

      {/* Basis panel */}
      {showBasis && (
        <div className="bg-ai-50 border border-ai-200 rounded-lg px-4 py-3 fade-in">
          <p className="text-xs font-semibold text-ai-800 mb-2">How this estimate was calculated:</p>
          <ul className="space-y-1">
            {basisFactors.map((f, i) => (
              <li key={i} className="text-xs text-ai-700 flex items-start gap-1.5">
                <span className="mt-0.5 w-1 h-1 rounded-full bg-ai-500 flex-shrink-0 block" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500 font-medium">Estimated Plan Review Time</p>
            <TrendingUp size={14} className="text-red-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">{planReviewDays} <span className="text-lg font-semibold text-gray-500">Days</span></p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500 font-medium">Application Correction Time</p>
            <TrendingDown size={14} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">{correctionDays} <span className="text-lg font-semibold text-gray-500">Days</span></p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-500 font-medium">Total Issue Time</p>
            <TrendingUp size={14} className="text-red-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalIssueDays} <span className="text-lg font-semibold text-gray-500">Days</span></p>
        </div>
      </div>

      {/* Timeline visual */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Estimated Review Stages</h3>
        </div>
        <div className="relative">
          {TIMELINE_STAGES.map((stage, idx) => (
            <div key={stage.id} className="flex gap-4 relative">
              {/* Connector line */}
              {idx < TIMELINE_STAGES.length - 1 && (
                <div className="absolute left-[11px] top-6 w-0.5 h-full -bottom-0 bg-gray-200 z-0" style={{ top: 22, bottom: -8 }} />
              )}
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0 mt-1">
                {stage.status === 'completed' && (
                  <CheckCircle2 size={22} className="text-emerald-500 bg-white" />
                )}
                {stage.status === 'active' && (
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-seattle-600 bg-seattle-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-seattle-600" />
                  </div>
                )}
                {stage.status === 'upcoming' && (
                  <Circle size={22} className="text-gray-300 bg-white" />
                )}
              </div>
              {/* Content */}
              <div className={`flex-1 pb-5 ${idx === TIMELINE_STAGES.length - 1 ? 'pb-0' : ''}`}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className={`text-sm font-medium ${stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-800'}`}>
                    {stage.label}
                  </span>
                  <span className={`text-xs flex-shrink-0 ${stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500'}`}>
                    ~{stage.estimatedDays} days
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${stage.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stage.startDate} — {stage.endDate}
                  {stage.status === 'active' && (
                    <span className="ml-2 inline-flex items-center gap-1 text-seattle-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-seattle-600 animate-pulse" />
                      In progress
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyTracker() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-700">
        Select a Record to View Your Personalized AI Time Tracker:
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {['Estimated Plan Review Time', 'Application Correction Time', 'Total Issue Time'].map((label) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <TrendingUp size={14} className="text-red-400" />
            </div>
            <p className="text-3xl font-bold text-gray-400 mt-1">-- <span className="text-lg font-semibold text-gray-300">Days</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedRecord, setSelectedRecord] = useState<string | null>('1');
  const activePermit = PERMIT_RECORDS.find(r => r.id === selectedRecord && r.isActive);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex flex-1 gap-0 min-h-0 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-7 py-6">
          {AI_CONFIG.timeline === 'full' && activePermit ? (
            <AITimelineTracker permitType={activePermit.recordType} />
          ) : (
            <EmptyTracker />
          )}

          {/* Charts */}
          <div className="mt-5 bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Average Review Time by Permit Class</h3>
                <BarChart />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Plan Review Time by Year</h3>
                <LineChart />
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — Record Details */}
        <div className="w-[340px] min-w-[340px] border-l border-gray-200 bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Record Details</span>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">
                By type <ChevronDown size={11} />
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-[80px_90px_1fr_72px] gap-1 px-4 py-2 border-b border-gray-100">
            {['Created Date', 'Record Number', 'Record Type', 'Status'].map(h => (
              <span key={h} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide leading-tight">{h}</span>
            ))}
          </div>

          {/* Table rows */}
          <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-gray-50">
            {PERMIT_RECORDS.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecord(record.id)}
                className={`w-full grid grid-cols-[80px_90px_1fr_72px] gap-1 px-4 py-3 text-left transition-colors ${
                  selectedRecord === record.id
                    ? 'bg-blue-50 border-l-2 border-l-seattle-600'
                    : 'hover:bg-gray-50 border-l-2 border-l-transparent'
                }`}
              >
                <span className="text-xs text-gray-500">{record.createdDate}</span>
                <span className="text-xs text-blue-600 font-medium break-all leading-tight">{record.recordNumber}</span>
                <span className="text-xs text-gray-700 leading-tight">{record.recordType}</span>
                <div><StatusBadge status={record.status} /></div>
              </button>
            ))}
          </div>

          {/* Create button */}
          <div className="px-4 py-4 border-t border-gray-100">
            <button
              onClick={() => onNavigate('form')}
              className="w-full px-4 py-2.5 bg-white border-2 border-seattle-700 text-seattle-700 text-sm font-semibold rounded-xl hover:bg-seattle-50 transition-colors"
            >
              Create a New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
