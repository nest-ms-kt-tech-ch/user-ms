import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  imports: [JwtModule.register({ secret: envs.JWT_SECRET })],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
