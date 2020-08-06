import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;
}