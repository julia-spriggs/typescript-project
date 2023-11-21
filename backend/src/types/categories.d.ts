import type CategoryEntity from "../entities/Category.entity";

export type CategoryCreateInput = Omit<CategoryEntity, "id">;