import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import jwt from 'jsonwebtoken';
import { envs } from 'src/config';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'create-jwt' })
  async createJwt(data: { userId: string }): Promise<{ token: string; }> {
    const token = await this.authService.signToken({ userId: data.userId });
    return { token };
  }
}
