export class FindUserPrefixQuery {
  readonly id: string;
  readonly userId: string;

  constructor(params: FindUserPrefixQuery) {
    Object.assign(this, params);
  }
}
