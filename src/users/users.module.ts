import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FollowService } from 'src/follow/follow.service';
import { MoviesService } from './movies.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FollowService, MoviesService],
})
export class UsersModule {}
