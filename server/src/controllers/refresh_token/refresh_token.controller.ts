import { Controller, Post, Body, Res } from '@nestjs/common';
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
}
