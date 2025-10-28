import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FollowService } from 'src/follow/follow.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FollowService],
})
export class UsersModule {}
