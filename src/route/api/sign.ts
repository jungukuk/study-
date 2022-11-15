import { Definition } from "./../../config/definition";
import express from "express";
import signController from "src/controller/user/sign";

const router = express.Router();

router.post("/checkNick", signController.checkNick);
router.post("/auth", signController.sendPhoneDisitCode);
router.post("/up", signController.signUp);

export default router;
