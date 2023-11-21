import { Repository } from "typeorm";
import { AdCreateInput } from "../types/ads";
import AdEntity from "../entities/Ad.entity";
import datasource from "../lib/datasource";

// const db = new sqlite3.Database("../../typescript-project.sqlite");
class AdServices {
  db: Repository<AdEntity>;

  constructor() {
    this.db = datasource.getRepository(AdEntity);
  }
  async create(data: AdCreateInput) {
    const newAd = this.db.create(data);
    await this.db.save(newAd);
    return await this.list();
  }
  async list() {
    return await this.db.find();
    // return new Promise<Ad[]>((resolve, reject) => {
    //   this.db.all<Ad>("SELECT * FROM ads", (err, rows) => {
    //     if (err) {
    //       reject(err.message);
    //     }
    //     resolve(rows);
    //   });
    // });
  }

  async find(id: number) {
    const ad = await this.db.findOneBy({ id });
    if (!ad) {
      throw new Error("L'annonce n'existe pas");
    }
    return ad;
  }

  async delete(id: number) {
    const ad = await this.find(id);
    await this.db.remove(ad);
    return await this.list();

  }
  async update(id: number, data: Partial<AdEntity>) {
    const ad = await this.find(id);
    const newInfo = this.db.merge(ad, data);
    return await this.db.save(newInfo);
  } 
}

export default AdServices;
