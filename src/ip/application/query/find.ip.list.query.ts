import { AssignmentType } from '../../domain/enitites/assignment';

export class FindIpListQuery {
  readonly userId?: string;
  readonly assignmentId?: string;
  readonly assignmentType?: AssignmentType;

  constructor(params: FindIpListQuery) {
    Object.assign(this, params);
  }
}
