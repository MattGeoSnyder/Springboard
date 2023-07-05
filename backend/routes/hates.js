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

router.post('/', async function(req, res, next) {
  try {
    const hates = JSON.parse(req.body.hates);
    const hateIds = hates.map(hate => hate.id);
    const userId = req.body.userId;
    const query = await Hates.addHates(hateIds, userId);
    return res.status(201).json(Object.values(query));
  } catch (error) {
    next(error);    
  }
});

export default router;