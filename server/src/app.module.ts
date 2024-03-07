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
import { ScheduleModule } from '@nestjs/schedule';
import { RefreshTokenScheduleService } from './schedules/refresh_token.schedule.service';
import { JwtStrategy } from 'strategies/jwt.strategy';
import { VerifyGuard } from './guards/auth/verify.guard';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY as string,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [
    AuthController,
    BillController,
    InvoiceController,
    RefreshTokenController,
  ],
  providers: [
    AuthService,
    BillService,
    InvoiceService,
    JwtService,
    PrismaService,
    RefreshTokenService,
    RefreshTokenScheduleService,
    JwtStrategy,
    VerifyGuard,
  ],
})
export class AppModule {}
