import * as redis from "redis"
import { logger } from "../logger"
;(async () => {
  try {
    const redisClient = redis.createClient({ legacyMode: true })

    redisClient.connect().then() // redis v4 연결 (비동기)
    const redisCli = redisClient.v4
    const redisServer: any = await redisCli.INFO("Server")
    const redisVersion = redisServer.split("\r\n")[1].split("redis_version:")[1]

    logger.info(`Redis Connection : Version = ${redisVersion}`)
    redisCli.QUIT()
  } catch (error: any) {
    logger.error(`Redis Connection Error : [${error.code}] ${error.message}`)
    process.exit(1)
  }
})()

const redisClient = redis.createClient({ legacyMode: true })

redisClient.connect().then() // redis v4 연결 (비동기)
const redisCli = redisClient.v4

export default redisCli
