import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  X,
  Sparkles,
  MessageSquare,
  ChevronDown,
  Send,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  RefreshCw,
  MoreHorizontal,
  Paperclip,
  Smile,
} from 'lucide-react';
import type { Screen, AutofillState, FormData } from '../types';
import {
  INITIAL_FORM_DATA,
  AI_FILLED_FORM,
  INITIAL_DOCUMENTS,
  UPLOADED_DOCUMENTS,
  PARTIAL_DOCUMENTS,
} from '../data';
import { AI_CONFIG } from '../config';

interface ApplicationFormProps {
  onNavigate: (screen: Screen) => void;
}

interface ChatMsg {
  role: 'user' | 'ai';
  text: string;
}

const AI_FIELD_KEYS = Object.keys(AI_FILLED_FORM) as (keyof FormData)[];

function AIBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-ai-700 bg-ai-50 border border-ai-200 rounded px-1.5 py-0.5">
      <Sparkles size={9} />
      AI
    </span>
  );
}

function AISparkleMark() {
  return (
    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ai-500" title="AI-filled — you can edit this">
      <Sparkles size={14} strokeWidth={1.5} />
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  aiMark?: boolean;
  type?: string;
  className?: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  isShimmering?: boolean;
}

function FormField({ label, value, aiMark, type = 'text', className = '', onChange, readOnly, isShimmering }: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={type}
          value={isShimmering ? '' : value}
          onChange={e => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={isShimmering ? '' : undefined}
          className={`
            w-full px-3 py-2 text-sm rounded-lg border transition-all
            focus:outline-none focus:ring-2 focus:ring-seattle-500 focus:border-transparent
            ${aiMark
              ? 'border-ai-300 bg-ai-50/40 pr-8 text-gray-800 ring-1 ring-ai-300'
              : 'border-gray-200 bg-white text-gray-800'
            }
            ${isShimmering ? 'shimmer pointer-events-none' : ''}
          `}
        />
        {aiMark && !isShimmering && <AISparkleMark />}
      </div>
    </div>
  );
}

function InlineAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'ai',
      text: "Hi! I'm your permit assistant. Ask me anything about this application — required documents, what a field means, or what to expect next.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const RESPONSES: Record<string, string> = {
    default: "Great question. For a Reroofing Permit in MR(M) zoning, the SDCI typically requires building plans, an energy compliance form, and contractor license documentation. If you're unsure about a specific field, feel free to ask!",
    ssn: "Your SSN is required for identity verification by the City of Seattle under SMC 3.72. It's encrypted in transit and stored only in the secure SDCI system.",
    timeline: "Based on similar permits in Q4 2025, plan review typically takes 70–85 days. AI estimates your total permit issuance at 92 days from application date.",
    contractor: "Your contractor (Northwest RoofWorks LLC) must maintain an active WA State license through the entire project duration, including final inspection.",
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input.toLowerCase();
    setMessages(m => [...m, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      const reply = q.includes('ssn') || q.includes('social')
        ? RESPONSES.ssn
        : q.includes('timeline') || q.includes('how long')
        ? RESPONSES.timeline
        : q.includes('contractor')
        ? RESPONSES.contractor
        : RESPONSES.default;
      setMessages(m => [...m, { role: 'ai', text: reply }]);
    }, 600);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-seattle-900 text-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-ai-400 flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-sm font-semibold">Permit Assistant</span>
              <AIBadge />
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-64 scrollbar-thin">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] text-xs rounded-xl px-3 py-2 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-seattle-700 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask about this form..."
              className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ai-400"
            />
            <button
              onClick={handleSend}
              className="w-7 h-7 flex-shrink-0 bg-seattle-700 text-white rounded-lg flex items-center justify-center hover:bg-seattle-600 transition-colors"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-12 h-12 bg-seattle-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-seattle-700 transition-colors ai-pulse"
        title="AI Permit Assistant"
      >
        <MessageSquare size={20} />
      </button>
    </div>
  );
}

// ── Partial: support chatbot panel ────────────────────────────────────────────

interface SupportChatbotProps {
  open: boolean;
  onClose: () => void;
}

