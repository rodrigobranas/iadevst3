import { render, screen } from '@testing-library/react';
import { PlanCard } from './PlanCard';
import { Plan } from '../types/plan';

const mockPlan: Plan = {
  id: 'test-plan',
  tool: 'github-copilot',
  name: 'Pro',
  price: 20,
  type: 'individual',
  models: ['GPT-4o', 'Claude 3.5'],
  limits: '500 requests/month',
  features: ['Code completion', 'Chat support', 'Multi-file editing'],
};

const freePlan: Plan = {
  id: 'free-plan',
  tool: 'cursor',
  name: 'Free',
  price: 0,
  type: 'individual',
  models: ['cursor-small'],
  limits: 'Limited usage',
  features: ['Basic features'],
};

const enterprisePlan: Plan = {
  id: 'enterprise-plan',
  tool: 'windsurf',
  name: 'Enterprise',
  price: 60,
  type: 'enterprise',
  models: ['All models'],
  limits: '1000 credits',
  features: ['SSO', 'Admin dashboard', 'Priority support', 'Custom features'],
};

describe('PlanCard', () => {
  it('should render plan name', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should render plan price formatted as currency', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  it('should render "Free" for zero price plans', () => {
    render(<PlanCard plan={freePlan} />);
    const freeTexts = screen.getAllByText('Free');
    expect(freeTexts.length).toBeGreaterThanOrEqual(1);
  });

  it('should render plan models', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('GPT-4o')).toBeInTheDocument();
    expect(screen.getByText('Claude 3.5')).toBeInTheDocument();
  });

  it('should render plan limits', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('500 requests/month')).toBeInTheDocument();
  });

  it('should render up to 3 features', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('• Code completion')).toBeInTheDocument();
    expect(screen.getByText('• Chat support')).toBeInTheDocument();
    expect(screen.getByText('• Multi-file editing')).toBeInTheDocument();
  });

  it('should show "+N more" when there are more than 3 features', () => {
    render(<PlanCard plan={enterprisePlan} />);
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('should display Individual badge for individual plans', () => {
    render(<PlanCard plan={mockPlan} />);
    const badge = screen.getByText('Individual');
    expect(badge).toHaveClass('bg-blue-100');
  });

  it('should display Enterprise badge for enterprise plans', () => {
    render(<PlanCard plan={enterprisePlan} />);
    const badges = screen.getAllByText('Enterprise');
    const typeBadge = badges.find(el => el.classList.contains('bg-purple-100'));
    expect(typeBadge).toBeInTheDocument();
  });

  it('should show "+N" when there are more than 3 models', () => {
    const planWithManyModels: Plan = {
      ...mockPlan,
      models: ['GPT-4', 'GPT-4o', 'Claude 3.5', 'Gemini', 'o1'],
    };
    render(<PlanCard plan={planWithManyModels} />);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
