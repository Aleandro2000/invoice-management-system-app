import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { BillService } from './services/bill/bill.service';
import { InvoiceService } from './services/invoice/invoice.service';
import { AuthController } from './controllers/auth/auth.controller';
import { BillController } from './controllers/bill/bill.controller';
import { InvoiceController } from './controllers/invoice/invoice.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from './services/prisma/prisma.service';
import { RefreshTokenService } from './services/refresh_token/refresh_token.service';
import { RefreshTokenController } from './controllers/refresh_token/refresh_token.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 3600 * 24 * 7,
      },
    }),
  ],
  controllers: [AuthController, BillController, InvoiceController, RefreshTokenController],
  providers: [
    AuthService,
    BillService,
    InvoiceService,
    JwtService,
    PrismaService,
    RefreshTokenService,
  ],
})
export class AppModule {}
