import { MoviesService } from './movies.service';
import { RpcException } from '@nestjs/microservices';

describe('MoviesService', () => {
  let service: MoviesService;

  const favoriteMock = {
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  const commentMock = {
    create: jest.fn(),
  };

  beforeEach(() => {
    service = new MoviesService();
    // Override Prisma delegates
    (service as any).favorite = favoriteMock;
    (service as any).comment = commentMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onModuleInit', () => {
    it('should connect to the database and log a message', () => {
      const connectSpy = jest
        .spyOn(service, '$connect')
        .mockResolvedValue(undefined);
      const loggerSpy = jest.spyOn(service['logger'], 'log');

      service.onModuleInit();

      expect(connectSpy).toHaveBeenCalledTimes(1);
      expect(loggerSpy).toHaveBeenCalledWith('Database connected');
    });
  });

  it('findFavorite should call prisma.favorite.findFirst', async () => {
    favoriteMock.findFirst.mockResolvedValue(null);
    await service.findFavorite({ userId: 1, movieId: 2 } as any);
    expect(favoriteMock.findFirst).toHaveBeenCalledWith({
      where: { userId: 1, movieId: 2 },
    });
  });

  it('markAsFavorite should create when not already favorite', async () => {
    favoriteMock.findFirst.mockResolvedValue(null);
    favoriteMock.create.mockResolvedValue({ userId: 1, movieId: 2 });

    const res = await service.markAsFavorite({ userId: 1, movieId: 2 } as any);

    expect(favoriteMock.create).toHaveBeenCalledWith({
      data: { userId: 1, movieId: 2 },
    });
    expect(res).toEqual({ userId: 1, movieId: 2 });
  });

  it('markAsFavorite should throw when already favorite', async () => {
    favoriteMock.findFirst.mockResolvedValue({ userId: 1, movieId: 2 });
    await expect(
      service.markAsFavorite({ userId: 1, movieId: 2 } as any),
    ).rejects.toThrow(RpcException);
  });

  it('unmarkAsFavorite should delete with composite key', async () => {
    favoriteMock.delete.mockResolvedValue({});

    await service.unmarkAsFavorite({ userId: 1, movieId: 2 } as any);

    expect(favoriteMock.delete).toHaveBeenCalledWith({
      where: { userId_movieId: { userId: 1, movieId: 2 } },
    });
  });

  it('commentMovie should create a comment', async () => {
    commentMock.create.mockResolvedValue({ id: 1 });

    const res = await service.commentMovie({
      userId: 1,
      movieId: 2,
      comment: 'Nice',
    } as any);

    expect(commentMock.create).toHaveBeenCalledWith({
      data: { userId: 1, movieId: 2, comment: 'Nice' },
    });
    expect(res).toEqual({ id: 1 });
  });
});
