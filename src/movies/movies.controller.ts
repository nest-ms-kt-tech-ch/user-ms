import { Controller } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentMovieDto, MarkAsFavoriteDto, UnmarkAsFavoriteDto } from './dto';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @MessagePattern({
    cmd: 'mark-movie-as-favorite'
  })
  markAsFavorite(@Payload() markAsFavoriteDto: MarkAsFavoriteDto) {
    return this.moviesService.markAsFavorite(markAsFavoriteDto)
  }

  @MessagePattern({
    cmd: 'unmark-movie-as-favorite'
  })
  unmarkAsFavorite(@Payload() unmarkAsFavoriteDto: UnmarkAsFavoriteDto) {
    return this.moviesService.unmarkAsFavorite(unmarkAsFavoriteDto)
  }

  @MessagePattern({
    cmd: 'comment-movie'
  })
  commentMovie(@Payload() commentMovieDto: CommentMovieDto) {
    return this.moviesService.commentMovie(commentMovieDto)
  }


}
