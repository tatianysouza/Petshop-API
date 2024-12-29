import { Request, Response, NextFunction, RequestHandler } from 'express';
import { petshops } from '../data/petshops';

const checkExistsUserAccount: RequestHandler = (req, res, next) => {
  const cnpj = req.headers.cnpj as string;

  if (!cnpj) {
    res.status(400).json({ error: 'CNPJ não fornecido nos headers' });
    return; 
  }

  const petshop = petshops.find(p => p.cnpj === cnpj);

  if (!petshop) {
    res.status(404).json({ error: 'Petshop não encontrado' });
    return; 
  }

  req.petshop = petshop;
  next(); 
};

export default checkExistsUserAccount;
