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
    const { password, email } = registerUser;
    const userDb = await this.userRepository.findOneBy({ email });
    if (userDb)
      throw new HttpException('User already exists', HttpStatus.SEE_OTHER);
    const hashedPassword = await hash(password, 10);
    const user = { ...registerUser, password: hashedPassword };
    const registeredUser = this.userRepository.create(user);
    return this.userRepository.save(registeredUser);
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
    return { token: token, user: { email: user.email, name: user.name } };
  }
}
