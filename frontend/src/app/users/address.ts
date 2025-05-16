export class Address {
  zipCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  complement?: string;

  constructor(
    zipCode: string,
    street: string,
    neighborhood: string,
    city: string,
    state: string,
    number: string,
    complement?: string
  ) {
    this.zipCode = zipCode;
    this.street = street;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.number = number;
    this.complement = complement;
  }

  static fromJson(json: { [key: string]: any }): Address {
    return new Address(
      json['zipCode'],
      json['street'],
      json['neighborhood'],
      json['city'],
      json['state'],
      json['number'],
      json['complement']
    );
  }

  static empty(): Address {
    return new Address('', '', '', '', '', '', '');
  }
}
