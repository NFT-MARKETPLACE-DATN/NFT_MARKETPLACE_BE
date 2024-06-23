import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { User } from './users.entity';
@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (User) => User.role)
    user: User[];
}