const SUPPORT_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['ssn', 'social security', 'social'],
    reply: "Your Social Security Number is required for identity verification. It's used by the City of Seattle to confirm your identity and is stored securely. If you're uncomfortable, you may contact SDCI directly at (206) 684-8850 to discuss alternatives.",
  },
  {
    keywords: ['contractor', 'license'],
    reply: "Your contractor must hold a valid Washington State contractor license for the full duration of the permitted work. You can verify license status at the Washington State Department of Labor & Industries website.",
  },
  {
    keywords: ['timeline', 'how long', 'days', 'time'],
    reply: "Timeline varies by permit type. For a Reroofing Permit, plan review typically takes 60–80 days. You can use the Timeline Estimator on the Dashboard to look up typical timelines for your permit type.",
  },
  {
    keywords: ['document', 'upload', 'file', 'plans'],
    reply: "Required documents for a Reroofing Permit typically include Building Plans & Elevations, Site Plan, and an Energy Compliance Form. You can upload them using the document panel on the right side of this form.",
  },
  {
    keywords: ['address', 'project address'],
    reply: "The Project Address should be the address of the property where work will be performed, not your mailing address. Use the full street address including unit number if applicable.",
  },
  {
    keywords: ['fee', 'cost', 'pay'],
    reply: "Permit fees are based on the estimated cost of construction. SDCI calculates fees after reviewing your application. You can find the fee schedule at the SDCI website under 'Fee Schedules'.",
  },
];

const SUPPORT_DEFAULT = "Thanks for your question. I can help explain fields on this form, clarify required documents, or describe what to expect during the review process. Could you be more specific about what you need help with?";

function SupportChatbot({ open, onClose }: SupportChatbotProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: 'Hello! Welcome to the permit application assistant. I can help you understand any field on this form or answer questions about the permit process. What do you need help with?' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input.toLowerCase();
    setMessages(m => [...m, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      const match = SUPPORT_RESPONSES.find(r => r.keywords.some(k => q.includes(k)));
      setMessages(m => [...m, { role: 'ai', text: match ? match.reply : SUPPORT_DEFAULT }]);
    }, 700);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!open) return null;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed top-0 right-0 bottom-0 w-[320px] bg-white border-l border-gray-200 shadow-2xl flex flex-col z-50 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MoreHorizontal size={16} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Chat with us!</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <span className="text-lg leading-none font-light">−</span>
          </button>
          <button onClick={onClose} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Agent info */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Chatbot</p>
            <p className="text-xs text-gray-500">Support Agent</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-300 hover:text-gray-500 transition-colors"><ThumbsUp size={15} /></button>
          <button className="text-gray-300 hover:text-gray-500 transition-colors"><ThumbsDown size={15} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={10} className="text-white" />
          </div>
          <span className="text-[10px] text-gray-400">Livechat {timeStr}</span>
        </div>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] text-xs rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Write a message"
          className="flex-1 text-xs px-3 py-2 focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <div className="flex items-center gap-1 text-gray-400">
          <button className="hover:text-gray-600 transition-colors"><Smile size={16} /></button>
          <button className="hover:text-gray-600 transition-colors"><Paperclip size={16} /></button>
          <button
            onClick={handleSend}
            className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── End partial chatbot ───────────────────────────────────────────────────────

