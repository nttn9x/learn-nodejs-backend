import express from "express";
import * as controller from "controllers/authentication.controller";

const router = express.Router();

router.post("/login", controller.login);

export default router;
