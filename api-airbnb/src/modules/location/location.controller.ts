import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { baseReturn } from './../../common/base.return';
import { UpdateLocationDto } from './dto/update-location.dto';
import { SkipAuth } from '../auth/skip.auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @SkipAuth()
  @Get()
  findAll() {
    return baseReturn(this.locationService.findAll(), HttpStatus.OK);
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return baseReturn(this.locationService.create(createLocationDto), HttpStatus.CREATED);
  }

  @SkipAuth()
  @Get('/paginate')
  paginate(@Query() query: { pageIndex: number; pageSize: number }) {
    return baseReturn(this.locationService.paginate(+query.pageIndex, +query.pageSize), HttpStatus.OK);
  }

  @SkipAuth()
  @Get(':id')
  findById(@Param('id') id: string) {
    return baseReturn(this.locationService.findById(+id), HttpStatus.OK);
  }

  @Put(':id')
  update(@Body() updateLocationDto: UpdateLocationDto, @Param('id') id: string) {
    return baseReturn(this.locationService.update(+id, updateLocationDto), HttpStatus.OK);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return baseReturn(this.locationService.delete(+id), HttpStatus.OK);
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
    return baseReturn(this.locationService.upload(file, +body.id), HttpStatus.OK);
  }
}
