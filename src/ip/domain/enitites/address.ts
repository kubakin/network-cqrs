import * as IPCIDR from 'ip-cidr';
import { BadRequestException } from '@nestjs/common';

export class Address {
  family: number;
  address: string | null;

  constructor(family: number, address?: string) {
    this.family = family;
    this.address = address;
  }

  static create(address: string, prefix?: string) {
    const cidr = IPCIDR.createAddress(address);
    if (!cidr.isCorrect()) throw new BadRequestException('Not valid ip');
    const family = cidr.v4 ? 4 : 6;

    if (prefix) {
      const prefixCidr = new IPCIDR(prefix);
      if (!prefixCidr.contains(address)) {
        throw new BadRequestException('prefix not contain address');
      }
    }

    return new Address(family, address);
  }
}
