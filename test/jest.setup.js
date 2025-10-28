// Global Jest setup for unit tests
// Ensure reflect-metadata is loaded for decorators used by class-transformer/class-validator
require('reflect-metadata');

// Provide sane defaults for environment variables used by config/envs.ts
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3600';
process.env.PORT = process.env.PORT || '3001';
