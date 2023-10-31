import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, BaseEntity } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  pass_word: string;

  @Column()
  phone: string;

  @Column()
  birth_day: string;

  @Column({ default: true })
  gender: boolean;

  @Column({ default: 'USER' })
  role: string;

  @Column({ nullable: true })
  avatar: string;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    if (this.pass_word) {
      const salt = genSaltSync(10);
      this.pass_word = hashSync(this.pass_word, salt);
    }
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.pass_word);
  }
}
