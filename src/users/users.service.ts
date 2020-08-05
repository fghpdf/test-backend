import { Injectable } from '@nestjs/common';
import { Users } from './interfaces/users.interface';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UsersService {
    private readonly users: Users[] = [];

    create(createUserDto: CreateUserDto) {
        
    }

    findAll(): Users[] {
        return this.users;
    }
}
