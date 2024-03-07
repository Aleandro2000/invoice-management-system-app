import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async generateTokens(
    id: number,
    isCreatingNewRefreshToken?: boolean,
  ): Promise<{
    id: number;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const accessToken = this.jwtService.sign(
        { id },
        {
          secret: process.env.JWT_SECRET_KEY,
        },
      );
      if (isCreatingNewRefreshToken) {
        const refreshToken = v4();
        await this.prismaService.refreshToken.create({
          data: {
            user_id: id,
            token: refreshToken,
            created_at: new Date(),
          },
        });
        return { id, refreshToken, accessToken };
      }
      return {
        id,
        refreshToken: '',
        accessToken,
      };
    } catch (e) {
      return null;
    }
  }

  async refreshToken(
    body: {
      refresh_token: string;
      id: number;
    },
    isCreatingNewRefreshToken?: boolean,
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
        result: await this.generateTokens(
          id as number,
          isCreatingNewRefreshToken,
        ),
      };
    } catch (e) {
      return {
        status: 500,
        message: 'Error for verifyin refresh token',
      };
    }
  }
}
