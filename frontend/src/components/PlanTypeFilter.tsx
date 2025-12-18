import { PlanType } from '../types/plan';
import { cn } from '@/lib/utils';

interface PlanTypeFilterProps {
  value: PlanType;
  onChange: (type: PlanType) => void;
}

const OPTIONS: { value: PlanType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'individual', label: 'Individual' },
  { value: 'enterprise', label: 'Enterprise' },
];

export function PlanTypeFilter({ value, onChange }: PlanTypeFilterProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-secondary p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
          data-testid={`filter-${option.value}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
