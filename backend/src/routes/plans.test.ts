import request from 'supertest';
import express from 'express';
import plansRoutes from './plans';
import { Plan } from '../types/plan';

const app = express();
app.use(express.json());
app.use('/plans', plansRoutes);

describe('Plans API', () => {
  describe('GET /plans', () => {
    it('should return status 200', async () => {
      const response = await request(app).get('/plans');
      expect(response.status).toBe(200);
    });

    it('should return an array of plans', async () => {
      const response = await request(app).get('/plans');
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return exactly 20 plans', async () => {
      const response = await request(app).get('/plans');
      expect(response.body).toHaveLength(20);
    });

    it('should return plans with valid structure', async () => {
      const response = await request(app).get('/plans');
      const plans: Plan[] = response.body;
      
      plans.forEach(plan => {
        expect(plan).toHaveProperty('id');
        expect(plan).toHaveProperty('tool');
        expect(plan).toHaveProperty('name');
        expect(plan).toHaveProperty('price');
        expect(plan).toHaveProperty('type');
        expect(plan).toHaveProperty('models');
        expect(plan).toHaveProperty('limits');
        expect(plan).toHaveProperty('features');
        
        expect(typeof plan.id).toBe('string');
        expect(['github-copilot', 'cursor', 'claude-code', 'windsurf']).toContain(plan.tool);
        expect(typeof plan.name).toBe('string');
        expect(typeof plan.price).toBe('number');
        expect(['individual', 'enterprise']).toContain(plan.type);
        expect(Array.isArray(plan.models)).toBe(true);
        expect(typeof plan.limits).toBe('string');
        expect(Array.isArray(plan.features)).toBe(true);
      });
    });

    it('should include all 4 tools', async () => {
      const response = await request(app).get('/plans');
      const plans: Plan[] = response.body;
      const tools = new Set(plans.map(plan => plan.tool));
      
      expect(tools).toContain('github-copilot');
      expect(tools).toContain('cursor');
      expect(tools).toContain('claude-code');
      expect(tools).toContain('windsurf');
    });

    it('should include both individual and enterprise plans', async () => {
      const response = await request(app).get('/plans');
      const plans: Plan[] = response.body;
      const types = new Set(plans.map(plan => plan.type));
      
      expect(types).toContain('individual');
      expect(types).toContain('enterprise');
    });
  });
});
