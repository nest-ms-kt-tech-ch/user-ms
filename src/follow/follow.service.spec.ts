import { Test, TestingModule } from '@nestjs/testing';
import { FollowService } from './follow.service';
import { UsersService } from 'src/users/users.service';

describe('FollowService', () => {
  let service: FollowService;

  const usersServiceMock = {
    findOne: jest.fn(),
  };

  const followDelegateMock = {
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowService,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    service = module.get<FollowService>(FollowService);
    (service as any).follow = followDelegateMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('followUser should create follow relation after validation', async () => {
    usersServiceMock.findOne.mockResolvedValue({});
    followDelegateMock.create.mockResolvedValue({ id: 1 });

    const result = await service.followUser({ id: 1, followTo: 2 } as any);

    expect(usersServiceMock.findOne).toHaveBeenCalledWith(1);
    expect(usersServiceMock.findOne).toHaveBeenCalledWith(2);
    expect(followDelegateMock.create).toHaveBeenCalledWith({
      data: { followerId: 1, userId: 2 },
    });
    expect(result).toEqual({ id: 1 });
  });

  it('deleteFollowUser should delete relation after validation', async () => {
    usersServiceMock.findOne.mockResolvedValue({});
    followDelegateMock.delete.mockResolvedValue({});

    await service.deleteFollowUser({ id: 1, unfollowTo: 2 } as any);

    expect(usersServiceMock.findOne).toHaveBeenCalledWith(1);
    expect(usersServiceMock.findOne).toHaveBeenCalledWith(2);
    expect(followDelegateMock.delete).toHaveBeenCalledWith({
      where: { followerId_userId: { followerId: 1, userId: 2 } },
    });
  });
});
