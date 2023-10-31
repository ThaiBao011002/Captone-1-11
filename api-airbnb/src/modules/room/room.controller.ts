import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpStatus,
  Query,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { SkipAuth } from '../auth/skip.auth.decorator';
import { baseReturn } from 'src/common/base.return';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @SkipAuth()
  @Get()
  findAll() {
    return baseReturn(this.roomService.findAll(), HttpStatus.OK);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return baseReturn(this.roomService.create(createRoomDto), HttpStatus.CREATED);
  }

  @SkipAuth()
  @Get('/by-location')
  getByLocation(@Query() query: { location_id: number }) {
    return baseReturn(this.roomService.findByLocation(+query.location_id), HttpStatus.OK);
  }

  @SkipAuth()
  @Get('/paginate')
  paginate(@Query() query: { pageIndex: number; pageSize: number }) {
    return baseReturn(this.roomService.paginate(+query.pageIndex, +query.pageSize), HttpStatus.OK);
  }

  @SkipAuth()
  @Get(':id')
  findById(@Param('id') id: string) {
    return baseReturn(this.roomService.findById(+id), HttpStatus.OK);
  }

  @Put(':id')
  update(@Body() updateRoomDto: UpdateRoomDto, @Param('id') id: string) {
    return baseReturn(this.roomService.update(+id, updateRoomDto), HttpStatus.OK);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return baseReturn(this.roomService.delete(+id), HttpStatus.OK);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: /^image\//i }).build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    return baseReturn(this.roomService.upload(file, +body.id), HttpStatus.OK);
  }
}
