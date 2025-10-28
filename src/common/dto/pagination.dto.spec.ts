import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  it('should have defaults and validate successfully', async () => {
    const dto = plainToInstance(PaginationDto, {});
    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.page).toBe(1);
    expect(dto.limit).toBe(10);
  });

  it('should validate positive numbers', async () => {
    const dto = plainToInstance(PaginationDto, { page: -1, limit: 0 });
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });
});
