import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { RoleEntity } from "./role.entity";
@Entity("users")
export class User extends DefaultEntity {
  @ManyToOne(() => RoleEntity, (RoleEntity) => RoleEntity.id , { eager: true })
  @JoinColumn({ name: 'role_id' }) // Tùy chỉnh tên cột khóa ngoại
  roleID: RoleEntity;

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

}
