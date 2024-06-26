import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { TransfersUser } from './transfersUser.entity';
@Entity('acction_type')
export class ActionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar", 
        length: 255, 
        nullable: true,
      })
    name: string;
    @OneToMany(() => TransfersUser, (TransfersUser) => TransfersUser.acctionType)
    transactionUser: TransfersUser[];
}
