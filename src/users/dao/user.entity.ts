import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { type } from 'os';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dob: Date;

    @Column()
    address: string;

    @Column("varchar", { length: 200 })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
}