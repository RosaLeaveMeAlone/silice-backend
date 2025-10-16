import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptStatus } from './schemas/receipt.schema';
import { ParseObjectIdPipe } from '../common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('receipts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo recibo' })
  @ApiResponse({ status: 201, description: 'Recibo creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los recibos' })
  @ApiQuery({ name: 'status', required: false, enum: ReceiptStatus, description: 'Filtrar por estado' })
  @ApiQuery({ name: 'client', required: false, type: String, description: 'Filtrar por nombre de cliente' })
  @ApiResponse({ status: 200, description: 'Lista de recibos obtenida exitosamente' })
  findAll(
    @Query('status') status?: ReceiptStatus,
    @Query('client') client?: string,
  ) {
    return this.receiptsService.findAll(status, client);
  }

  @Patch(':id/collect')
  @ApiOperation({ summary: 'Marcar un recibo como cobrado' })
  @ApiParam({ name: 'id', description: 'ID del recibo' })
  @ApiResponse({ status: 200, description: 'Recibo marcado como cobrado y evento publicado a RabbitMQ' })
  @ApiResponse({ status: 404, description: 'Recibo no encontrado' })
  collect(@Param('id', ParseObjectIdPipe) id: string) {
    return this.receiptsService.collect(id);
  }
}
