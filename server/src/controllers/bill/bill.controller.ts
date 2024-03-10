import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BillDto } from 'src/dtos/bill.dto';
import { VerifyGuard } from 'src/guards/auth/verify.guard';
import { BillService } from 'src/services/bill/bill.service';

@Controller('api/v1/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @UseGuards(VerifyGuard)
  @Get('read')
  async read(@Param() id?: number) {
    return await this.billService.read(id, 'invoice');
  }

  @UseGuards(VerifyGuard)
  @Get('read/mine/:id')
  async readMine(@Param() id?: number) {
    return await this.billService.read(id, 'own_invoices');
  }

  @UseGuards(VerifyGuard)
  @Post('create')
  async create(@Body() bill: BillDto) {
    return await this.billService.create(bill);
  }

  @UseGuards(VerifyGuard)
  @Put('update/:id')
  async update(@Body() bill: BillDto, @Param() params: any) {
    return await this.billService.update(bill, parseInt(params.id));
  }

  @UseGuards(VerifyGuard)
  @Delete('delete/:id')
  async delete(@Param() params: any) {
    return await this.billService.delete(parseInt(params.id));
  }

  @UseGuards(VerifyGuard)
  @Delete('delete_by_user/:id')
  async deleteByUser(@Param() params: any) {
    return await this.billService.delete(null, parseInt(params.id));
  }
}
