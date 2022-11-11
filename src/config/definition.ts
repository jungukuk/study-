import { config } from "dotenv"
import { IDefinition } from "../@interface/IDefinition"
config({ path: ".env.public" })

export const Definition: IDefinition = {
  server: {
    port: Number(process.env.SERVER_PORT),
    mode: process.env.NODE_MODE!,
    modeDev: process.env.NODE_MODE_DEV!,
    modePro: process.env.NODE_MODE_PRO!,
    swagger: "on",
  },
  jwt: {
    secretKey: "hauto",
    accessTokenOption: {
      algorithm: "HS256",
      expiresIn: "2h",
    },
    refreshTokenOption: {
      algorithm: "HS256",
      expiresIn: "7d",
    },
  },
  fileupload: {
    imgDirname: process.env.FILE_IMGDIR!,
    maxsize: process.env.FILE_MAXSIZE!,
    description: process.env.FILE_MAXSIZE_DESC!,
  },
  mysql: {
    name: process.env.MYSQL_NAME!,
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    port: Number(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASS!,
    database: process.env.MYSQL_DATABASE!,
    connectionLimit: Number(process.env.MYSQL_CONNECTIONLIMIT),
  },
  redis: {
    protocol: "redis://",
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
}
