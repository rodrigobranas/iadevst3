import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
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
}

interface CardExtraHeight {
  [cardId: string]: number;
}

const TOOLS: ToolConfig[] = [
  { id: 'github-copilot', name: 'GitHub Copilot' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'windsurf', name: 'Windsurf' },
];

const GAP_SIZE = 16;

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

function calculateCardExtraHeights(
  groupedPlans: Record<Tool, Plan[]>,
  cardRefs: React.MutableRefObject<Map<string, HTMLDivElement>>
): CardExtraHeight {
  const columnData: { tool: Tool; cards: { id: string; naturalHeight: number }[]; totalHeight: number }[] = [];
  TOOLS.forEach((tool) => {
    const toolPlans = groupedPlans[tool.id];
    if (toolPlans.length === 0) return;
    const cards: { id: string; naturalHeight: number }[] = [];
    let totalHeight = 0;
    toolPlans.forEach((plan) => {
      const wrapperEl = cardRefs.current.get(plan.id);
      if (wrapperEl) {
        const cardEl = wrapperEl.querySelector('[data-testid="plan-card"]') as HTMLElement;
        if (cardEl) {
          const style = cardEl.style.paddingBottom;
          cardEl.style.paddingBottom = '';
          const naturalHeight = cardEl.offsetHeight;
          cardEl.style.paddingBottom = style;
          cards.push({ id: plan.id, naturalHeight });
          totalHeight += naturalHeight;
        }
      }
    });
    const gaps = (toolPlans.length - 1) * GAP_SIZE;
    columnData.push({ tool: tool.id, cards, totalHeight: totalHeight + gaps });
  });
  if (columnData.length < 2) return {};
  const maxHeight = Math.max(...columnData.map((c) => c.totalHeight));
  const extraHeights: CardExtraHeight = {};
  columnData.forEach((column) => {
    const deficit = maxHeight - column.totalHeight;
    if (deficit > 0 && column.cards.length > 0) {
      const extraPerCard = Math.floor(deficit / column.cards.length);
      const remainder = deficit % column.cards.length;
      column.cards.forEach((card, index) => {
        extraHeights[card.id] = extraPerCard + (index < remainder ? 1 : 0);
      });
    }
  });
  return extraHeights;
}

export function PlanGrid({ plans, isLoading, error }: PlanGridProps) {
  const groupedPlans = useMemo(() => groupPlansByTool(plans), [plans]);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [cardExtraHeights, setCardExtraHeights] = useState<CardExtraHeight>({});
  const setCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  }, []);
  useEffect(() => {
    setCardExtraHeights({});
    const timeoutId = setTimeout(() => {
      const extraHeights = calculateCardExtraHeights(groupedPlans, cardRefs);
      setCardExtraHeights(extraHeights);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [groupedPlans]);

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
    <div className="w-full" data-testid="plan-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 grid-rows-[auto_1fr]">
        {TOOLS.map((tool) => (
          <div key={tool.id} className="flex flex-col" data-testid="tool-column">
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-3 z-10 border-b border-border">
              <h2 className="text-lg font-bold text-foreground text-center">
                {tool.name}
              </h2>
            </div>
            <div className="flex-1 flex flex-col gap-4 pt-4 min-h-[200px]">
              {groupedPlans[tool.id].length > 0 ? (
                groupedPlans[tool.id].map((plan, index) => (
                  <div
                    key={plan.id}
                    ref={(el) => setCardRef(plan.id, el)}
                    className="gh-fade-in gh-reposition"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PlanCard plan={plan} extraHeight={cardExtraHeights[plan.id] || 0} />
                  </div>
                ))
              ) : (
                <div className="flex-1 flex items-center justify-center min-h-[200px] border border-dashed border-border rounded-gh" data-testid="empty-column">
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
