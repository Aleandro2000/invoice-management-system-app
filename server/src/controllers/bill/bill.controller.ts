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
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BillService } from 'src/services/bill/bill.service';

@Controller('api/v1/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @UseGuards(AuthGuard)
  @Get('read')
  async read(@Param() id?: number) {
    return await this.billService.read(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() bill: BillDto) {
    return await this.billService.create(bill);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async update(@Body() bill: BillDto, @Param() id: number) {
    return await this.billService.update(bill, id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Param() id: number) {
    return await this.billService.delete(id);
  }
}
