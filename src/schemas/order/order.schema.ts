import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { User } from '../user/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ required: true })
  customId: string | ObjectId | User;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      Exporting User Schema      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const OrderSchema = SchemaFactory.createForClass(Order);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>      Exporting Product Model      >>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export const ORDER_MODEL = Order.name;
