import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { User } from './users.entity';
@Entity("nfts")
export class Nfts extends DefaultEntity {
@ManyToOne(() => User, (User) => User.id , { eager: true })
@JoinColumn({ name: 'user_id' }) // Tùy chỉnh tên cột khóa ngoại
userID: User;
  
  @Column({
    name: "nft_name", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  nftName: string;
  @Column({
    name: "image", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  image: string;
  @Column({
    name: "description", 
    type: "text", 
    nullable: true,
  })
  description: string;
  @Column({
    name: "attribute", 
    // type: "text", 
    nullable: true,
  })
  attribute: string;
  @Column({
    name: "mint_address", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  mintAddress: string;// nft mint address
  @Column({
    name: "token_account", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  tokenAcount: string; //nft token account
}
