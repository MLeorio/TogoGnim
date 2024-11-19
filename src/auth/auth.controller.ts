import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    const user = await this.authService.signup(userDto);
    return {
      status: HttpStatus.ACCEPTED,
      message: "L'utilisateur a été créé avec succès",
      data: user,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    // console.log("User dans le controller", user);

    return this.authService.login(user);
  }

  @Post('reset-password')
  async resetPasswordDemand(@Body() resetPasswordDto: ResetPasswordDto) {
    console.log(resetPasswordDto);
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @Post('reset-password-confirmation/:token')
  async resetPasswordConfirmation(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    console.log(newPassword, token);

    return await this.authService.resetPasswordConfirm(token, newPassword);
  }
}
