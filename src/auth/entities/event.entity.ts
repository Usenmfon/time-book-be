import { IOrganization, IUser } from 'src/system/interfaces';

export class NewUserEvent {
  user: IUser;
}

export class NewOrgEvent {
  org: IOrganization;
}
