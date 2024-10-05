import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { RpcCustomExceptionFilter } from 'src/common';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly Client: ClientProxy,
  ) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.Client.send("auth.register.user", registerUserDto)
    .pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }


  @Post('login')
  async LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.Client.send("auth.login.user", loginUserDto)
    .pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )
  }

  
  @UseGuards(AuthGuard)
  @Get("verify")
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    
    return this.Client.send("auth.verify.token", token)
  }

}
