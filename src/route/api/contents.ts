import express from "express";
import boardController from "src/controller/user/board";
import { checkToken } from "src/middleware/token";

const router = express.Router();

router.post("/create", checkToken, boardController.create);
router.patch("/:contentId", checkToken, boardController.update);
router.delete("/:contentId", checkToken, boardController.delete);
router.get("/:contentId", checkToken, boardController.view);
router.get("/", checkToken, boardController.list);

export default router;
