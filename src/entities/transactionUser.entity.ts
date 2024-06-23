import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { User } from './users.entity';
import { ActionType } from "./actionType.entity";
@Entity("transaction")
export class TransactionUser extends DefaultEntity {
@ManyToOne(() => User, (User) => User.id , { eager: true })
@JoinColumn({ name: 'user_id' }) // Tùy chỉnh tên cột khóa ngoại
userID: User | Number;
@Column({
    name: "tx_id", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  txID: string;
  @ManyToOne(() => ActionType, (ActionType) => ActionType.id , { eager: true })
  @JoinColumn({ name: 'action_type' }) // Tùy chỉnh tên cột khóa ngoại
  acctionType: ActionType | Number; 
}
