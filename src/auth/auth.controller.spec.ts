import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('src/config', () => ({
  envs: {
    PORT: 3001,
    DATABASE_URL: 'postgres://test',
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: 3600,
  },
}));

describe('AuthController', () => {
  let controller: AuthController;
  const authServiceMock = {
    signToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createJwt should call AuthService.signToken and return token', async () => {
    authServiceMock.signToken.mockResolvedValue('jwt-token');

    const result = await controller.createJwt({ userId: '123' });

    expect(authServiceMock.signToken).toHaveBeenCalledWith({ userId: '123' });
    expect(result).toEqual({ token: 'jwt-token' });
  });
});
