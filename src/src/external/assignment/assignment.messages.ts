//ipam.event.ip.customer.unassign.confirmed
export class IpUnassignConfirmed {
  id: string;
  address: string;
}

//@Event('ipam.event.ip.customer.assign.confirmed')
export class IpAssignConfirmed {
  id: string;
  assignmentId: string;
  address: string;
  assignmentType: string;
}

//@Event('ipam.event.ip.customer.assign.failed')
export class IpAssignFailed {
  id: string;
}

//@Event('ipam.event.ip.customer.unassign.failed')
export class IpUnassignFailed {
  id: string;
}
