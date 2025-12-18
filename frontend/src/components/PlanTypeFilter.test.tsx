import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { PlanTypeFilter } from './PlanTypeFilter';

describe('PlanTypeFilter', () => {
  it('should render all filter options', () => {
    render(<PlanTypeFilter value="all" onChange={() => {}} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Individual')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('should highlight the selected option', () => {
    render(<PlanTypeFilter value="individual" onChange={() => {}} />);
    const individualButton = screen.getByText('Individual');
    expect(individualButton).toHaveClass('bg-background');
  });

  it('should call onChange when clicking a different option', () => {
    const handleChange = jest.fn();
    render(<PlanTypeFilter value="all" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Individual'));
    expect(handleChange).toHaveBeenCalledWith('individual');
  });

  it('should call onChange with enterprise when clicking Enterprise', () => {
    const handleChange = jest.fn();
    render(<PlanTypeFilter value="all" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Enterprise'));
    expect(handleChange).toHaveBeenCalledWith('enterprise');
  });

  it('should call onChange with all when clicking All', () => {
    const handleChange = jest.fn();
    render(<PlanTypeFilter value="individual" onChange={handleChange} />);
    fireEvent.click(screen.getByText('All'));
    expect(handleChange).toHaveBeenCalledWith('all');
  });
});
