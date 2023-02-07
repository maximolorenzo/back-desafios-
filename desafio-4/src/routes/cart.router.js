import { Router } from "express";

import cartModel from "../dao/models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await cartModel.find().lean().exec();
  res.json({ carts });
});

router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await cartModel.findOne({ _id: id });
  res.json({ cart });
});

router.post("/", async (req, res) => {
  const cartNew = await cartModel.create();

  res.json({ status: "success", cartNew });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cartID = parseInt(req.params.cid);
  const productID = parseInt(req.params.pid);

  const cart = await cartModel.addProduct(cartID, productID);

  res.json({ status: "success", cart });
});

export default router;
