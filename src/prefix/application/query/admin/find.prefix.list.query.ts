export class FindAdminPrefixListQuery {
  readonly status?: string;
  readonly page?: number;
  readonly size?: number;

  constructor(params: FindAdminPrefixListQuery) {
    Object.assign(this, params);
  }
}
