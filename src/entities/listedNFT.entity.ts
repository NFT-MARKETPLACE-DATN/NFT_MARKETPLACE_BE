import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { User } from './users.entity';
import { Nfts } from './nfts.entity';
@Entity("nfts")
export class ListNFT extends DefaultEntity {
// @ManyToOne(() => User, (User) => User.id , { eager: true })
// @JoinColumn({ name: 'user_id' }) // Tùy chỉnh tên cột khóa ngoại
// userID: User;

@OneToOne(() => Nfts, (Nfts) => Nfts.id , { eager: true })
@JoinColumn({ name: 'nft_id' }) // Tùy chỉnh tên cột khóa ngoại
nftID: Nfts;
@Column({
    type: "bool",
    default: false,
    name:"price"
  })
  price: boolean;

@Column({
    type: "bool",
    default: false,
    name:"is_list"
  })
  isList: boolean;
  @Column({
    type: "number",
    default: false,
    name:"trending"
  })
  trending: number;
}
