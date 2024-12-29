import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { petshops } from '../data/petshops';

const router = Router();

const validateCNPJ = (cnpj: string) => {
    const cnpjRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
    return cnpjRegex.test(cnpj);
};

router.post('/petshops', (req: Request, res: any) => { // response não consegue ser tipado
  const { name, cnpj } = req.body;

  if (!name || !cnpj) {
    return res.status(400).json({ error: 'Name e cnpj são obrigatórios' });
  }

  if (!validateCNPJ(cnpj)) {
    return res.status(400).json({ error: 'CNPJ inválido' });
  }

  const existingPetshop = petshops.find(p => p.cnpj === cnpj);

  if (existingPetshop) {
    return res.status(409).json({ error: 'CNPJ já cadastrado' });
  }

  const newPetshop: Petshop = {
    id: uuidv4(),
    name,
    cnpj,
    pets: []
  };

  petshops.push(newPetshop);
  return res.status(201).json(newPetshop);
});

export default router;
