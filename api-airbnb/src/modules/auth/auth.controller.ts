import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SkipAuth } from './skip.auth.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { baseReturn } from './../../common/base.return';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/signin')
  async login(@Body() loginDto: SignInDto) {
    return baseReturn(this.authService.login(loginDto), HttpStatus.OK);
  }

  @SkipAuth()
  @Post('/signup')
  async register(@Body() createUserDto: SignUpDto) {
    return baseReturn(this.authService.register(createUserDto), HttpStatus.CREATED);
  }
}
