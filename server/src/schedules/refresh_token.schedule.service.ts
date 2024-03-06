import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class RefreshTokenScheduleService {
  private readonly logger = new Logger(RefreshTokenScheduleService.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron(): Promise<void> {
    try {
      await this.prismaService.refreshToken.deleteMany();
      this.logger.debug('Refresh Token Schedule ran successfully!');
    } catch (e) {
      this.logger.debug(e.message);
    }
  }
}
