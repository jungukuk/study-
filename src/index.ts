import app from "src/config/express"
import "src/config/db/mysql"
import "src/config/db/redis"
import { logger } from "src/config/logger"
import { Definition } from "src/config/definition"

const port = Definition.server.port || 4501
const mode = Definition.server.mode || process.env.NODE_MODE

app.listen(port, async () => {
  logger.info(`Server listening on port : ${port}`)
  logger.info(`Server MODE : ${mode}`)
})
