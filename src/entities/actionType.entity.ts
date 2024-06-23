import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('acction_Type')
export class ActionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar", 
        length: 255, 
        nullable: true,
      })
    name: string;
}
