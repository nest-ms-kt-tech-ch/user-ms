import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

jest.mock('src/config', () => ({
  envs: {
    PORT: 3001,
    DATABASE_URL: 'postgres://test',
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: 3600,
  },
}));

describe('AuthService', () => {
  let service: AuthService;
  const usersServiceMock = {
    findOne: jest.fn(),
  };
  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign token for existing user', async () => {
    usersServiceMock.findOne.mockResolvedValue({ id: 123 });
    jwtServiceMock.signAsync.mockResolvedValue('signed-token');

    const token = await service.signToken({ userId: '123' });

    expect(usersServiceMock.findOne).toHaveBeenCalledWith(123);
    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
      { userId: 123 },
      { expiresIn: 3600 },
    );
    expect(token).toBe('signed-token');
  });

  it('should throw if user not found', async () => {
    usersServiceMock.findOne.mockResolvedValue(null);
    const warnSpy = jest
      .spyOn((service as any)['logger'], 'warn')
      .mockImplementation();

    await expect(service.signToken({ userId: '999' })).rejects.toThrow(
      RpcException,
    );
    expect(warnSpy).toHaveBeenCalled();
  });
});
