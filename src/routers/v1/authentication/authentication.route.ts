import express from "express";
import { verifyToken } from "middleware/auth.middleware";

import * as controller from "./authentication.controller";

const router = express.Router();

router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/update-password", verifyToken, controller.updatePassword);

export default router;
