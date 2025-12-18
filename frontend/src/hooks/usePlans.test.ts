import { filterPlansByBudget, filterPlansByType, sortPlansByPrice, formatCurrency } from './usePlans';
import { Plan } from '../types/plan';

const mockPlans: Plan[] = [
  {
    id: 'plan-free',
    tool: 'github-copilot',
    name: 'Free',
    price: 0,
    type: 'individual',
    models: ['GPT-4o'],
    limits: 'Limited',
    features: ['Basic'],
  },
  {
    id: 'plan-pro',
    tool: 'cursor',
    name: 'Pro',
    price: 20,
    type: 'individual',
    models: ['GPT-4', 'Claude'],
    limits: 'Unlimited',
    features: ['Advanced'],
  },
  {
    id: 'plan-enterprise',
    tool: 'windsurf',
    name: 'Enterprise',
    price: 60,
    type: 'enterprise',
    models: ['All'],
    limits: '1000 credits',
    features: ['SSO', 'Admin'],
  },
  {
    id: 'plan-max',
    tool: 'claude-code',
    name: 'Max',
    price: 200,
    type: 'individual',
    models: ['Claude 4'],
    limits: 'Highest',
    features: ['All features'],
  },
];

describe('filterPlansByBudget', () => {
  it('should return plans with price <= budget', () => {
    const result = filterPlansByBudget(mockPlans, 50);
    expect(result).toHaveLength(2);
    expect(result.every(p => p.price <= 50)).toBe(true);
  });

  it('should return empty array when no plans match', () => {
    const result = filterPlansByBudget(mockPlans.filter(p => p.price > 0), 0);
    expect(result).toHaveLength(0);
  });

  it('should return all plans when budget is 200', () => {
    const result = filterPlansByBudget(mockPlans, 200);
    expect(result).toHaveLength(4);
  });

  it('should include free plans when budget is 0', () => {
    const result = filterPlansByBudget(mockPlans, 0);
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(0);
  });
});

describe('filterPlansByType', () => {
  it('should filter only individual plans', () => {
    const result = filterPlansByType(mockPlans, 'individual');
    expect(result).toHaveLength(3);
    expect(result.every(p => p.type === 'individual')).toBe(true);
  });

  it('should filter only enterprise plans', () => {
    const result = filterPlansByType(mockPlans, 'enterprise');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('enterprise');
  });

  it('should return all plans when type is all', () => {
    const result = filterPlansByType(mockPlans, 'all');
    expect(result).toHaveLength(4);
  });
});

describe('sortPlansByPrice', () => {
  it('should sort plans in descending order by price', () => {
    const result = sortPlansByPrice(mockPlans);
    expect(result[0].price).toBe(200);
    expect(result[1].price).toBe(60);
    expect(result[2].price).toBe(20);
    expect(result[3].price).toBe(0);
  });

  it('should not mutate the original array', () => {
    const original = [...mockPlans];
    sortPlansByPrice(mockPlans);
    expect(mockPlans).toEqual(original);
  });
});

describe('formatCurrency', () => {
  it('should format as USD with 2 decimal places', () => {
    expect(formatCurrency(50)).toBe('$50.00');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should format large numbers correctly', () => {
    expect(formatCurrency(200)).toBe('$200.00');
  });

  it('should handle decimal values', () => {
    expect(formatCurrency(19.99)).toBe('$19.99');
  });
});
