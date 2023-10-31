import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './location.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { writeFileSync } from 'fs';

@Injectable()
export class LocationService extends BaseService<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    super(locationRepository);
  }

  async upload(file: Express.Multer.File, id: number) {
    const fileName = `location-${id}-${file.originalname}`;
    writeFileSync(`public/${fileName}`, file.buffer);
    await this.locationRepository.update(id, {
      image: fileName,
    });
    return null;
  }
}
