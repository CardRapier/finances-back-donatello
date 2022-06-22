import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerUser: RegisterAuthDto) {
    return this.authService.registerUser(registerUser);
  }

  @Post('login')
  async loginUser(@Body() loginUser: LoginAuthDto) {
    return this.authService.loginUser(loginUser);
  }
}
