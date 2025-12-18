import { Slider } from './ui/slider';
import { formatCurrency } from '../hooks/usePlans';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const MIN_BUDGET = 0;
const MAX_BUDGET = 200;
const STEP = 10;

export function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">
          Monthly Budget
        </label>
        <span className="text-2xl font-bold text-foreground">
          {formatCurrency(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={handleValueChange}
        min={MIN_BUDGET}
        max={MAX_BUDGET}
        step={STEP}
        aria-label="Budget slider"
        data-testid="budget-slider"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatCurrency(MIN_BUDGET)}</span>
        <span>{formatCurrency(MAX_BUDGET)}</span>
      </div>
    </div>
  );
}
