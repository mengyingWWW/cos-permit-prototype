// Central AI configuration — flip these to derive Partial and Control versions.
// "full"    → full AI assistance active
// "partial" → AI suggests but does not auto-apply
// "manual"  → no AI assistance; standard gov form

export const AI_CONFIG = {
  timeline: 'manual' as 'manual' | 'partial' | 'full',
  formFill: 'manual' as 'manual' | 'partial' | 'full',
  review:   'manual' as 'manual' | 'partial' | 'full',
} as const;
