import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { RefreshTokenService } from 'src/services/refresh_token/refresh_token.service';

@Controller('refresh_token')
export class RefreshTokenController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refreshToken: string; id: number; email: string },
  ) {
    const { id, email, refreshToken } = body;
    if (!refreshToken || !this.refreshTokenService.isValidToken(refreshToken)) {
      return {
        status: 401,
        message: 'Invalid refresh token',
      };
    }
    const newTokens = this.authService.generateTokens(id, email);
    return {
      newTokens,
    };
  }
}
