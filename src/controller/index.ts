import ApiResponse from "src/utility/apiResponse"
import { IController } from "src/@interface/IController"
import ApiError from "src/utility/apiError"
import { readFile } from "fs/promises"
import { logger } from "src/config/logger"

export default class indexController {
  static indexPage: IController = async (req, res) => {
    try {
      ApiResponse.init(res)
    } catch (error: any) {
      console.log(error)
      ApiError.regist(error)
      ApiResponse.error(res, error)
    }
  }
  static showImgs: IController = async (req, res) => {
    try {
      const { src } = req.params
      const data = await readFile(`uploadFiles/img/${src}`)
      ApiResponse.end(res, data)
    } catch (error) {
      ApiError.regist(error)
      logger.error(error)
      ApiResponse.error(res, error)
    }
  }
}
