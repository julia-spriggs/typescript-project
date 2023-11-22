import { DataSource } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import Category from "../entities/Category.entity";
import Tag from '../entities/Tag.entity';

export default new DataSource({
  type: "sqlite",
  database: "typescript-project-orm.sqlite",
  entities: [AdEntity, Category, Tag],
  synchronize: true,//à ne pas utiliser en production
  logging: ["error", "query"] // ne pas utiliser en production
});
