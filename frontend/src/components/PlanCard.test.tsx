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
  it('should render plan name in tier badge', () => {
    render(<PlanCard plan={mockPlan} />);
    const tierBadge = screen.getByTestId('tier-badge');
    expect(tierBadge).toHaveTextContent('Pro');
  });

  it('should apply correct tier color class based on plan name', () => {
    render(<PlanCard plan={mockPlan} />);
    const tierBadge = screen.getByTestId('tier-badge');
    expect(tierBadge).toHaveClass('bg-blue-500/10');
    expect(tierBadge).toHaveClass('text-blue-600');
  });

  it('should apply green tier color for free plans', () => {
    render(<PlanCard plan={freePlan} />);
    const tierBadge = screen.getByTestId('tier-badge');
    expect(tierBadge).toHaveClass('bg-green-500/10');
    expect(tierBadge).toHaveClass('text-green-600');
  });

  it('should render plan price formatted as currency with monospace font', () => {
    render(<PlanCard plan={mockPlan} />);
    const priceElement = screen.getByTestId('plan-price');
    expect(priceElement).toHaveTextContent('$20.00');
    expect(priceElement).toHaveClass('font-mono');
  });

  it('should render "Free" for zero price plans', () => {
    render(<PlanCard plan={freePlan} />);
    const priceElement = screen.getByTestId('plan-price');
    expect(priceElement).toHaveTextContent('Free');
  });

  it('should render plan models with monospace font', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('GPT-4o')).toBeInTheDocument();
    expect(screen.getByText('Claude 3.5')).toBeInTheDocument();
    expect(screen.getByText('GPT-4o')).toHaveClass('font-mono');
  });

  it('should render plan limits with monospace font', () => {
    render(<PlanCard plan={mockPlan} />);
    const limitsElement = screen.getByText('500 requests/month');
    expect(limitsElement).toBeInTheDocument();
    expect(limitsElement).toHaveClass('font-mono');
  });

  it('should render up to 3 features with checkmark icons', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('Code completion')).toBeInTheDocument();
    expect(screen.getByText('Chat support')).toBeInTheDocument();
    expect(screen.getByText('Multi-file editing')).toBeInTheDocument();
    const checkmarks = screen.getAllByText('✓');
    expect(checkmarks.length).toBe(3);
  });

  it('should show "+N more" when there are more than 3 features', () => {
    render(<PlanCard plan={enterprisePlan} />);
    expect(screen.getByText('+1 more')).toBeInTheDocument();
  });

  it('should display Individual badge for individual plans', () => {
    render(<PlanCard plan={mockPlan} />);
    const badge = screen.getByTestId('plan-type');
    expect(badge).toHaveTextContent('Individual');
    expect(badge).toHaveClass('bg-blue-500/10');
  });

  it('should display Enterprise badge for enterprise plans', () => {
    render(<PlanCard plan={enterprisePlan} />);
    const badge = screen.getByTestId('plan-type');
    expect(badge).toHaveTextContent('Enterprise');
    expect(badge).toHaveClass('bg-purple-500/10');
  });

  it('should show "+N" when there are more than 3 models', () => {
    const planWithManyModels: Plan = {
      ...mockPlan,
      models: ['GPT-4', 'GPT-4o', 'Claude 3.5', 'Gemini', 'o1'],
    };
    render(<PlanCard plan={planWithManyModels} />);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('should apply hover state classes', () => {
    render(<PlanCard plan={mockPlan} />);
    const card = screen.getByTestId('plan-card');
    expect(card).toHaveClass('gh-card-hover');
  });

  it('should render badge with correct styling', () => {
    render(<PlanCard plan={mockPlan} />);
    const tierBadge = screen.getByTestId('tier-badge');
    expect(tierBadge).toHaveClass('rounded-md');
    expect(tierBadge).toHaveClass('border');
  });
});
