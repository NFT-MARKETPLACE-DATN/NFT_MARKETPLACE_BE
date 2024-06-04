import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
