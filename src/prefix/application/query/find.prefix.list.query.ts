export class FindUserPrefixListQuery {
  readonly userId: string;
  readonly dataCenter?: string;

  constructor(params: FindUserPrefixListQuery) {
    Object.assign(this, params);
  }
}
