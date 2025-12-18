import { render, screen } from '@testing-library/react';
import { PlanGrid } from './PlanGrid';
import { Plan } from '../types/plan';

const mockPlans: Plan[] = [
  {
    id: 'github-plan',
    tool: 'github-copilot',
    name: 'Pro',
    price: 10,
    type: 'individual',
    models: ['GPT-4o'],
    limits: 'Unlimited',
    features: ['Code completion'],
  },
  {
    id: 'cursor-plan',
    tool: 'cursor',
    name: 'Pro',
    price: 20,
    type: 'individual',
    models: ['GPT-4'],
    limits: 'Unlimited',
    features: ['AI completions'],
  },
];

describe('PlanGrid', () => {
  it('should render all 4 tool columns', () => {
    render(<PlanGrid plans={[]} isLoading={false} error={null} />);
    expect(screen.getByText('GitHub Copilot')).toBeInTheDocument();
    expect(screen.getByText('Cursor')).toBeInTheDocument();
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
    expect(screen.getByText('Windsurf')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<PlanGrid plans={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading plans...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    render(<PlanGrid plans={[]} isLoading={false} error="Failed to load" />);
    expect(screen.getByText('Error loading plans')).toBeInTheDocument();
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('should render plans in correct columns', () => {
    render(<PlanGrid plans={mockPlans} isLoading={false} error={null} />);
    expect(screen.getByText('GitHub Copilot')).toBeInTheDocument();
    expect(screen.getByText('Cursor')).toBeInTheDocument();
  });

  it('should show empty state message when no plans in a column', () => {
    render(<PlanGrid plans={[]} isLoading={false} error={null} />);
    const emptyMessages = screen.getAllByText('No plans available within budget');
    expect(emptyMessages.length).toBe(4);
  });

  it('should render plan cards for each plan', () => {
    render(<PlanGrid plans={mockPlans} isLoading={false} error={null} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });
});
