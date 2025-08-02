import mongoose, { Schema, Document, Types } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import { UserStatus } from './user.constants';
import bcrypt from 'bcrypt';
import config from '../../../config/config';

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ['admin', 'seller', 'user'],
      default: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    needPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, +config.saltRound!);
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// user exists by id
userSchema.statics.isUserExistsByCustomId = async function (id: Types.ObjectId) {
  return await this.findOne({ _id: id }).select('+password');
};

// user exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email });
};

// compare password
userSchema.statics.isPasswordMatched = async function (password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
};

// check password change time
userSchema.statics.isJwtIssuedBeforePasswordChange = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

const Users = mongoose.model<TUser, TUserModel>('User', userSchema);

export default Users;
