import {Address} from "./address";

function generateRandomString(length: number = 30): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export class User {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  address?: Address;
  email: string;
  roles: ('CLIENTE' | 'FUNCIONARIO')[];
  private password?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    roles: ('CLIENTE' | 'FUNCIONARIO')[],
    cpf: string,
    phone: string,
    address?: Address,
    password?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.cpf = cpf;
    this.phone = phone;
    this.address = address;
    this.password = password;
  }

  isFuncionario(): boolean {
    return this.roles.includes('FUNCIONARIO');
  }

  isCliente(): boolean {
    return this.roles.includes('CLIENTE');
  }

  static fromLocalStorage(): User | null {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? User.fromJson(JSON.parse(savedUser)) : null;
  }

  static fromJson(json: { [key: string]: any }): User {
    return new User(
      json['id'],
      json['name'],
      json['email'],
      json['roles'],
      json['cpf'],
      json['phone'],
      Address.fromJson(json['address']),
      json['password']
    );
  }

  static saveToLocalStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setAddress(address: Address): void {
    this.address = address;
  }

  toJson(): { [key: string]: any } {
    return {
      // id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles,
      cpf: this.cpf,
      phone: this.phone,
      address: this.address ? this.address.toJson() : undefined,
      password: this.password
    };

  }

  static empty(): User {
    return new User(
      generateRandomString(),
      '',
      '',
      ['FUNCIONARIO'],
      '',
      '',
      undefined,
      undefined
    );
  }
}
