import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn ,Unique,OneToMany} from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { RoleEntity } from "./role.entity";
import { Nft } from './nfts.entity';
@Entity("users")
@Unique(['address']) 
export class User extends DefaultEntity {

  @Column({
    name: "user_name", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  username: string;
  @Column({
    name: "address", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  address: string;
  @Column({
    name: "balance", 
    type: "decimal", 
    precision: 65, scale: 0,
    nullable: true,
  })
  balance: number;
  @Column({
    name: "image", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  image: string;
  @Column({
    name: "background", 
    type: "varchar", 
    length: 255, 
    nullable: true,
  })
  background: string;
  
  @Column({ type: 'int',name: 'role_id'})
  roleID: number; // Đây là ID của RoleEntity
  @ManyToOne(() => RoleEntity, (RoleEntity) => RoleEntity.id , { eager: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id', }) // Tùy chỉnh tên cột khóa ngoại
  role: RoleEntity 

  @OneToMany(() => Nft, nft => nft.userID)
  nfts: Nft[];

  @OneToMany(() => Nft, nft => nft.userCreated)
  createdNfts: Nft[];
  
}
