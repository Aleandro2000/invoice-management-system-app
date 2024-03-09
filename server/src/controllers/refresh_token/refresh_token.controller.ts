import { Controller, Post, Body, Res, Delete, UseGuards } from '@nestjs/common';
import { VerifyGuard } from 'src/guards/auth/verify.guard';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { RefreshTokenService } from 'src/services/refresh_token/refresh_token.service';

@Controller('api/v1/refresh_token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('refresh')
  async refreshToken(
    @Body() body: { refresh_token: string; id: number },
  ): Promise<ResponseInterface> {
    return await this.refreshTokenService.refreshToken(body);
  }

  @UseGuards(VerifyGuard)
  @Delete('remove_refresh_token')
  async removeRefreshToken(
    @Body() body: { refresh_token: string },
  ): Promise<ResponseInterface> {
    return await this.refreshTokenService.removeRefreshToken(
      body.refresh_token,
    );
  }
}
