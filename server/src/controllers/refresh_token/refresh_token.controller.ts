import { Controller, Post, Body, Res } from '@nestjs/common';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RefreshTokenService } from 'src/services/refresh_token/refresh_token.service';

@Controller('refresh_token')
export class RefreshTokenController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refreshToken: string; id: number },
  ): Promise<ResponseInterface> {
    try {
      const { id, refreshToken } = body;
      if (
        !refreshToken ||
        !this.refreshTokenService.isValidToken(refreshToken) ||
        !(await this.prismaService.refreshToken.findUnique({
          where: {
            token: refreshToken,
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
        result: await this.authService.generateTokens(id),
      };
    } catch (e) {
      return {
        status: 500,
        message: 'Error for verifyin refresh token',
      };
    }
  }
}
