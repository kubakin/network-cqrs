export enum AssignmentType {
  vm = 'vm',
  ds = 'ds',
}

export class Assignment {
  assignmentType: AssignmentType;
  assignmentId: string;

  constructor(assignmentId?: string, assignmentType?: AssignmentType) {
    this.assignmentType = assignmentType;
    this.assignmentId = assignmentId;
  }

  reset() {
    this.assignmentType = null;
    this.assignmentId = null;
  }
}
