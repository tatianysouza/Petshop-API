import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount';
import { Pet } from '../types';

const router = Router();

router.use(checkExistsUserAccount);

router.post('/pets', (req: Request, res: any) => {
  const { name, type, description, deadline_vaccination } = req.body;
  const petshop = req.petshop;

  const newPet: Pet = {
    id: uuidv4(),
    name,
    type,
    description,
    vaccinated: false,
    deadline_vaccination: new Date(deadline_vaccination),
    created_at: new Date()
  };

  petshop.pets.push(newPet);
  return res.status(201).json(newPet);
});

export default router;
