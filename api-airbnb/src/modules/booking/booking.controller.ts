import { BookingService } from './booking.service';
import { Controller, Get, Post, Param, Put, Delete, HttpStatus, Body, ParseIntPipe, Req } from '@nestjs/common';
import { SkipAuth } from '../auth/skip.auth.decorator';
import { baseReturn } from 'src/common/base.return';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @SkipAuth()
  @Get()
  findAll() {
    return baseReturn(this.bookingService.findAll(), HttpStatus.OK);
  }

  @SkipAuth()
  @Get('/by-user/:user_id')
  findByUser(@Param('user_id', ParseIntPipe) user_id: number) {
    return baseReturn(this.bookingService.findByUserId(user_id), HttpStatus.OK);
  }

  @SkipAuth()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return baseReturn(this.bookingService.findById(id), HttpStatus.OK);
  }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const data = { ...createBookingDto, user_id: req.user.id };
    return baseReturn(this.bookingService.create(data), HttpStatus.CREATED);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookingDto: UpdateBookingDto, @Req() req) {
    return baseReturn(this.bookingService.updateBooking(id, updateBookingDto, req.user.id), HttpStatus.OK);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return baseReturn(this.bookingService.deleteBooking(id, req.user.id), HttpStatus.OK);
  }
}
