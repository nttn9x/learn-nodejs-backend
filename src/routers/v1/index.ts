import express from "express";
import user from "./user.router";
import authentication from "./authentication.route";

const router = express.Router();

router.use("/auth", authentication);
router.use("/user", user);

export default router;
