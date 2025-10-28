describe('envs config', () => {
  const ORIGINAL_ENV = process.env;

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    jest.resetModules();
  });

  it('should export validated envs', () => {
    process.env = {
      ...ORIGINAL_ENV,
      DATABASE_URL: 'postgres://test',
      PORT: '3001',
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN: '3600',
    } as any;

    jest.isolateModules(() => {
      const { envs } = require('./envs');
      expect(envs).toEqual({
        PORT: 3001,
        DATABASE_URL: 'postgres://test',
        JWT_SECRET: 'secret',
        JWT_EXPIRES_IN: 3600,
      });
    });
  });
});
