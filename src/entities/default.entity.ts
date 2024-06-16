import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "bool",
    default: false,
  })
  is_delete: boolean;

  @CreateDateColumn({
    nullable: false,
  })
  created_date: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  modified_date: Date;
}