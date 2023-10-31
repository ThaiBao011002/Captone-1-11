import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity({
  name: 'rooms',
})
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LocationEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_room_location',
  })
  location: LocationEntity;

  @Column()
  location_id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  total_guests: number;

  @Column({ default: 0 })
  total_bedrooms: number;

  @Column({ default: 0 })
  total_beds: number;

  @Column({ default: 0 })
  total_bathrooms: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: true })
  has_washing_machine: boolean;

  @Column({ default: true })
  has_iron: boolean;

  @Column({ default: true })
  has_tv: boolean;

  @Column({ default: true })
  has_air_conditioner: boolean;

  @Column({ default: true })
  has_wifi: boolean;

  @Column({ default: true })
  has_kitchen: boolean;

  @Column({ default: true })
  has_parking: boolean;

  @Column({ default: true })
  has_pool: boolean;

  @Column({ default: true })
  has_ironing_board: boolean;

  @Column({ nullable: true })
  image: string;
}
