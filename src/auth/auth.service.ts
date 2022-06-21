import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUser: RegisterAuthDto) {
    const { password } = registerUser;
    const hashedPassword = await hash(password, 10);
    registerUser = { ...registerUser, password: hashedPassword };
    return this.userRepository.create(registerUser);
  }

  async loginUser(loginUser: LoginAuthDto) {
    const { email, password } = loginUser;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, user.password);
    if (!checkPassword)
      throw new HttpException('Wrong Credentials', HttpStatus.FORBIDDEN);

    const payload = { id: user.id, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    return { token: token, user: user };
  }
}
