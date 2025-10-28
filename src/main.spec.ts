import { Logger } from '@nestjs/common';

jest.mock('src/config', () => ({
  envs: {
    PORT: 3333,
    DATABASE_URL: 'postgres://test',
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: 3600,
  },
}));

const useGlobalPipes = jest.fn();
const listen = jest.fn().mockResolvedValue(undefined);

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    createMicroservice: jest.fn().mockResolvedValue({
      useGlobalPipes,
      listen,
    }),
  },
}));

describe('main bootstrap', () => {
  it('should bootstrap without throwing', () => {
    expect(() => {
      jest.isolateModules(() => {
        require('./main');
      });
    }).not.toThrow();
  });
});
