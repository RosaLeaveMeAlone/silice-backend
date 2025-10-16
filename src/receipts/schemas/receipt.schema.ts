import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ReceiptStatus {
  PENDING = 'pending',
  COLLECTED = 'collected',
  REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class Receipt extends Document {
  @Prop({ required: true })
  client: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: ReceiptStatus.PENDING, enum: Object.values(ReceiptStatus) })
  status: ReceiptStatus;

  @Prop()
  dueDate: Date;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);
