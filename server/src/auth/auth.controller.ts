import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { User } from '@testonwheels/database';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { JWT_TOKEN_VARIABLE } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: User) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() dto: User, @Res() res: Response) {
    return this.authService.signIn(dto, res);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Res() res: Response) {
    try {
      const result = this.authService.logout(res);

      if (!res.headersSent) {
        res.send(result);
      }
    } catch (error: unknown) {
      let message = 'Unknown error';

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      } else if (typeof error === 'object' && error !== null) {
        message = JSON.stringify(error);
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error during sign-in' + message });
    }
  }

  @Get()
  async getUserInfo(@Req() req: Request) {
    const token =
      req.cookies[JWT_TOKEN_VARIABLE] ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    return this.authService.decodeToken(token);
  }
}
