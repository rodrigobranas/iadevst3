import { usePlans } from './hooks/usePlans';
import { useTheme } from './hooks/useTheme';
import { BudgetSlider } from './components/BudgetSlider';
import { PlanGrid } from './components/PlanGrid';
import { PlanTypeFilter } from './components/PlanTypeFilter';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const {
    isLoading,
    error,
    filteredPlans,
    budget,
    planType,
    setBudget,
    setPlanType,
  } = usePlans();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              AI Plans Comparator
            </h1>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full max-w-xl space-y-6">
            <BudgetSlider value={budget} onChange={setBudget} />
            <div className="flex justify-center">
              <PlanTypeFilter value={planType} onChange={setPlanType} />
            </div>
          </div>
          <div className="w-full">
            <PlanGrid
              plans={filteredPlans}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
