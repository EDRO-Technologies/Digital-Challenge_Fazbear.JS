import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date; 


}

export class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
