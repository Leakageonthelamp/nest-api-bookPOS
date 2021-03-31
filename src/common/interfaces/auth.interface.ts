import { User } from '../../users/entities/user.entity';

export interface IAccessToken {
  accesssToken: string;
}

export interface IAuthPayload {
  uuid: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserIAuthPayload {
  user?: User;
  IAccessToken?: string;
}

export interface IRequestAuth extends Request {
  user: IUserIAuthPayload;
  get: (param: string) => string;
}
