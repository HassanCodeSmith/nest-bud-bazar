import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Product {
  // ╔════════════════════════╗
  // ║      Product Name      ║
  // ╚════════════════════════╝
  @Prop({ required: true })
  productName: string;
}
