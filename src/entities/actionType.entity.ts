import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { TransactionUser } from './transactionUser.entity';
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
    @OneToMany(() => TransactionUser, (TransactionUser) => TransactionUser.acctionType)
    transactionUser: TransactionUser[];
}
