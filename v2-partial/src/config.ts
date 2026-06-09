// Central AI configuration — flip these to derive Partial and Control versions.
// "full"    → full AI assistance active
// "partial" → AI suggests but does not auto-apply
// "manual"  → no AI assistance; standard gov form

export const AI_CONFIG = {
  timeline: 'partial' as 'manual' | 'partial' | 'full',
  formFill: 'partial' as 'manual' | 'partial' | 'full',
  review:   'partial' as 'manual' | 'partial' | 'full',
} as const;
