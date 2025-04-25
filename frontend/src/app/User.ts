const mockAdminEmails = [
  'eduparolin+admin@gmail.com'
]

export type Address = {
  zipCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
}

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
  role: 'ADMIN' | 'USER';
  private password?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    role: 'ADMIN' | 'USER',
    cpf: string,
    phone: string,
    address?: Address,
    password?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.cpf = cpf;
    this.phone = phone;
    this.address = address;
    this.password = password;
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN' || mockAdminEmails.includes(this.email);
  }

  comparePassword(password: string): boolean {
    return this.password === password;
  }

  static fromLocalStorage(): User | null {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? User.fromJson(JSON.parse(savedUser)) : null;
  }

  static fromJson(json: {[key: string]: any}): User {
    return new User(
      json["id"],
      json["name"],
      json["email"],
      json["role"],
      json["cpf"],
      json["phone"],
      json["address"],
      json["password"]
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

  static empty(): User {
    return new User(
      generateRandomString(),
      '',
      '',
      'USER',
      '',
      '',
      undefined,
      undefined
    );
  }
}