export default function ApplicationForm({ onNavigate }: ApplicationFormProps) {
  const [autofillState, setAutofillState] = useState<AutofillState>('idle');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [docs, setDocs] = useState(AI_CONFIG.formFill === 'partial' ? PARTIAL_DOCUMENTS : INITIAL_DOCUMENTS);
  const [shimmeringFields, setShimmeringFields] = useState<Set<keyof FormData>>(new Set());
  const [filledFields, setFilledFields] = useState<Set<keyof FormData>>(new Set());
  const [showAutofillBanner, setShowAutofillBanner] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const allUploaded = docs.every(d => d.uploaded);

  const handleSimulateUpload = () => {
    setDocs(UPLOADED_DOCUMENTS);
  };

  const handleAutofill = () => {
    if (!allUploaded) return;
    setAutofillState('reading');
    setShowAutofillBanner(true);

    setTimeout(() => {
      setAutofillState('filling');
      const allKeys = AI_FIELD_KEYS;
      allKeys.forEach(key => setShimmeringFields(prev => new Set([...prev, key])));

      allKeys.forEach((key, i) => {
        setTimeout(() => {
          setShimmeringFields(prev => {
            const next = new Set(prev);
            next.delete(key);
            return next;
          });
          setFormData(prev => ({ ...prev, [key]: AI_FILLED_FORM[key] }));
          setFilledFields(prev => new Set([...prev, key]));

          if (i === allKeys.length - 1) {
            setAutofillState('done');
          }
        }, i * 120);
      });
    }, 2000);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setFilledFields(new Set());
    setAutofillState('idle');
    setShowAutofillBanner(false);
    setShimmeringFields(new Set());
    setDocs(INITIAL_DOCUMENTS);
  };

  const isAIField = (key: keyof FormData) =>
    AI_CONFIG.formFill === 'full' && filledFields.has(key);

  const isShimmering = (key: keyof FormData) =>
    shimmeringFields.has(key);

  const setField = (key: keyof FormData) => (v: string) =>
    setFormData(prev => ({ ...prev, [key]: v }));

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 px-6 py-3 bg-white border-b border-gray-200 flex-shrink-0">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-sm text-gray-500">
          Dashboard <span className="mx-1 text-gray-300">/</span>
          <span className="text-gray-800 font-medium">Create a New Application</span>
        </span>
      </div>

      {/* Autofill loading banner */}
      {autofillState === 'reading' && (
        <div className="bg-ai-50 border-b border-ai-200 px-6 py-2 flex items-center gap-3 flex-shrink-0 fade-in">
          <div className="flex items-center gap-2 text-ai-700 font-medium text-sm">
            <Sparkles size={14} className="animate-pulse" />
            AI Reading Files &amp; Autofilling...
          </div>
          <div className="flex-1 h-1 bg-ai-200 rounded-full overflow-hidden">
            <div className="h-full bg-ai-500 rounded-full w-1/3 animate-pulse" />
          </div>
        </div>
      )}
      {autofillState === 'filling' && (
        <div className="bg-ai-50 border-b border-ai-200 px-6 py-2 flex items-center gap-3 flex-shrink-0">
          <Sparkles size={14} className="text-ai-500 animate-pulse" />
          <span className="text-sm text-ai-700 font-medium">AI populating fields from uploaded documents...</span>
        </div>
      )}
      {autofillState === 'done' && showAutofillBanner && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 flex items-center justify-between flex-shrink-0 fade-in">
          <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
            <CheckCircle2 size={14} />
            AI autofill complete — {filledFields.size} fields populated from your documents. Review and edit as needed.
          </div>
          <button onClick={() => setShowAutofillBanner(false)}>
            <X size={14} className="text-emerald-600 hover:text-emerald-800" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-[1100px] mx-auto px-6 py-6">
          {/* Page header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 bg-seattle-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="2" width="10" height="14" rx="1.5" stroke="white" strokeWidth="1.5" />
                <path d="M6 6h4M6 9h4M6 12h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Permitting Application</h1>
              <p className="text-sm text-gray-500 mt-0.5">Fill in all required information to initiate the application</p>
            </div>
            {autofillState === 'done' && (
              <button onClick={handleReset} className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-2">
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>

          <div className="flex gap-5">
            {/* Form */}
            <div className="flex-1 min-w-0">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                {/* Section: Information */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">Information</h2>
                    <span className="text-xs text-red-500 font-medium">* Required</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name" value={formData.firstName} onChange={setField('firstName')} aiMark={isAIField('firstName')} isShimmering={isShimmering('firstName')} />
                    <FormField label="Last Name" value={formData.lastName} onChange={setField('lastName')} aiMark={isAIField('lastName')} isShimmering={isShimmering('lastName')} />
                    <FormField label="Email Address" value={formData.email} onChange={setField('email')} aiMark={isAIField('email')} isShimmering={isShimmering('email')} />
                    <FormField label="Phone Number" value={formData.phone} onChange={setField('phone')} aiMark={isAIField('phone')} isShimmering={isShimmering('phone')} />
                    <FormField label="Date of Birth" value={formData.dob} onChange={setField('dob')} aiMark={isAIField('dob')} isShimmering={isShimmering('dob')} />
                    <FormField label="SSN" value={formData.ssn} onChange={setField('ssn')} aiMark={isAIField('ssn')} isShimmering={isShimmering('ssn')} />
                  </div>
                </div>

                {/* Section: Address */}
                <div className="px-6 pt-4 pb-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-700 mb-4">Address Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Street Address" value={formData.streetAddress} onChange={setField('streetAddress')} aiMark={isAIField('streetAddress')} isShimmering={isShimmering('streetAddress')} className="col-span-2" />
                    <FormField label="City" value={formData.city} onChange={setField('city')} aiMark={isAIField('city')} isShimmering={isShimmering('city')} />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="State" value={formData.state} onChange={setField('state')} aiMark={isAIField('state')} isShimmering={isShimmering('state')} />
                      <FormField label="ZIP" value={formData.zip} onChange={setField('zip')} aiMark={isAIField('zip')} isShimmering={isShimmering('zip')} />
                    </div>
                  </div>
                </div>

                {/* Section: Financially Responsible Party */}
                <div className="px-6 pt-4 pb-4 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-700 mb-4">Financially Responsible Party</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name" value={formData.respFirstName} onChange={setField('respFirstName')} aiMark={isAIField('respFirstName')} isShimmering={isShimmering('respFirstName')} />
                    <FormField label="Last Name" value={formData.respLastName} onChange={setField('respLastName')} aiMark={isAIField('respLastName')} isShimmering={isShimmering('respLastName')} />
                    <FormField label="Street Address" value={formData.respStreetAddress} onChange={setField('respStreetAddress')} aiMark={isAIField('respStreetAddress')} isShimmering={isShimmering('respStreetAddress')} className="col-span-2" />
                    <FormField label="City" value={formData.respCity} onChange={setField('respCity')} aiMark={isAIField('respCity')} isShimmering={isShimmering('respCity')} />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="State" value={formData.respState} onChange={setField('respState')} aiMark={isAIField('respState')} isShimmering={isShimmering('respState')} />
                      <FormField label="ZIP" value={formData.respZip} onChange={setField('respZip')} aiMark={isAIField('respZip')} isShimmering={isShimmering('respZip')} />
                    </div>
                  </div>
                </div>

                {/* Section: Project Details */}
                <div className="px-6 pt-4 pb-5">
                  <h2 className="text-sm font-semibold text-gray-700 mb-4">Project Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Project Address" value={formData.projectAddress} onChange={setField('projectAddress')} aiMark={isAIField('projectAddress')} isShimmering={isShimmering('projectAddress')} className="col-span-2" />
                    <FormField label="Permit Type" value={formData.permitType} onChange={setField('permitType')} aiMark={isAIField('permitType')} isShimmering={isShimmering('permitType')} />
                    <FormField label="Estimated Cost" value={formData.estimatedCost} onChange={setField('estimatedCost')} aiMark={isAIField('estimatedCost')} isShimmering={isShimmering('estimatedCost')} />
                    <FormField label="Contractor Name" value={formData.contractorName} onChange={setField('contractorName')} aiMark={isAIField('contractorName')} isShimmering={isShimmering('contractorName')} />
                    <FormField label="Contractor License #" value={formData.contractorLicense} onChange={setField('contractorLicense')} aiMark={isAIField('contractorLicense')} isShimmering={isShimmering('contractorLicense')} />
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={formData.projectDescription}
                          onChange={e => setField('projectDescription')(e.target.value)}
                          rows={3}
                          className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-seattle-500 resize-none
                            ${isAIField('projectDescription')
                              ? 'border-ai-300 bg-ai-50/40 pr-8 ring-1 ring-ai-300'
                              : 'border-gray-200 bg-white'
                            }
                            ${isShimmering('projectDescription') ? 'shimmer' : ''}
                          `}
                        />
                        {isAIField('projectDescription') && (
                          <div className="absolute right-2.5 top-2.5 text-ai-500">
                            <Sparkles size={14} strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit row */}
                  <div className="mt-6 flex items-center justify-between">
                    {AI_CONFIG.formFill === 'full' && autofillState === 'done' && (
                      <div className="flex items-center gap-1.5 text-xs text-ai-700 bg-ai-50 border border-ai-200 rounded-lg px-3 py-2">
                        <Sparkles size={12} />
                        <span>{filledFields.size} fields autofilled by AI — all editable</span>
                      </div>
                    )}
                    <div className="ml-auto flex items-center gap-3">
                      <button
                        onClick={() => onNavigate('dashboard')}
                        className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => onNavigate('review')}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-seattle-800 rounded-xl hover:bg-seattle-700 transition-colors"
                      >
                        Review Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel — Documents */}
            <div className="w-[280px] min-w-[280px] flex flex-col gap-4">
              {/* AI Autofill CTA */}
              {AI_CONFIG.formFill === 'full' && (
                <div className="flex flex-col items-center gap-3">
                  {!allUploaded && (
                    <p className="text-xs text-red-600 font-semibold text-center leading-tight">
                      To enable AI Autofill, please finish document uploading first!
                    </p>
                  )}
                  <button
                    onClick={handleAutofill}
                    disabled={!allUploaded || autofillState !== 'idle'}
                    className={`flex flex-col items-center gap-1.5 group ${
                      !allUploaded || autofillState !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    title="AI AutoFill"
                  >
                    <div className={`w-14 h-14 rounded-full bg-seattle-800 flex items-center justify-center shadow-lg transition-transform ${allUploaded && autofillState === 'idle' ? 'group-hover:scale-105' : ''}`}>
                      <Sparkles size={24} className="text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold text-seattle-800">AI AutoFill</span>
                  </button>
                  {autofillState === 'idle' && allUploaded && (
                    <button
                      onClick={handleSimulateUpload}
                      className="text-xs text-gray-400 hover:text-gray-600 underline"
                    >
                      Docs already uploaded
                    </button>
                  )}
                </div>
              )}

              {/* Required documents card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">Required Documents</h3>
                </div>

                {/* Drop zone */}
                <div className="p-3">
                  <div
                    onClick={handleSimulateUpload}
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-ai-400 hover:bg-ai-50/30 transition-colors"
                  >
                    <Upload size={20} className="text-gray-400" />
                    <div className="text-center">
                      <p className="text-xs text-gray-600 font-medium">Drag &amp; Drop files here</p>
                      <p className="text-xs text-gray-400">or click to browse</p>
                    </div>
                    <button className="px-4 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                      Choose Files
                    </button>
                    <p className="text-[10px] text-gray-400">Max file size: 10MB</p>
                  </div>
                </div>

                {/* Checklist */}
                <div className="px-4 pb-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">Document Checklist</h4>
                  <div className="space-y-2">
                    {docs.map(doc => {
                      const isError = AI_CONFIG.formFill === 'partial' && doc.id === 'bank' && !doc.uploaded;
                      return (
                        <div
                          key={doc.id}
                          className={`flex items-start justify-between gap-2 rounded-lg px-3 py-2.5 border text-xs transition-colors ${
                            doc.uploaded
                              ? 'bg-emerald-50 border-emerald-200'
                              : isError
                              ? 'bg-red-50 border-red-200'
                              : 'bg-white border-gray-100'
                          }`}
                        >
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            {doc.uploaded ? (
                              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            ) : isError ? (
                              <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded border border-gray-300 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="min-w-0">
                              <p className={`font-medium truncate ${doc.uploaded ? 'text-emerald-800' : isError ? 'text-red-700' : 'text-gray-700'}`}>
                                {doc.name}
                              </p>
                              {doc.uploaded ? (
                                <p className="text-emerald-600 truncate">{doc.filename} · {doc.size}</p>
                              ) : isError ? (
                                <div>
                                  <p className="text-red-600 font-medium truncate">{doc.filename} failed</p>
                                  <p className="text-red-500">File too large</p>
                                </div>
                              ) : (
                                <p className="text-gray-400">{doc.required ? 'Required' : 'Optional'} — Auto-pulled</p>
                              )}
                            </div>
                          </div>
                          {doc.uploaded && (
                            <button
                              onClick={() => setDocs(d => d.map(x => x.id === doc.id ? { ...x, uploaded: false } : x))}
                              className="text-gray-400 hover:text-red-500 flex-shrink-0 text-[10px] font-medium"
                            >
                              Remove
                            </button>
                          )}
                          {isError && (
                            <button className="text-red-500 hover:text-red-700 flex-shrink-0 text-[10px] font-semibold flex items-center gap-0.5">
                              <RefreshCw size={10} />
                              Retry
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Partial: "Need Assistance?" trigger button */}
              {AI_CONFIG.formFill === 'partial' && !chatOpen && (
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center gap-2 self-end bg-white border border-gray-200 shadow-md rounded-2xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:shadow-lg transition-shadow fade-in"
                >
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                      <MessageSquare size={14} className="text-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
                  </div>
                  Need Assistance?
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full: floating inline assistant */}
      {AI_CONFIG.formFill === 'full' && <InlineAssistant />}

      {/* Partial: support chatbot side panel */}
      {AI_CONFIG.formFill === 'partial' && (
        <SupportChatbot open={chatOpen} onClose={() => setChatOpen(false)} />
      )}
    </div>
  );
}
