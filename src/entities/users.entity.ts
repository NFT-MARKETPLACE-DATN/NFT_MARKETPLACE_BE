import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from "./default.entity";
import { RoleEntity } from "./role.entity";
@Entity("users")
export class User extends DefaultEntity {
  @ManyToOne(() => RoleEntity, (RoleEntity) => RoleEntity.id , { eager: true })
  @JoinColumn({ name: 'role_id' }) // Tùy chỉnh tên cột khóa ngoại
  role: RoleEntity;

  @Column({
    name: "user_name", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  username: string;
  @Column({
    name: "address", 
    type: "varchar", 
    length: 255, 
    nullable: false,
  })
  address: string;
  
}
