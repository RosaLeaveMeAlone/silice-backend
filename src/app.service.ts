import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}

  onModuleInit() {
    const isConnected = this.connection.readyState === 1;

    if (isConnected) {
      this.logger.log(`MongoDB connected successfully to database: ${this.connection.name}`);
    } else {
      this.logger.error(`MongoDB connection failed. State: ${this.connection.readyState}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
