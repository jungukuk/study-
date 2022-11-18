import { checkToken } from "./../../middleware/token";
import express from "express";
import signController from "src/controller/user/sign";
import { setDisitCode, getDisitCode } from "src/middleware/authHandler";

const router = express.Router();

router.post("/up", signController.signUp);
router.post("/in", signController.signin);
router.get("/:checkNick", signController.checkNick);

router.post("/auth", setDisitCode, signController.sendEmailDisitCode);
router.post("/checkAuth", getDisitCode, signController.checkDisitCode);

router.get("/", checkToken, signController.userInfo);
router.patch("/editUser", checkToken, signController.modifyInfo);
router.delete("/delUser", checkToken, signController.removeUser);

export default router;
