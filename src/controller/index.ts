import ApiResponse from "src/utility/apiResponse";
import { IController } from "src/@interface/IController";
import ApiError from "src/utility/apiError";
import { readFile } from "fs/promises";
import { logger } from "src/config/logger";

export default class indexController {
    static indexPage: IController = async (req, res) => {
        try {
            ApiResponse.init(res);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 경로를 입력받아 이미지 파일을 출력합니다.
     */
    static showImgs: IController = async (req, res) => {};
}
