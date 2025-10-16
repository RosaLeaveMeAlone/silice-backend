import { IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReceiptDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
  })
  @IsString()
  client: string;

  @ApiProperty({
    description: 'Monto del recibo',
    example: 150.50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({
    description: 'Fecha de vencimiento del recibo',
    example: '2025-12-31',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
