import express from "express"

import indexController from "src/controller/index"

const router = express.Router()

router.get("/", indexController.indexPage)
router.get("/img/:src", indexController.showImgs)

export default router
