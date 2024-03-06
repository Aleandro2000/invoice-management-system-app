import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class RefreshTokenService {
  createToken(): string {
    return v4();
  }
}
