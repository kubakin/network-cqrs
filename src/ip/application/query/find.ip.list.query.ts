export class FindUserIpListQuery {
  readonly userId: string;
  readonly assignmentId?: string;
  readonly dataCenter?: string;
  readonly family?: number;

  constructor(params: FindUserIpListQuery) {
    Object.assign(this, params);
  }
}
