import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { responseSucess } from './../../utils/response';
import { SkipAuth } from '../auth/skip.auth.decorator';
import { baseReturn } from './../../common/base.return';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMe(@Req() req) {
    return responseSucess(HttpStatus.OK, req.user);
  }

  @Delete()
  deleteAccount(@Req() req) {
    return baseReturn(this.userService.delete(req.user.id), HttpStatus.OK);
  }

  @SkipAuth()
  @Get('/paginate')
  searchAndPaginate(@Query() query: { pageIndex: number; pageSize: number }) {
    return baseReturn(this.userService.paginate(+query.pageIndex, +query.pageSize), HttpStatus.OK);
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    return baseReturn(this.userService.update(req.user.id, updateUserDto), HttpStatus.OK);
  }

  @SkipAuth()
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return baseReturn(this.userService.findById(id), HttpStatus.OK);
  }

  @SkipAuth()
  @Get('/search/:name')
  searchByName(@Param('name') name: string) {
    return baseReturn(this.userService.searchName(name), HttpStatus.OK);
  }

  @Post('/upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder().addFileTypeValidator({ fileType: /^image\//i }).build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Req() req,
  ) {
    return baseReturn(this.userService.uploadAvatar(file, req.user.id), HttpStatus.OK);
  }
}
