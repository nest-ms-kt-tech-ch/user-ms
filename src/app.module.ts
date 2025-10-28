import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { FollowService } from './follow/follow.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), AuthModule, MoviesModule],
  controllers: [],
  providers: [FollowService, UsersService],
})
export class AppModule {}
