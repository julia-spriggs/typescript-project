import { Repository } from "typeorm";
import { CategoryCreateInput } from "../types/categories";
import CategoryEntity from "../entities/Category.entity"
import datasource from "../lib/datasource";

class CategoryServices {
    db: Repository<CategoryEntity>;
  
    constructor() {
      this.db = datasource.getRepository(CategoryEntity);
    }
    async create(data: CategoryCreateInput) {
        const newCategory = this.db.create(data);
        await this.db.save(newCategory);
        return await this.list();
    }
    async list() {
        return await this.db.find();
    }
    async find(id: number) {
        const category = await this.db.findOneBy({ id });
        if (!category) {
            throw new Error("L'annonce n'existe pas");
        }
        return category;
    }
    async delete(id: number) {
        const category = await this.find(id);
        await this.db.remove(category);
        return await this.list();
    }
    async update(id: number, data: Partial<CategoryEntity>) {
        const category = await this.find(id);
        const newInfo = this.db.merge(category, data);
        return await this.db.save(newInfo);
    }
}

export default CategoryServices;