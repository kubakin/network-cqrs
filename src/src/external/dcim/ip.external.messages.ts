//netbox-sync.event.ip.created
export class IpCreated {
  address: string;
  custom_fields: {
    ip_instance_id: string;
  };
}

//netbox-sync.event.ip.updated
export class IpUpdated {}

//netbox-sync.event.ip.deleted
export class IpDeleted {
  address: string;
  custom_fields: {
    ip_instance_id: string;
  };
}
