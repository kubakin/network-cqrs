import { ICommand } from '@nestjs/cqrs';
import { AssignmentType } from '../../domain/enitites/assignment';

export class IpCreateCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly dataCenter: string,
    readonly family: number,
    readonly primary: boolean,
    readonly subscriptionId: string | null,
    readonly assignmentId?: string | null,
    readonly assignmentType?: AssignmentType | null,
    readonly address?: string,
    readonly prefix?: string,
  ) {}
}
