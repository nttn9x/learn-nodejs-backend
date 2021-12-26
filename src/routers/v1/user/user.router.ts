import express from "express";
import { verifyToken } from "routers/v1/middleware/auth.middleware";

import * as controller from "./user.controller";

const router = express.Router({ mergeParams: true });

router.post("/", controller.create);
router.get("/", verifyToken, controller.find);
router.get("/:id", verifyToken, controller.get);
router.patch("/:id", verifyToken, controller.update);
router.delete("/:id", verifyToken, controller.remove);

export default router;
