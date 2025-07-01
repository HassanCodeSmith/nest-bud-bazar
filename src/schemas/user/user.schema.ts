import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE, PRODUCT_TYPE } from 'src/constants';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true, versionKey: false })
export class User {
  // ╔════════════════════════╗
  // ║      Account Type      ║
  // ╚════════════════════════╝
  @Prop({
    type: String,
    enum: Object.values(ACCOUNT_TYPE),
    required: true,
    immutable: true,
  })
  accountType: ACCOUNT_TYPE;

  // ╔══════════════════════════╗
  // ║      Account Status      ║
  // ╚══════════════════════════╝
  @Prop({
    type: String,
    enum: Object.values(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.PENDING,
    required: true,
  })
  accountStatus?: ACCOUNT_STATUS;

  // ╔══════════════════════╗
  // ║      First Name      ║
  // ╚══════════════════════╝
  @Prop({ required: true })
  firstName: string;

  // ╔═════════════════════╗
  // ║      Last Name      ║
  // ╚═════════════════════╝
  @Prop({ required: true })
  lastName: string;

  // ╔════════════════════════╗
  // ║      Company Name      ║
  // ╚════════════════════════╝
  @Prop({ required: true })
  companyName: string;

  // ╔═════════════════╗
  // ║      Email      ║
  // ╚═════════════════╝
  @Prop({ required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, unique: true })
  email: string;

  // ╔════════════════════════╗
  // ║      Phone Number      ║
  // ╚════════════════════════╝
  @Prop({ required: true })
  phone: string;

  // ╔═══════════════════╗
  // ║      Address      ║
  // ╚═══════════════════╝
  @Prop({ required: true })
  address: string;

  // ╔════════════════════════╗
  // ║      Product Type      ║
  // ╚════════════════════════╝
  @Prop({
    type: String,
    enum: Object.values(PRODUCT_TYPE),
    required: true,
    immutable: true,
  })
  productType: PRODUCT_TYPE;

  // ╔═══════════════════════╗
  // ║      OLCC Number      ║
  // ╚═══════════════════════╝
  @Prop({ required: true })
  olccNumber: string;

  // ╔════════════════════╗
  // ║      Password      ║
  // ╚════════════════════╝
  @Prop({ required: true, select: false })
  password: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      User Document Interface      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export interface UserDocument extends User, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      User Schema      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<
export const UserSchema = SchemaFactory.createForClass(User);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      Pre Hook - Hash Password      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
UserSchema.pre<UserDocument>('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      Compare Hashed Password      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      Export User Model Name      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const USER_MODEL = User.name;
