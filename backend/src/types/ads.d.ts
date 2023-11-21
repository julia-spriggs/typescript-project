import type AdEntity from "../entities/Ad.entity";

  export type AdCreateInput = Omit<AdEntity, "id">;