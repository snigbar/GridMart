import { Model, Types } from 'mongoose';
import { user_role } from './user.constants';

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'seller' | 'user';
  status: 'active' | 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChangedAt?: Date;
  needPasswordChange: boolean;
};

export interface TUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: Types.ObjectId): Promise<TUser | null>;
  isUserExistsByEmail(email: string): Promise<TUser | null>;

  isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;

  isJwtIssuedBeforePasswordChange(passwordChangedAt: Date, jwtIssuedAt: number): Promise<boolean>;
}

export type TUserType = keyof typeof user_role;
