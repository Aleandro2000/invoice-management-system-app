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
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { InvoiceService } from 'src/services/invoice/invoice.service';

@Controller('api/v1/invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Get('read')
  async read(@Param() id?: number) {
    return await this.invoiceService.read(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() bill: BillDto) {
    return await this.invoiceService.create(bill);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async update(@Body() bill: BillDto, @Param() id: number) {
    return await this.invoiceService.update(bill, id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Param() id: number) {
    return await this.invoiceService.delete(id);
  }
}
