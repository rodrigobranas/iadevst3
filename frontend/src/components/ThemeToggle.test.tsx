import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('should render the toggle button', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have correct aria-label for light mode', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode'
    );
  });

  it('should have correct aria-label for dark mode', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode'
    );
  });

  it('should call onToggle when clicked', () => {
    const handleToggle = jest.fn();
    render(<ThemeToggle theme="light" onToggle={handleToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
