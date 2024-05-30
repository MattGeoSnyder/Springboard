import express from 'express';
import Hates from '../models/hates.js'

const router = new express.Router();

router.get('/', async (req, res, next) => {
  const hates = await Hates.getAllHates();
  return res.json(hates);
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const hate = await Hates.getHateById(id);
  return res.json(hate);
});

export default router;