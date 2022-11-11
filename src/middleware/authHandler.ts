import { IMiddleware } from "src/@interface/IMddleware"
import redisService from "src/service/redis"
import { digitCode } from "src/utility/math"

export const setDisitCode: IMiddleware = async (req, res, next) => {
  try {
    const { redisKey } = req.body
    const code = digitCode(6)
    const status = await redisService.setDisitCode(redisKey, code)

    req.digitCode = { status: status === "OK", digitCode: code }
    next()
  } catch (error) {
    console.error(error)
    next("setDisitCode Error 2")
  }
}

export const getDisitCode: IMiddleware = async (req, res, next) => {
  try {
    const { redisKey } = req.body

    const code = await redisService.getVaule(redisKey)
    let status = true
    if (!code) {
      status = false
    }
    req.digitCode = { status, digitCode: code }
    next()
  } catch (error) {
    console.error(error)
    next("setDisitCode Error 2")
  }
}
