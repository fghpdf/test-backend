import { Controller, Get, Param, Post, Delete, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersService } from './users.service';
import { User } from './dao/user.entity';
import { UpdateUserDto } from './dto/update_user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (user == null) {
            throw new BadRequestException("No user!");
        }

        return user;
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.usersService.delete(id);
    }
}
