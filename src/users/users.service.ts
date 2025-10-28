import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

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
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
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
}
