import { AssignmentType } from '../../domain/enitites/assignment';

export class IpCreateDto {
  family: 4 | 6;
  dataCenterId?: number;
  dataCenter?: string;
  assignmentType: AssignmentType;
  assignmentId: string;
  userId: string;
  subscriptionId: string;
}
