import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount';
import { Pet } from '../types';

const router = Router();

router.use(checkExistsUserAccount);

// rota para criar pet
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

// rota para listar os pets
router.get('/pets', (req: Request, res: any) => {
  const petshop = req.petshop;

  if (!petshop) {
    return res.status(404).json({ error: 'User not exists' });
  }

  return res.status(200).json(petshop.pets);
});

// rota para alterar dados de um pet
router.put('/pets/:id', (req: Request, res: any) => {
  const { id } = req.params;
  const { name, type, description, deadline_vaccination } = req.body;
  const petshop = req.petshop;

  const pet = petshop.pets.find((pet) => pet.id === id);

  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  if (name) pet.name = name;
  if (type) pet.type = type;
  if (description) pet.description = description;
  if (deadline_vaccination) pet.deadline_vaccination = new Date(deadline_vaccination);

  return res.status(200).json(pet);
});

// rota para vacinar um pet
router.patch('/pets/:id/vaccinated', (req: Request, res: any) => {
  const { id } = req.params;
  const petshop = req.petshop;

  const pet = petshop.pets.find((p) => p.id === id);

  if (!pet) {
    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  pet.vaccinated = true;

  return res.status(200).json(pet);
});

export default router;
