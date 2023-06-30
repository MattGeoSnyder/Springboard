import Prompt from '../models/prompt.js';
import express from 'express';
import ExpressError from '../helpers/expressError.js';

const router = new express.Router();

router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.queryAllPrompts();
    return res.json(prompts);
  } catch (error) {
    next(error);
  } 
});

router.get('/:prompt_id', async (req, res, next) => {
  const { prompt_id } = req.params;

  try {
    const prompt = await Prompt.queryPrompt(prompt_id);
    if (!prompt) throw new ExpressError('Prompt not found', 403);
    return res.json(prompt);
  } catch (error) {
    
  }
});

export default router;