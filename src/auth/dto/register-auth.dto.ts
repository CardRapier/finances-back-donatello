import { IsNotEmpty, IsString } from 'class-validator';

import { LoginAuthDto } from './login-auth.dto';
import { PartialType } from '@nestjs/mapped-types';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
