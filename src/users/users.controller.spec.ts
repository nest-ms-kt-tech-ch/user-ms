import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FollowService } from 'src/follow/follow.service';
import { MoviesService } from './movies.service';

jest.mock('src/config', () => ({
  envs: {
    PORT: 3001,
    DATABASE_URL: 'postgres://test',
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: 3600,
  },
}));

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getProfile: jest.fn(),
  };

  const followServiceMock = {
    followUser: jest.fn(),
    deleteFollowUser: jest.fn(),
  };

  const moviesServiceMock = {
    markAsFavorite: jest.fn(),
    unmarkAsFavorite: jest.fn(),
    commentMovie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: FollowService, useValue: followServiceMock },
        { provide: MoviesService, useValue: moviesServiceMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create -> usersService.create', () => {
    controller.create({} as any);
    expect(usersServiceMock.create).toHaveBeenCalled();
  });

  it('findAll -> usersService.findAll', () => {
    controller.findAll({} as any);
    expect(usersServiceMock.findAll).toHaveBeenCalled();
  });

  it('findOne -> usersService.findOne', () => {
    controller.findOne(1 as any);
    expect(usersServiceMock.findOne).toHaveBeenCalledWith(1);
  });

  it('update -> usersService.update', () => {
    controller.update({ id: 1 } as any);
    expect(usersServiceMock.update).toHaveBeenCalledWith(1, { id: 1 });
  });

  it('remove -> usersService.remove', () => {
    controller.remove(1 as any);
    expect(usersServiceMock.remove).toHaveBeenCalledWith(1);
  });

  it('profile -> usersService.getProfile', () => {
    controller.profile({ id: 1 } as any);
    expect(usersServiceMock.getProfile).toHaveBeenCalledWith({ id: 1 });
  });

  it('follow -> followService.followUser', () => {
    controller.follow({ id: 1, followTo: 2 } as any);
    expect(followServiceMock.followUser).toHaveBeenCalledWith({
      id: 1,
      followTo: 2,
    });
  });

  it('unfollow -> followService.deleteFollowUser', () => {
    controller.unfollow({ id: 1, unfollowTo: 2 } as any);
    expect(followServiceMock.deleteFollowUser).toHaveBeenCalledWith({
      id: 1,
      unfollowTo: 2,
    });
  });

  it('markAsFavorite -> moviesService.markAsFavorite', () => {
    controller.markAsFavorite({ userId: 1, movieId: 10 } as any);
    expect(moviesServiceMock.markAsFavorite).toHaveBeenCalledWith({
      userId: 1,
      movieId: 10,
    });
  });

  it('unmarkAsFavorite -> moviesService.unmarkAsFavorite', () => {
    controller.unmarkAsFavorite({ userId: 1, movieId: 10 } as any);
    expect(moviesServiceMock.unmarkAsFavorite).toHaveBeenCalledWith({
      userId: 1,
      movieId: 10,
    });
  });

  it('commentMovie -> moviesService.commentMovie', () => {
    controller.commentMovie({ userId: 1, movieId: 10, comment: 'Nice' } as any);
    expect(moviesServiceMock.commentMovie).toHaveBeenCalledWith({
      userId: 1,
      movieId: 10,
      comment: 'Nice',
    });
  });
});
