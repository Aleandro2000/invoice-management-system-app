import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  createToken(): string {
    return v4();
  }

  async refreshToken(body: {
    refresh_token: string;
    id: number;
  }): Promise<ResponseInterface> {
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
