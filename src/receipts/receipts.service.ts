import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Receipt, ReceiptStatus } from './schemas/receipt.schema';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectModel(Receipt.name) private receiptModel: Model<Receipt>,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const receipt = new this.receiptModel(createReceiptDto);
    return receipt.save();
  }

  async findAll(status?: ReceiptStatus, client?: string): Promise<Receipt[]> {
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (client) {
      filter.client = { $regex: client, $options: 'i' };
    }

    return this.receiptModel.find(filter).exec();
  }

  async collect(id: string): Promise<Receipt> {
    const receipt = await this.receiptModel.findById(id);

    if (!receipt) {
      throw new NotFoundException(`Receipt with ID ${id} not found`);
    }

    receipt.status = ReceiptStatus.COLLECTED;
    const savedReceipt = await receipt.save();

    // Publicar evento a RabbitMQ
    this.rabbitClient.emit('recibo.cobrado', {
      id: String(savedReceipt._id),
      client: savedReceipt.client,
      amount: savedReceipt.amount,
      fecha: new Date(),
    });

    return savedReceipt;
  }
}
