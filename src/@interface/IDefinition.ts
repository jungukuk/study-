import { SignOptions } from "jsonwebtoken"

interface serverOption {
  port: number
  mode: string
  modeDev: string
  modePro: string
  swagger: string
}
interface fileuploadOption {
  imgDirname: string
  maxsize: string
  description: string
}
interface mysqlOption {
  name: string
  host: string
  user: string
  port: number
  password: string
  database: string
  connectionLimit: number
}

type redisProtocol = "redis://"

interface redisOption {
  protocol: redisProtocol
  username: string | undefined
  password: string | undefined
  host: string | undefined
  port: string | undefined
}

interface jwtOption {
  secretKey: string
  accessTokenOption: SignOptions
  refreshTokenOption: SignOptions
}

export interface IDefinition {
  server: serverOption
  fileupload: fileuploadOption
  jwt: jwtOption
  mysql: mysqlOption
  redis: redisOption
}
