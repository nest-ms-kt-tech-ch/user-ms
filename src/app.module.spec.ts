import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

jest.mock('src/config', () => ({
  envs: {
    PORT: 3001,
    DATABASE_URL: 'postgres://test',
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: 3600,
  },
}));

describe('AppModule', () => {
  it('should compile the module', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(moduleRef).toBeDefined();
  });
});
