import express from "express"

import signController from "src/controller/user/sign"
import { getDisitCode, setDisitCode } from "src/middleware/authHandler"

const router = express.Router()

router.post("/in", signController.signin)

router.post("/auth", getDisitCode, signController.checkDisitCode)
router.post("/auth/phone", setDisitCode, signController.sendPhoneDisitCode)

router.post("/up", signController.signUp)

export default router
