import { Plan } from '../types/plan';
import { formatCurrency } from '../hooks/usePlans';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: Plan;
  extraHeight?: number;
}

interface TierBadgeConfig {
  bg: string;
  text: string;
  border: string;
}

const TIER_BADGE_STYLES: Record<string, TierBadgeConfig> = {
  free: { bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400', border: 'border-green-500/30' },
  hobby: { bg: 'bg-green-500/10', text: 'text-green-600 dark:text-green-400', border: 'border-green-500/30' },
  pro: { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/30' },
  'pro+': { bg: 'bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/30' },
  'max 5x': { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/30' },
  'max 20x': { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/30' },
  ultra: { bg: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/30' },
  business: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/30' },
  enterprise: { bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/30' },
  team: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/30' },
  teams: { bg: 'bg-orange-500/10', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/30' },
};

const DEFAULT_TIER_STYLE: TierBadgeConfig = {
  bg: 'bg-gray-500/10',
  text: 'text-gray-600 dark:text-gray-400',
  border: 'border-gray-500/30',
};

function getTierBadgeStyle(planName: string): TierBadgeConfig {
  const normalizedName = planName.toLowerCase();
  return TIER_BADGE_STYLES[normalizedName] || DEFAULT_TIER_STYLE;
}

export function PlanCard({ plan, extraHeight = 0 }: PlanCardProps) {
  const tierStyle = getTierBadgeStyle(plan.name);
  return (
    <div
      className="bg-card rounded-gh border border-border p-4 gh-card-hover"
      data-testid="plan-card"
      data-plan-price={plan.price}
      style={{ paddingBottom: extraHeight > 0 ? `${16 + extraHeight}px` : undefined }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-md border',
            tierStyle.bg,
            tierStyle.text,
            tierStyle.border
          )}
          data-testid="tier-badge"
        >
          {plan.name}
        </span>
        <span className="text-lg font-bold font-mono text-primary" data-testid="plan-price">
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
                className="text-xs bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground font-mono"
              >
                {model}
              </span>
            ))}
            {plan.models.length > 3 && (
              <span className="text-xs bg-secondary px-2 py-0.5 rounded-md text-secondary-foreground font-mono">
                +{plan.models.length - 3}
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Limits
          </p>
          <p className="text-sm text-foreground font-mono line-clamp-2">{plan.limits}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Features
          </p>
          <ul className="text-sm text-foreground space-y-0.5">
            {plan.features.slice(0, 3).map((feature) => (
              <li key={feature} className="truncate flex items-center gap-1">
                <span className="text-green-500 dark:text-green-400">✓</span>
                <span>{feature}</span>
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
            'text-xs font-medium px-2 py-1 rounded-md border',
            plan.type === 'individual'
              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
              : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
          )}
          data-testid="plan-type"
        >
          {plan.type === 'individual' ? 'Individual' : 'Enterprise'}
        </span>
      </div>
    </div>
  );
}
