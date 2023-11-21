import type Tag from "../entities/Tag.entity";

export type TagCreateInput = Omit<Tag, "id">;