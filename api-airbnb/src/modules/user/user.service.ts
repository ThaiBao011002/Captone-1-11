import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { BaseService } from '../../common/base.service';
@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }

  async searchName(name: string) {
    return this.userRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  async uploadAvatar(file: Express.Multer.File, id: number) {
    const fileName = `user-${id}-${file.originalname}`;
    writeFileSync(`public/${fileName}`, file.buffer);
    await this.userRepository.update(id, {
      avatar: fileName,
    });
    return null;
  }
}
