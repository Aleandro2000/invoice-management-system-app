import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class RefreshTokenService {
  private readonly refreshTokens: Map<string, number> = new Map();

  createToken(): string {
    const refreshToken = v4();
    this.refreshTokens.set(refreshToken, Date.now());
    return refreshToken;
  }

  isValidToken(token: string): boolean {
    return this.refreshTokens.has(token);
  }

  deleteToken(token: string): void {
    this.refreshTokens.delete(token);
  }
}
