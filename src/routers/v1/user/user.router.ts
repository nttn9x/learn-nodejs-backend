import express from "express";
import authMiddleware from "middleware/auth.middleware";

import * as controller from "./user.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/", controller.find);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
