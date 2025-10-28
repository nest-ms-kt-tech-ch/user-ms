import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentMovieDto, MarkAsFavoriteDto, UnmarkAsFavoriteDto } from './dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MoviesService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('MoviesService');

  onModuleInit() {
    this.$connect()
    this.logger.log('Database connected');
  }

  async findFavorite(markAsFavoriteDto: MarkAsFavoriteDto) {
    return this.favorite.findFirst({
      where: markAsFavoriteDto
    });
  }

  async markAsFavorite(markAsFavoriteDto: MarkAsFavoriteDto) {
    const isAlreadyFavorite = await this.findFavorite(markAsFavoriteDto)
    if (isAlreadyFavorite) throw new RpcException({
      message: "Movie already marked as favorite",
      status: HttpStatus.NOT_MODIFIED
    })
    return await this.favorite.create({
      data: markAsFavoriteDto
    })
  }

  async unmarkAsFavorite(unmarkAsFavoriteDto: UnmarkAsFavoriteDto) {
    return await this.favorite.delete({
      where: {
        userId_movieId: {
          userId: unmarkAsFavoriteDto.userId,
          movieId: unmarkAsFavoriteDto.movieId,
        },
      }
    })
  }

  async commentMovie(commentMovieDto: CommentMovieDto) {
    return await this.comment.create({
      data: commentMovieDto
    })
  }
}
