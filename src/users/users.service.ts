import { Injectable } from '@nestjs/common';
import { User } from './dao/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.description = createUserDto.description;
        user.dob = createUserDto.dob;
        user.address = createUserDto.address;

        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        const updatedUser = new User();
        if (updateUserDto.name) {
            updatedUser.name = updateUserDto.name
        }
        if (updateUserDto.address) {
            updatedUser.address = updateUserDto.address
        }
        if (updateUserDto.dob) {
            updatedUser.dob = updateUserDto.dob
        }
        if (updateUserDto.description) {
            updatedUser.description = updateUserDto.description
        }

        await this.usersRepository.update(id, updatedUser);
    }

    async delete(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
