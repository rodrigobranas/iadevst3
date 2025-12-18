import { useMemo } from 'react';
import { Plan, Tool } from '../types/plan';
import { PlanCard } from './PlanCard';

interface PlanGridProps {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
}

interface ToolConfig {
  id: Tool;
  name: string;
  logo?: string;
}

const TOOLS: ToolConfig[] = [
  { id: 'github-copilot', name: 'GitHub Copilot' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'windsurf', name: 'Windsurf' },
];

function groupPlansByTool(plans: Plan[]): Record<Tool, Plan[]> {
  const grouped: Record<Tool, Plan[]> = {
    'github-copilot': [],
    cursor: [],
    'claude-code': [],
    windsurf: [],
  };
  plans.forEach((plan) => {
    grouped[plan.tool].push(plan);
  });
  return grouped;
}

export function PlanGrid({ plans, isLoading, error }: PlanGridProps) {
  const groupedPlans = useMemo(() => groupPlansByTool(plans), [plans]);

  if (isLoading) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        <p className="mt-4 text-muted-foreground">Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-destructive font-medium">Error loading plans</p>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="space-y-4">
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-3 z-10 border-b border-border">
              <h2 className="text-lg font-bold text-foreground text-center">
                {tool.name}
              </h2>
            </div>
            <div className="space-y-4 min-h-[200px]">
              {groupedPlans[tool.id].length > 0 ? (
                groupedPlans[tool.id].map((plan) => (
                  <div
                    key={plan.id}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <PlanCard plan={plan} />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-[200px] border border-dashed border-border rounded-lg">
                  <p className="text-sm text-muted-foreground text-center px-4">
                    No plans available within budget
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
