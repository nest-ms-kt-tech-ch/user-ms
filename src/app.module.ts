import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FollowService } from './follow/follow.service';
import { UsersService } from './users/users.service';
import { MoviesService } from './users/movies.service';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), AuthModule],
  controllers: [],
  providers: [FollowService, UsersService, MoviesService],
})
export class AppModule {}
