import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { RoomEntity } from '../room/room.entity';

@Entity({
  name: 'bookings',
})
export class BookingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  room_id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  total_guests: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_booking_user',
  })
  user: UserEntity;

  @ManyToOne(() => RoomEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'room_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_booking_room',
  })
  room: RoomEntity;
}
