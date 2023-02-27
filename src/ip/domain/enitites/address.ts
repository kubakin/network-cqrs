export class Address {
  family: number;
  address: string | null;

  constructor(family: number, address?: string) {
    this.family = family;
    this.address = address;
  }
}
