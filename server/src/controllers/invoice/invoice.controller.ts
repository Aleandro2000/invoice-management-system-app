import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BillDto } from 'src/dtos/bill.dto';
import { VerifyGuard } from 'src/guards/auth/verify.guard';
import { InvoiceService } from 'src/services/invoice/invoice.service';

@Controller('api/v1/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(VerifyGuard)
  @Get('read')
  async read(@Param() id?: number) {
    return await this.invoiceService.read(id, 'invoice');
  }

  @UseGuards(VerifyGuard)
  @Get('read/mine/:id')
  async readMine(@Param() id?: number) {
    return await this.invoiceService.read(id, 'own_invoices');
  }

  @UseGuards(VerifyGuard)
  @Post('create')
  async create(@Body() bill: BillDto) {
    return await this.invoiceService.create(bill);
  }

  @UseGuards(VerifyGuard)
  @Put('update/:id')
  async update(@Body() bill: BillDto, @Param() params: any) {
    return await this.invoiceService.update(bill, parseInt(params.id));
  }

  @UseGuards(VerifyGuard)
  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.invoiceService.delete(parseInt(params.id));
  }

  @UseGuards(VerifyGuard)
  @Delete('delete_by_user/:id')
  async deleteByUser(@Param() params: any) {
    return await this.invoiceService.delete(null, parseInt(params.id));
  }
}
