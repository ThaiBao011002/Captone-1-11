import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
