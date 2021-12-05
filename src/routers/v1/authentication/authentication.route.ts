import express from "express";
import * as controller from "./authentication.controller";

const router = express.Router();

router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);

export default router;
