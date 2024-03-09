import { Injectable } from '@nestjs/common';
import { BillDto } from 'src/dtos/bill.dto';
import { BillInterface } from 'src/interfaces/bill.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(bill: BillDto): Promise<BillInterface | ResponseInterface> {
    try {
      const billResult = await this.prismaService.bill.create({
        data: {
          amount: bill.amount,
          details: bill.details,
          due_date: bill.due_date,
          user_id: bill.user_id,
        },
      });
      return {
        status: 200,
        message: 'Bill created successfully',
        result: billResult,
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async read(
    id?: number,
    type?: string,
  ): Promise<BillInterface | ResponseInterface> {
    try {
      let billResult: BillInterface | BillInterface[];
      switch (type) {
        case 'bill':
          billResult = await this.prismaService.bill.findUnique({
            where: {
              id: id,
            },
          });
          return {
            status: 200,
            message: 'Bills selected successfully',
            result: billResult,
          };
        case 'own_bills':
          billResult = await this.prismaService.bill.findMany({
            where: {
              user_id: id,
            },
          });
          return {
            status: 200,
            message: 'Bills selected successfully',
            result: billResult,
          };
        default:
          billResult = await this.prismaService.bill.findMany();
          return {
            status: 200,
            message: 'Bills selected successfully',
            result: billResult,
          };
      }
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async update(
    bill: BillDto,
    id: number,
  ): Promise<BillInterface | ResponseInterface> {
    try {
      const billResult = await this.prismaService.bill.update({
        where: {
          id: id,
        },
        data: {
          amount: bill.amount,
          details: bill.details,
          due_date: bill.due_date,
        },
      });
      return {
        status: 200,
        message: 'Bill updated successfully',
        result: billResult,
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async delete(id: number): Promise<BillInterface | ResponseInterface> {
    try {
      await this.prismaService.bill.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        message: 'Bill deleted successfully',
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }
}
