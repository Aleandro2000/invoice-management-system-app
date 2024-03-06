import { Controller, Post, Body, Res } from '@nestjs/common';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Controller('api/v1/refresh_token')
export class RefreshTokenController {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('refresh')
  async refreshToken(
    @Body() body: { refresh_token: string; id: number },
  ): Promise<ResponseInterface> {
    try {
      const { id, refresh_token } = body;
      if (
        !refresh_token ||
        !(await this.prismaService.refreshToken.findFirst({
          where: {
            token: refresh_token,
          },
        }))
      ) {
        return {
          status: 401,
          message: 'Invalid refresh token',
        };
      }
      return {
        status: 200,
        message: 'Refreshed token successfully',
        result: await this.authService.generateTokens(id as number),
      };
    } catch (e) {
      return {
        status: 500,
        message: 'Error for verifyin refresh token',
      };
    }
  }
}
