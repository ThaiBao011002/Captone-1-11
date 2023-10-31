import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { RoomEntity } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { writeFileSync } from 'fs';

@Injectable()
export class RoomService extends BaseService<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {
    super(roomRepository);
  }
  async upload(file: Express.Multer.File, id: number) {
    const fileName = `room-${id}-${file.originalname}`;
    writeFileSync(`public/${fileName}`, file.buffer);
    await this.roomRepository.update(id, {
      image: fileName,
    });
    return null;
  }

  async findByLocation(location_id: number) {
    return this.roomRepository.find({
      where: {
        location_id: location_id,
      } as FindOptionsWhere<RoomEntity> as unknown,
    });
  }
}
