type Petshop = {
  id: string;
  name: string;
  cnpj: string;
  pets: Pet[];
};

type Pet = {
  id: string;
  name: string;
  type: string;
  description: string;
  vaccinated: boolean;
  deadline_vaccination: Date;
  created_at: Date;
};

declare namespace Express {
  export interface Request {
    petshop: Petshop; 
  }
}

  