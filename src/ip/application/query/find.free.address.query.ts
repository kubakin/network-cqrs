export class FindFreeAddressQuery {
  dataCenterName?: string;
  family?: number;
  prefix?: string;

  constructor(params: FindFreeAddressQuery) {
    Object.assign(this, params);
  }
}
