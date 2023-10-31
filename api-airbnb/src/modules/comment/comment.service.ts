import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { MESSAGES } from './../../common/messages';

@Injectable()
export class CommentService extends BaseService<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {
    super(commentRepository);
  }

  async updateComment(id: number, updateDto: UpdateCommentDto, user_id: number) {
    const result = await this.commentRepository.update({ id: id, user_id: user_id }, updateDto);
    if (result.affected !== 0) {
      return null;
    }
    throw new BadRequestException(MESSAGES.NOT_ALLOWED);
  }

  async deleteComment(id: number, user_id: number) {
    const result = await this.commentRepository.delete({
      id: id,
      user_id: user_id,
    });
    if (result.affected !== 0) {
      return null;
    }
    throw new BadRequestException(MESSAGES.NOT_ALLOWED);
  }

  async findByRoomId(room_id: number) {
    return this.commentRepository.findBy({ room_id: room_id });
  }
}
