import { 
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import CategoryEntity from "./Category.entity";
import Tag from './Tag.entity';

@Entity()
class AdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  picture: string;

  @Column()
  location: string;
  
  @Column()
  createdAt: string;

  @ManyToOne(() => CategoryEntity, (c) => c.ads, {nullable: false, onDelete: "CASCADE"})
  category: CategoryEntity;
  
  @ManyToMany(() => Tag, { cascade: ["insert", "update"] })
  @JoinTable()
  tags: Tag[];
}
export default AdEntity;