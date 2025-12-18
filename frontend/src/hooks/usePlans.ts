import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Plan, PlanType } from '../types/plan';

const API_URL = 'http://localhost:3000';

interface UsePlansReturn {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  filteredPlans: Plan[];
  budget: number;
  planType: PlanType;
  setBudget: (budget: number) => void;
  setPlanType: (type: PlanType) => void;
}

export function filterPlansByBudget(plans: Plan[], maxBudget: number): Plan[] {
  return plans.filter(plan => plan.price <= maxBudget);
}

export function filterPlansByType(plans: Plan[], type: PlanType): Plan[] {
  if (type === 'all') return plans;
  return plans.filter(plan => plan.type === type);
}

export function sortPlansByPrice(plans: Plan[]): Plan[] {
  return [...plans].sort((a, b) => b.price - a.price);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function usePlans(): UsePlansReturn {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [budget, setBudget] = useState(0);
  const [planType, setPlanType] = useState<PlanType>('all');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get<Plan[]>(`${API_URL}/plans`);
        setPlans(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch plans';
        console.error('Failed to fetch plans', { error: errorMessage });
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    let result = filterPlansByBudget(plans, budget);
    result = filterPlansByType(result, planType);
    result = sortPlansByPrice(result);
    return result;
  }, [plans, budget, planType]);

  const handleSetBudget = useCallback((newBudget: number) => {
    setBudget(newBudget);
  }, []);

  const handleSetPlanType = useCallback((type: PlanType) => {
    setPlanType(type);
  }, []);

  return {
    plans,
    isLoading,
    error,
    filteredPlans,
    budget,
    planType,
    setBudget: handleSetBudget,
    setPlanType: handleSetPlanType,
  };
}
