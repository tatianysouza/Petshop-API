export type Pet = {
    id: string;
    name: string;
    type: string;
    description: string;
    vaccinated: boolean;
    deadline_vaccination: Date;
    created_at: Date;
};
  
export type Petshop = {
    id: string;
    name: string;
    cnpj: string;
    pets: Pet[];
};
  