import { Injectable } from '@nestjs/common';
import { InvoiceDto } from 'src/dtos/invoice.dto';
import { InvoiceInterface } from 'src/interfaces/invoice.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    invoice: InvoiceDto,
    user_id?: number,
  ): Promise<InvoiceInterface | ResponseInterface> {
    try {
      const invoiceResult = await this.prismaService.invoice.create({
        data: {
          amount: invoice.amount,
          details: invoice.details,
          due_date: invoice.due_date,
          user_id: user_id,
        },
      });
      return {
        status: 200,
        message: 'Invoice created successfully',
        result: invoiceResult,
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async read(id?: number): Promise<InvoiceInterface | ResponseInterface> {
    try {
      let invoiceResult: InvoiceInterface | InvoiceInterface[];
      if (id) {
        invoiceResult = await this.prismaService.invoice.findUnique({
          where: {
            id: id,
          },
        });
      } else {
        invoiceResult = await this.prismaService.invoice.findMany();
      }
      return {
        status: 200,
        message: 'Invoices selected successfully',
        result: invoiceResult,
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async update(
    invoice: InvoiceDto,
    id: number,
  ): Promise<InvoiceInterface | ResponseInterface> {
    try {
      const invoiceResult = await this.prismaService.invoice.update({
        where: {
          id: id,
        },
        data: {
          amount: invoice.amount,
          details: invoice.details,
          due_date: invoice.due_date,
        },
      });
      return {
        status: 200,
        message: 'Invoice updated successfully',
        result: invoiceResult,
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async delete(id: number): Promise<InvoiceInterface | ResponseInterface> {
    try {
      await this.prismaService.invoice.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        message: 'Invoice deleted successfully',
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }
}
