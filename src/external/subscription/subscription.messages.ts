export enum SubscriptionType {
  HOURLY = 'hourly',
  MONTHLY = 'monthly',
  MONTHLY_ONLY = 'monthly-only',
}

export enum SubscriptionPeriod {
  MONTH = 1,
  MONTH3 = 3,
  MONTH6 = 6,
  MONTH12 = 12,
}

export enum InitiatorType {
  INTERNAL = 'internal',
  ADMIN = 'admin',
  USER = 'user',
  NO_FUNDS = 'no_funds',
}

export interface ISubscriptionItem {
  id: string;
  monthlyPrice: string;
  hourlyPrice: string;
  discountable?: boolean;
  name: string;
  metadata: any;
}

//balance.event.subscription.activated
export class SubscriptionActivated {
  id: string;
}

//balance.event.subscription.canceled
export class SubscriptionCanceled {
  id: string;
}

//balance.command.subscription.create
export class SubscriptionCreate {
  id: string;
  userId: string;
  adminId?: string;
  type: SubscriptionType;
  items: ISubscriptionItem[];
  initialPeriod?: SubscriptionPeriod;
  autoProlong?: boolean;
  invoiceId: string;
  connectionCost?: string;
}

//balance.command.subscription.cancel
export class SubscriptionCancel {
  id: string;
  initiator: InitiatorType;
  adminId?: string;
  invoiceId: string;
}
