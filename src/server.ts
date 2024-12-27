import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

let petshops: any[] = [];

const validateCNPJ = (cnpj: string) => {
  const cnpjRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
  return cnpjRegex.test(cnpj);
};

app.post('/petshops', (req: Request, res: any) => { // response não consegue ser tipado
  const { name, cnpj } = req.body;

  if (!validateCNPJ(cnpj)) {
    return res.status(400).json({ error: 'CNPJ inválido' });
  }

  const existingPetshop = petshops.find(petshop => petshop.cnpj === cnpj);
  if (existingPetshop) {
    return res.status(400).json({ error: 'CNPJ já cadastrado' });
  }

  const newPetshop = {
    id: uuidv4(),
    name,
    cnpj,
    pets: []
  };

  petshops.push(newPetshop);
  return res.status(201).json(newPetshop);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
