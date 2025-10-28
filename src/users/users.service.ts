import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { FollowDto, GetProfileDto, UnfollowDto } from './dto';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('UsersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createUserDto: CreateUserDto) {
    return this.user.create({ data: createUserDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const  { page = 1, limit = 10 } = paginationDto;

    const totalItems = await this.user.count({
      where: { active: true }
    });
    const lastPage = Math.ceil(totalItems / limit);

    return {
      data: await this.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { active: true }
      }),
      metadata: {
        totalItems: totalItems,
        currentPage: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const user = await this.user.findUnique({ where: { id, active: true } });
    if (!user) throw new RpcException({
      message: `User with id ${id} not found`,
      status: HttpStatus.BAD_REQUEST,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {id: _, ...data} = updateUserDto;
    await this.findOne(id);
    
    return this.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const user = await this.user.update({
      where: { id },
      data: { active: false },
    });

    return user;
  }

  async getProfile(getProfileDto: GetProfileDto) {
    const user = await this.user.findUnique({ where: { id: getProfileDto.id, active: true }, include: { favorites: true, comments: true, Follow: true} });
    if (!user) throw new RpcException({
      message: `User with id ${getProfileDto.id} not found`,
      status: HttpStatus.BAD_REQUEST,
    });
    return user;
  }
}
