import { uuid } from 'uuidv4';

class Pessoa {
  id: string;
  nome: string;
  idade: number;
  estadocivil: string;
  cpf: string;
  cidade: string;
  estado: string;

  constructor(
    nome: string,
    idade: number,
    estadocivil: string,
    cpf: string,
    cidade: string,
    estado: string,
  ) {
    this.id = uuid();
    this.nome = nome;
    this.idade = idade;
    this.estadocivil = estadocivil;
    this.cpf = cpf;
    this.cidade = cidade;
    this.estado = estado;
  }
}

export default Pessoa;
