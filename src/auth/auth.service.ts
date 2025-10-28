import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { envs } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signToken(payload: { userId: string }): Promise<string> {
    const user = await this.usersService.findOne(Number(payload.userId));
    if (!user) {
      this.logger.warn(
        `Attempt to sign JWT for non-existing userId: ${payload.userId}`,
      );
      throw new RpcException({
        message: `User with id ${payload.userId} not found`,
        status: 404,
      });
    }
    this.logger.log(`JWT Secret: ${envs.JWT_SECRET}`);
    return await this.jwtService.signAsync(
      { userId: Number(payload.userId) },
      {
        expiresIn: envs.JWT_EXPIRES_IN,
      },
    );
  }
}
