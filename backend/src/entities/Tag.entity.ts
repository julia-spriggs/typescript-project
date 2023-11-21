import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import AdEntity from "./Ad.entity";

@Entity()
class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => AdEntity, (ad) => ad.tags, { cascade: true})
    @JoinTable()
    ads: AdEntity[];
}

export default Tag;