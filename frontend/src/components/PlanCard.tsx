import { Plan } from '../types/plan';
import { formatCurrency } from '../hooks/usePlans';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: Plan;
}

const PLAN_TIER_COLORS: Record<string, string> = {
  free: 'border-l-green-500',
  hobby: 'border-l-green-500',
  pro: 'border-l-blue-500',
  'pro+': 'border-l-indigo-500',
  'max 5x': 'border-l-purple-500',
  'max 20x': 'border-l-pink-500',
  ultra: 'border-l-pink-500',
  business: 'border-l-orange-500',
  enterprise: 'border-l-red-500',
  team: 'border-l-orange-500',
  teams: 'border-l-orange-500',
};

function getPlanTierColor(planName: string): string {
  const normalizedName = planName.toLowerCase();
  return PLAN_TIER_COLORS[normalizedName] || 'border-l-gray-500';
}

export function PlanCard({ plan }: PlanCardProps) {
  const tierColor = getPlanTierColor(plan.name);
  return (
    <div
      className={cn(
        'bg-card rounded-lg border border-border p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border-l-4',
        tierColor
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-foreground">{plan.name}</h3>
        <span className="text-xl font-bold text-primary">
          {plan.price === 0 ? 'Free' : formatCurrency(plan.price)}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Models
          </p>
          <div className="flex flex-wrap gap-1">
            {plan.models.slice(0, 3).map((model) => (
              <span
                key={model}
                className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground"
              >
                {model}
              </span>
            ))}
            {plan.models.length > 3 && (
              <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">
                +{plan.models.length - 3}
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Limits
          </p>
          <p className="text-sm text-foreground line-clamp-2">{plan.limits}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Features
          </p>
          <ul className="text-sm text-foreground space-y-0.5">
            {plan.features.slice(0, 3).map((feature) => (
              <li key={feature} className="truncate">
                • {feature}
              </li>
            ))}
            {plan.features.length > 3 && (
              <li className="text-muted-foreground text-xs">
                +{plan.features.length - 3} more
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <span
          className={cn(
            'text-xs font-medium px-2 py-1 rounded-full',
            plan.type === 'individual'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
          )}
        >
          {plan.type === 'individual' ? 'Individual' : 'Enterprise'}
        </span>
      </div>
    </div>
  );
}
