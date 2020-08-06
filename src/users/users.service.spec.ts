import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './dao/user.entity';
import { MockType, repositoryMockFactory } from '../mockType';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { async } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<User>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { 
        provide: getRepositoryToken(User),
        useFactory: repositoryMockFactory
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user: User = {
        id: 1,
        name: "fghpdf",
        dob: new Date("1993-12-27"),
        address: "Wuhan",
        description: "Node.js backend",
        createdAt: new Date()
      };

      repositoryMock.findOne.mockReturnValue(user);
      
      const actualUser = await service.findOne(`${user.id}`);

      expect(actualUser).toEqual(user);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(`${user.id}`);
    });

    it('should return null', async () => {
      repositoryMock.findOne.mockReturnValue(null);

      const actualUser = await service.findOne("1");

      expect(actualUser).toBeNull();
      expect(repositoryMock.findOne).toHaveBeenCalledWith("1");
    })
  });

  describe("update", () => {
    it('should update a user', async () => {
      const user = {
        name: "haha",
        description: "Java backend",
        address: "Beijing"
      };

      const dto: UpdateUserDto = {
        name: "haha",
        dob: null,
        description: "Java backend",
        address: "Beijing"
      };

      await service.update('1', dto);

      expect(repositoryMock.update).toHaveBeenCalledWith('1', user);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: User = {
        id: 1,
        name: "fghpdf",
        dob: new Date("1993-12-27"),
        address: "Wuhan",
        description: "Node.js backend",
        createdAt: new Date()
      };
  
      repositoryMock.save.mockReturnValue(user);
  
      const dto: CreateUserDto = {
        name: user.name,
        dob: user.dob,
        address: user.address,
        description: user.description
      };
  
      const actualUser = await service.create(dto);
      expect(actualUser).toEqual(user);
      expect(repositoryMock.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      await service.delete("1");

      expect(repositoryMock.delete).toHaveBeenCalledWith("1");
    })
  });
});
