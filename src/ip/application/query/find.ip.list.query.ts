export class FindIpListQuery {
  readonly userId?: string;
  readonly assignmentId?: string;
  readonly assignmentType?: string;

  constructor(params: FindIpListQuery) {
    Object.assign(this, params);
  }
}
