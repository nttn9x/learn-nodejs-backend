import express from "express";
import { verifyToken } from "routers/v1/middleware/auth.middleware";

import * as organizationController from "routers/v1/organization/organization.controller";
import * as userController from "routers/v1/user/user.controller";

const router = express.Router();

router.use(verifyToken);

router.post("/", organizationController.create);
router.get("/", organizationController.find);
router.get("/:id", organizationController.get);
router.patch("/:id", organizationController.update);
router.delete("/:id", organizationController.remove);

router.get("/:organizationId/users", userController.find);

export default router;
