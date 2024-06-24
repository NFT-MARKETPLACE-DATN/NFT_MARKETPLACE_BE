import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { User } from './users.entity';
import { Nft } from './nfts.entity';
@Entity("list_nft")
export class ListedNFT extends DefaultEntity {
// @ManyToOne(() => User, (User) => User.id , { eager: true })
// @JoinColumn({ name: 'user_id' }) // Tùy chỉnh tên cột khóa ngoại
// userID: User;

@OneToOne(() => Nft, (Nft) => Nft.id , { eager: true })
@JoinColumn({ name: 'nft_id' }) // Tùy chỉnh tên cột khóa ngoại
nftID: Nft | Number;
@Column({
    type: "decimal", 
    precision: 65, scale: 0,
    default: false,
    name:"price"
  })
  price: number;

@Column({
    type: "bool",
    default: false,
    name:"is_list"
  })
  isList: boolean;
  @Column({
    type: "bool",
    default: null,
    name:"is_trending"
  })
  isTrending: boolean;
}
