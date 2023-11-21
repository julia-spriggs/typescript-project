import { Router, Request, Response } from "express";
import { AdCreateInput } from "../types/ads";
import AdServices from "../services/ads.services";
import AdEntity from "../entities/Ad.entity";

const router = Router();

router.post("/create", async function (req: Request, res: Response) {
  const {
    description,
    location,
    createdAt,
    owner,
    picture,
    price,
    title,
    category,
    tags,
  }: AdCreateInput = req.body;

  try {
    const result: AdEntity[] = await new AdServices().create({
      description,
      location,
      createdAt,
      owner,
      picture,
      price,
      title,
      category,
      tags,
    });
    res.send(result);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});

router.get("/list", async function (req: Request, res: Response) {
  const ads: AdEntity[] = await new AdServices().list();
  res.send(ads);
});

router.get("/find/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ad: AdEntity = await new AdServices().find(id);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err, success: false });
  }
});

router.patch("/update/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  const data: Partial<AdEntity> = req.body;
  //! prévoir que on envoi pas tout le data, mais que on envoi que les clés qui ont été renseignées
  try {
    const ad: AdEntity = await new AdServices().update(id, data);
    res.send(ad);
  } catch (err: any) {
    res.send({ message: err.message, success: false });
  }
});
router.delete("/delete/:id", async function (req: Request, res: Response) {
  const id = +req.params.id;
  try {
    const ads: AdEntity[] = await new AdServices().delete(id);
    res.send(ads);
  } catch (err: any) {
    res.send({ message: err, success: false });
  }
});

export default router;
