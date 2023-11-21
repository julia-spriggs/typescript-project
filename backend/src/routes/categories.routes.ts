import CategoryEntity from "../entities/Category.entity";
import CategoryServices from "../services/categories.services"
import { Request, Response, Router } from "express";
import { CategoryCreateInput } from "../types/categories";

const router = Router();

/**======================
 *?    création des routes ici
 *========================**/

router.post("/create", async function (req: Request, res: Response) {
  try {
    const { name, ads }: CategoryCreateInput = req.body;
    const result: CategoryEntity[] = await new CategoryServices().create({
      name,
      ads
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const categories: CategoryEntity[] = await new CategoryServices().list();
  res.send(categories);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const category: CategoryEntity = await new CategoryServices().find(id);
    res.send(category);
  } catch (err: any) {
    res.send({ message: err.message, success: false })
  }
});
router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<CategoryEntity> = req.body;
  try {
    const category: CategoryEntity = await new CategoryServices().update(id, data);
    res.send(category);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }

});
router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const categories: CategoryEntity[] = await new CategoryServices().delete(id);
    res.send(categories);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

export default router;
