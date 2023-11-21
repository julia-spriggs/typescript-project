import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import AdEntity from './Ad.entity';

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany (() => AdEntity, (a) => a.category)
    ads: AdEntity[];
}

export default CategoryEntity;