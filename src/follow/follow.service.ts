import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FollowDto, UnfollowDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FollowService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('FollowService')

  onModuleInit() {
    this.$connect()
    this.logger.log('Database connected')
  }

  constructor(private readonly usersService: UsersService) {
    super();
  }

  async followUser(followDto: FollowDto) {
    await this.usersService.findOne(followDto.id)
    await this.usersService.findOne(followDto.followTo)

    return this.follow.create({
      data: {
        followerId: followDto.id,
        userId: followDto.followTo,
      }
    })
  }

  async deleteFollowUser(unfollowDto: UnfollowDto) {
    await this.usersService.findOne(unfollowDto.id)
    await this.usersService.findOne(unfollowDto.unfollowTo)

    return this.follow.delete({
      where: {
        followerId_userId: {
          followerId: unfollowDto.id,
          userId: unfollowDto.unfollowTo,
        },
      }
    })
  }
}
