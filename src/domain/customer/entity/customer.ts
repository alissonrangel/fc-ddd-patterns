import Address from "../value-object/address";

// entidade é algo único, tem um id, mas os outros atribts podem ser alterados
// entidade anêmica, só carrega dados, sem regras de negócio
// cria isso por causa do ORM, entidade focada em persistência
// entidade sempre vai ter que representar o estado atual e correto do elemento
// uma entidade por padrão ela sempre vai ter que se autovalidar
// entidade focada em negócio, carrega as regras de negócio, formas de mudar o comportamento, aplicando validações, fórmulas
// o estado atual da minha entidade deve estar sempre correto
// A entidade sempre vai ter que representar o estado correto e atual do elemento
// uma entidade por padrão, ela sempre vai ter que se autovalidar
/**
 * Duas entidades:
 * - `entidade focada em persistência` - complexidade acidental
 * - `entidade focada em negócio` - complexidADE  de negócio
 */
export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  // um motivo de negócio
  changeName(name: string) {
    this._name = name;
    this.validate(); // não estou dando change para minha entidade fique inválida
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}

let customer = new Customer("123"); //-> Errado, os dados têm que estar consistentes 100% das vezes
// tem que confiar 100% da vezes que os campos estão consistentes
