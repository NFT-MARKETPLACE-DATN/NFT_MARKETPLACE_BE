import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,Unique,OneToOne } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { User } from './users.entity';
import { ListedNFT } from './listedNFT.entity';
@Entity("nfts")
@Unique(['mintAddress','tokenAccount']) 
export class Nft extends DefaultEntity {

  @Column({
    name: "nft_name", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  nftName: string;
  @Column({
    name: "symbol", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  symbol: string;
  @Column({
    name: "image", 
    type: "varchar", 
    length: 255, 
    nullable: false,
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
    type: "json",
    nullable: true,
  })
  attribute: { trait_type: string; value: string }[];;
  @Column({
    name: "mint_address", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  mintAddress: string;// nft mint address
  @Column({
    name: "token_account", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  tokenAccount: string; //nft token account
  @Column({
    name: "metadata_url", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  metadataUrl: string;// nft mint address
  // @Column({ type: 'int',name: 'user_id'})
  // userID: number; // Đây là ID của RoleEntity
  // @Column({ type: 'int',name: 'user_created'})
  // userCreated: number;

  @ManyToOne(() => User, (User) => User.nfts , { eager: true })
  @JoinColumn({ name: 'user_id' }) // Tùy chỉnh tên cột khóa ngoại
  userID: User | Number;
  @ManyToOne(() => User, (User) => User.nfts , { eager: true })
  @JoinColumn({ name: 'user_created' }) // Tùy chỉnh tên cột khóa ngoại
  userCreated: User | Number;
  @OneToOne(()=>ListedNFT,(ListedNFT)=>ListedNFT.nftID)
  nftListed: ListedNFT;
  }
