import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaUser = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    service.user = mockPrismaUser as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      mockPrismaUser.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockPrismaUser.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
      expect(mockPrismaUser.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of active users', async () => {
      const paginationDto: PaginationDto = {
        page: 1,
        limit: 10,
      };

      const mockUsers = [mockUser];
      const totalItems = 1;

      mockPrismaUser.count.mockResolvedValue(totalItems);
      mockPrismaUser.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll(paginationDto);

      expect(result).toEqual({
        data: mockUsers,
        metadata: {
          totalItems: 1,
          currentPage: 1,
          lastPage: 1,
        },
      });
      expect(mockPrismaUser.count).toHaveBeenCalledWith({
        where: { active: true },
      });
      expect(mockPrismaUser.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        where: { active: true },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single user if found', async () => {
      mockPrismaUser.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { id: 1, active: true },
      });
      expect(mockPrismaUser.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if a user is not found', async () => {
      mockPrismaUser.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'User with id 999 not found',
      );
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { id: 999, active: true },
      });
    });
  });

  describe('update', () => {
    it('should successfully update an existing user', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 1,
        name: 'John Updated',
      };

      const updatedUser = { ...mockUser, name: 'John Updated' };

      mockPrismaUser.findUnique.mockResolvedValue(mockUser);
      mockPrismaUser.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(mockPrismaUser.findUnique).toHaveBeenCalledWith({
        where: { id: 1, active: true },
      });
      expect(mockPrismaUser.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'John Updated' },
      });
      expect(mockPrismaUser.update).toHaveBeenCalledTimes(1);
    });
  });
});
