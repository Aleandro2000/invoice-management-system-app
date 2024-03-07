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
        const generatedTokens = await this.refreshTokenService.generateTokens(
          userResult.id,
          true,
        );
        return {
          status: 200,
          message: generatedTokens
            ? 'Login successfully!'
            : 'There is a problem with login!',
          result: generatedTokens,
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
}
