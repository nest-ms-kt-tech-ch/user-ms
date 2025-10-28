import { Controller, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({
    cmd: 'create_user',
  })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({
    cmd: 'find_all_users',
  })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @MessagePattern({
    cmd: 'find_one_user',
  })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @MessagePattern({
    cmd: 'update_user',
  })
  update(
    @Payload() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({
    cmd: 'remove_user',
  })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
