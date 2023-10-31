import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base.service';
import { BookingEntity } from './booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { MESSAGES } from './../../common/messages';

@Injectable()
export class BookingService extends BaseService<BookingEntity> {
  constructor(@InjectRepository(BookingEntity) private readonly bookingRepository: Repository<BookingEntity>) {
    super(bookingRepository);
  }

  async updateBooking(id: number, updateDto: UpdateBookingDto, user_id: number) {
    const result = await this.bookingRepository.update({ id: id, user_id: user_id }, updateDto);
    if (result.affected !== 0) {
      return null;
    }
    throw new BadRequestException(MESSAGES.NOT_ALLOWED);
  }

  async deleteBooking(id: number, user_id: number) {
    const result = await this.bookingRepository.delete({
      id: id,
      user_id: user_id,
    });
    if (result.affected !== 0) {
      return null;
    }
    throw new BadRequestException(MESSAGES.NOT_ALLOWED);
  }

  async findByUserId(user_id: number) {
    return this.bookingRepository.findBy({ user_id: user_id });
  }
}
