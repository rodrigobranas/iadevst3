import { Router, Request, Response } from 'express';
import plansData from '../data/plans.json';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  try {
    console.log('Plans requested', { count: plansData.length });
    res.status(200).json(plansData);
  } catch (error) {
    console.error('Failed to load plans', { error });
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to load plans data'
    });
  }
});

export default router;
