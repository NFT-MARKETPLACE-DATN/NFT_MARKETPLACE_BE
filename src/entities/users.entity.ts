import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DefaultEntity } from "./default.entity";

@Entity("users")
export class User extends DefaultEntity {

    @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
