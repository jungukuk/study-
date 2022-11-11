import multer, { FileFilterCallback } from "multer"
import { Definition } from "src/config/definition"
import { logger } from "src/config/logger"
import path from "path"
import crypto from "crypto"
import { Request } from "express"
import { mkdirSync } from "fs"
import { DestinationCallback, FileNameCallback } from "src/@interface/IMulter"

const maxSize: number = Number(Definition.fileupload.maxsize)

/**
 * 정의한 mimetype과 동일한 파일만 필터링합니다.
 * @param fieldname rotue에서 정의한 필드이름입니다.
 * @param mimetype
 * @returns
 */
const fileMimeTypeFileter = (fieldname: string, mimetype: string) => {
  if (fieldname === "boardImg") {
    if (mimetype === "image/gif") return true
    if (mimetype === "image/png") return true
    if (mimetype === "image/jpg") return true
    if (mimetype === "image/jpeg") return true
  }
  return false
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (fileMimeTypeFileter(file.fieldname, file.mimetype)) {
    cb(null, true)
  } else {
    logger.error(`[FILE_UPLOAD_ERROR] The file type does not mactch - [${file.mimetype}] ${file.originalname}`)

    cb(null, false)
  }
}

/**
 * 추후 S3 업로드로 변경해야함
 * 1. S3에 이미지 저장
 * 2. 저장한 이름 DB에 저장
 * 3. 프론트에서 불러 올때 백앤드에서 S3이미지를 불러온 후 프론트에 전달
 */
const imgStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    const path = Definition.fileupload.imgDirname as string
    mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const customFilename: string = crypto.randomBytes(16).toString("hex") + path.extname(file.originalname)

    cb(null, `${customFilename}`)
  },
})

export const imgUpload = multer({
  storage: imgStorage,
  limits: { fieldSize: maxSize },
  fileFilter,
})
