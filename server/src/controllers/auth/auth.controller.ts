import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: AuthDto) {
    return await this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: AuthDto) {
    return await this.authService.register(user);
  }
}
