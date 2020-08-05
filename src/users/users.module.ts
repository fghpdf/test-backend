import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { databaseProviders } from '../database.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...databaseProviders]
})
export class UsersModule {
    id: string
    name: string
    dob: string
    address: string
    description: string
    createdAt: string
}
