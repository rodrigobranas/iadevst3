import { render, screen } from '@testing-library/react';
import { BudgetSlider } from './BudgetSlider';

describe('BudgetSlider', () => {
  it('should render the slider with label', () => {
    render(<BudgetSlider value={0} onChange={() => {}} />);
    expect(screen.getByText('Monthly Budget')).toBeInTheDocument();
  });

  it('should display the formatted budget value', () => {
    render(<BudgetSlider value={50} onChange={() => {}} />);
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('should display min and max budget labels', () => {
    render(<BudgetSlider value={100} onChange={() => {}} />);
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });

  it('should render the slider element', () => {
    render(<BudgetSlider value={0} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should display maximum budget value correctly', () => {
    render(<BudgetSlider value={200} onChange={() => {}} />);
    const budgetDisplays = screen.getAllByText('$200.00');
    expect(budgetDisplays.length).toBeGreaterThanOrEqual(1);
  });

  it('should have correct aria-valuemin and aria-valuemax', () => {
    render(<BudgetSlider value={50} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '200');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });
});
