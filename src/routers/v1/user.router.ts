import express from "express";
import * as controller from "controllers/user.controller";

const router = express.Router();

// define the home page route
router.get("/", controller.find);
router.post("/", controller.create);
router.patch("/:id", controller.find);
router.delete("/:id", controller.find);

export default router;
