import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '172.16.30.120',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    autoLoadEntities: true,
    synchronize: true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
