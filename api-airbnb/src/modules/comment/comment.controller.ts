import { Controller, Get, Post, Param, Put, Delete, HttpStatus, Body, ParseIntPipe, Req } from '@nestjs/common';
import { SkipAuth } from '../auth/skip.auth.decorator';
import { baseReturn } from 'src/common/base.return';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @SkipAuth()
  @Get()
  findAll() {
    return baseReturn(this.commentService.findAll(), HttpStatus.OK);
  }

  @SkipAuth()
  @Get('/by-room/:room_id')
  findByRoom(@Param('room_id', ParseIntPipe) room_id: number) {
    return baseReturn(this.commentService.findByRoomId(room_id), HttpStatus.OK);
  }

  @SkipAuth()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return baseReturn(this.commentService.findById(id), HttpStatus.OK);
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const data = { ...createCommentDto, user_id: req.user.id };
    return baseReturn(this.commentService.create(data), HttpStatus.CREATED);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto, @Req() req) {
    return baseReturn(this.commentService.updateComment(id, updateCommentDto, req.user.id), HttpStatus.OK);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return baseReturn(this.commentService.deleteComment(id, req.user.id), HttpStatus.OK);
  }
}
