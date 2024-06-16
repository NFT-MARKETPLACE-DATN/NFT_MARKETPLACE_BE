import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { User } from './users.entity';
@Entity("nfts")
export class TransactionUser extends DefaultEntity {
@ManyToOne(() => User, (User) => User.id , { eager: true })
@JoinColumn({ name: 'user_id' }) // Tùy chỉnh tên cột khóa ngoại
userID: User;
@Column({
    name: "tx_id", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  txID: string;
@Column({
    name: "action_tx", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  actionTx: string;  
}
