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
