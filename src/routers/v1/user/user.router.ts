import express from "express";
import { verifyToken } from "routers/v1/middleware/auth.middleware";

import * as controller from "./user.controller";

const router = express.Router({ mergeParams: true });

router.post("/", controller.create);

router.use(verifyToken);

// Need to login
router.get("/", controller.find);
router.get("/:id", controller.get);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
