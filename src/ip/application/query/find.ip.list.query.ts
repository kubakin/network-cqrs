import { AssignmentType } from '../../domain/enitites/assignment';

export class FindUserIpListQuery {
  readonly userId: string;
  readonly assignmentId?: string;
  readonly assignmentType?: AssignmentType;

  constructor(params: FindUserIpListQuery) {
    Object.assign(this, params);
  }
}
