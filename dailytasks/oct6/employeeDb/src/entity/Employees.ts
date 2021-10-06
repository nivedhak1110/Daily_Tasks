import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Employees {

    @PrimaryGeneratedColumn()
    empId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    type: string;

}
