import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  authMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
