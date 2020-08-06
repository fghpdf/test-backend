import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './dao/user.entity';
import { async } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../mockType';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, { 
        provide: getRepositoryToken(User),
        useFactory: repositoryMockFactory
      }]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
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

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);

      const actualUser = await usersController.findOne(`${user.id}`);
      expect(actualUser).toEqual(user);
    });

    it('should return 404', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => null);

      let error: Error
      try {
        await usersController.findOne('1');
      } catch (e) {
        error = e
      }
      
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual("No User!");
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

      jest.spyOn(usersService, 'create').mockImplementation(async () => user);

      const dto: CreateUserDto = {
        name: "fghpdf",
        dob: new Date("1993-12-27"),
        address: "Wuhan",
        description: "Node.js backend"
      };

      const actualUser = await usersController.create(dto);
      expect(actualUser).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = {
        name: "fghpdf",
        dob: new Date("1993-12-27"),
        address: "Wuhan",
        description: "Node.js backend"
      };

      jest.spyOn(usersService, 'update');

      await usersController.update("1", dto);
      expect(usersService.update).toHaveBeenCalledWith("1", dto);
    });
  });

  describe('delete', () => {
    it('shoule delete a user', async () => {
      jest.spyOn(usersService, 'delete');

      await usersController.delete("1");
      expect(usersService.delete).toHaveBeenCalledWith("1");
    });
  });
});
