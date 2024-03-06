import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/dtos/auth.dto';
import { UserInterface } from 'src/interfaces/user.inteface';
import { PrismaService } from '../prisma/prisma.service';
import { hash, genSalt, compare } from 'bcrypt';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { RefreshTokenService } from '../refresh_token/refresh_token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async login(user: AuthDto): Promise<UserInterface | ResponseInterface> {
    try {
      const userResult = await this.prismaService.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (userResult && (await compare(user.password, userResult.password))) {
        return {
          status: 200,
          message: 'Login successfully!',
          result: this.generateTokens(user.id),
        };
      }
      return {
        status: 500,
        message: 'Failed to login!',
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  async register(user: AuthDto): Promise<UserInterface | ResponseInterface> {
    try {
      const userResult = await this.prismaService.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!userResult) {
        const newUserResult = await this.prismaService.user.create({
          data: {
            email: user.email,
            password: await hash(user.password, await genSalt()),
          },
        });
        delete newUserResult.password;
        return {
          status: 200,
          message: 'User created successfully!',
          result: newUserResult,
        };
      }
      return {
        status: 500,
        message: 'User already exists',
      };
    } catch (e) {
      return {
        status: 500,
        message: e.message,
      };
    }
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async generateTokens(id: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const accessToken = this.jwtService.sign({ id });
      const refreshToken = this.refreshTokenService.createToken();
      await this.prismaService.refreshToken.create({
        data: {
          user_id: id,
          token: refreshToken,
          created_at: new Date(),
        },
      });
      return { refreshToken, accessToken };
    } catch (e) {
      return null;
    }
  }
}
