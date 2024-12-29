import express, { Request, Response, NextFunction } from 'express';
import petshopsRoutes from './routes/petshops';
import petsRoutes from './routes/pets';

const app = express();
app.use(express.json());

app.use(petshopsRoutes);
app.use(petsRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno no servidor', message: err.message });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
