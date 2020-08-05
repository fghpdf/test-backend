import { Controller, Get, Req, Post, Delete, Body } from '@nestjs/common';
import { UsersModule } from './users.module';
import { CreateUserDto } from './dto/create_user.dto';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {

    }

    @Get()
    findOne(@Req() request: Request): UsersModule {
        const user = new UsersModule();

        user.id = "1";
        user.name = "qxx";

        return user;
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): void {
        this.usersService.create(createUserDto);
        return
    }

    @Post()
    update(): void {
        return
    }

    @Delete()
    delete(): void {
        return
    }
}
