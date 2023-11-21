import datasource from "../lib/datasource";
import Tag from "../entities/Tag.entity";
import { In, Repository } from 'typeorm';
import { TagCreateInput } from "../types/tags";

class TagServices {
    db: Repository<Tag>;
    constructor() {
        this.db = datasource.getRepository(Tag);
    }
    async create(data: TagCreateInput) {
        const newTag = this.db.create(data);
        await this.db.save(newTag);
        return await this.list();
    }
    async list(tagIds?: string[]) {
        return await this.db.find({
            where: {
                id: tagIds && tagIds.length > 0 ? In(tagIds.map((t) => +t)) : undefined,
            },
        });
    }
    async find(id: number) {
        const tag = await this.db.findOne({ where: { id }});
        if (!tag) {
            throw new Error("Le tag n'existe pas");
        }
        return tag;
    }
    async delete(id: number) {
        const tag = await this.find(id);
        await this.db.remove(tag);
        return await this.list();
    }
    async update(id: number, data: Partial<Tag>) {
        const tag = await this.find(id);
        const newInfo = this.db.merge(tag, data);
        return await this.db.save(newInfo);
    }

}

export default TagServices