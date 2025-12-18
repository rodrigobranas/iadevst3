export interface Plan {
  id: string;
  tool: 'github-copilot' | 'cursor' | 'claude-code' | 'windsurf';
  name: string;
  price: number;
  type: 'individual' | 'enterprise';
  models: string[];
  limits: string;
  features: string[];
}

export type PlanType = 'individual' | 'enterprise' | 'all';

export type Tool = 'github-copilot' | 'cursor' | 'claude-code' | 'windsurf';
