import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';

@Entity({
  name: 'comments',
})
@Check(`"rate" >= 1 AND "rate" <= 5`)
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  room_id: number;

  @Column()
  comment_date: Date;

  @Column()
  content: string;

  @Column()
  rate: number;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_comment_user',
  })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'room_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_comment_room',
  })
  room: RoomEntity;
}
