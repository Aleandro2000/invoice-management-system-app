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
  ): Promise<InvoiceInterface | ResponseInterface> {
    try {
      const invoiceResult = await this.prismaService.invoice.create({
        data: {
          amount: invoice.amount,
          details: invoice.details,
          due_date: new Date(invoice.due_date).toISOString(),
          user_id: invoice.user_id,
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

  async read(
    id?: number,
    type?: string,
  ): Promise<InvoiceInterface | ResponseInterface> {
    try {
      let invoiceResult: InvoiceInterface | InvoiceInterface[];
      switch (type) {
        case 'invoice':
          invoiceResult = await this.prismaService.invoice.findUnique({
            where: {
              id: id,
            },
          });
          return {
            status: 200,
            message: 'Invoices selected successfully',
            result: invoiceResult,
          };
        case 'own_invocies':
          invoiceResult = await this.prismaService.invoice.findMany({
            where: {
              user_id: id,
            },
          });
          return {
            status: 200,
            message: 'Invoices selected successfully',
            result: invoiceResult,
          };
        default:
          invoiceResult = await this.prismaService.invoice.findMany();
          return {
            status: 200,
            message: 'Invoices selected successfully',
            result: invoiceResult,
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
          due_date: new Date(invoice.due_date).toISOString(),
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

  async delete(id?: number, user_id?: number): Promise<InvoiceInterface | ResponseInterface> {
    try {
      if (id) {
        await this.prismaService.invoice.delete({
          where: {
            id: id,
          },
        });
      } else if (user_id) {
        await this.prismaService.invoice.deleteMany({
          where: {
            user_id: user_id,
          },
        });
      }
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
