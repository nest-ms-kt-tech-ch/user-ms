import { Controller, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CommentMovieDto,
  CreateUserDto,
  FollowDto,
  GetProfileDto,
  MarkAsFavoriteDto,
  UnfollowDto,
  UnmarkAsFavoriteDto,
  UpdateUserDto,
} from './dto';
import { FollowService } from 'src/follow/follow.service';
import { MoviesService } from './movies.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly followService: FollowService,
    private readonly moviesService: MoviesService,
  ) {}

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
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({
    cmd: 'remove_user',
  })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  @MessagePattern({
    cmd: 'get-user-profile',
  })
  profile(@Payload() getProfileDto: GetProfileDto) {
    return this.usersService.getProfile(getProfileDto);
  }

  @MessagePattern({
    cmd: 'follow-user',
  })
  follow(@Payload() followDto: FollowDto) {
    return this.followService.followUser(followDto);
  }

  @MessagePattern({
    cmd: 'unfollow-user',
  })
  unfollow(@Payload() unfollowDto: UnfollowDto) {
    return this.followService.deleteFollowUser(unfollowDto);
  }

  @MessagePattern({
    cmd: 'mark-movie-as-favorite',
  })
  markAsFavorite(@Payload() markAsFavoriteDto: MarkAsFavoriteDto) {
    return this.moviesService.markAsFavorite(markAsFavoriteDto);
  }

  @MessagePattern({
    cmd: 'unmark-movie-as-favorite',
  })
  unmarkAsFavorite(@Payload() unmarkAsFavoriteDto: UnmarkAsFavoriteDto) {
    return this.moviesService.unmarkAsFavorite(unmarkAsFavoriteDto);
  }

  @MessagePattern({
    cmd: 'comment-movie',
  })
  commentMovie(@Payload() commentMovieDto: CommentMovieDto) {
    return this.moviesService.commentMovie(commentMovieDto);
  }
}
