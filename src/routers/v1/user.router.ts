import express from "express";
import * as controller from "controllers/user.controller";

const router = express.Router();

// define the home page route
router.get("/", controller.find);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
