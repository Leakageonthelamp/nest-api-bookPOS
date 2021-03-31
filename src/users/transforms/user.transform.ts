import { IUserBasicInfo } from '../../common/interfaces';

export class TUser {
  uuid: string;
  username: string;
  password: string;
  bcryptPassword: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  me(): IUserBasicInfo {
    return {
      uuid: this.uuid,
      username: this.username,
      email: this.email,
    };
  }
}
