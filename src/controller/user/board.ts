import { StatusCodes } from "http-status-codes";
import BoardService from "src/service/user/boder";
import { IController } from "./../../@interface/IController";
import ApiError from "src/utility/apiError";
import ApiResponse from "src/utility/apiResponse";

export default class boardController {
    /**
     * 게시글 추가
     */
    static create: IController = async (req, res) => {
        try {
            const { userIdx } = req.userAuth;
            const { title, textContent } = req.body;

            if (!title || !textContent) {
                throw new Error("title or textContent not exist");
            }

            BoardService.create({
                userIdx,
                title,
                textContent,
            });

            ApiResponse.result(res, StatusCodes.CREATED, {
                message: "created!",
            });
        } catch (err) {
            console.log(err);
            ApiError.regist(err);
            ApiResponse.error(res, err);
        }
    };

    /**
     * 게시글 수정
     */
    static update: IController = async (req, res) => {
        try {
            const { title, textContent } = req.body;
            const { contentId } = req.params;
            if (!title || !textContent) {
                throw new ApiError(
                    "code_name",
                    StatusCodes.BAD_REQUEST,
                    "title and textContent not exist"
                );
            }

            await BoardService.update({ title, textContent, contentId });

            ApiResponse.result(res, StatusCodes.OK, { message: "modified!" });
        } catch (err) {
            console.log(err);
            ApiError.regist(err);
            ApiResponse.error(res, err);
        }
    };

    /**
     * 게시글 삭제
     * 토큰확인
     *
     */
    static delete: IController = async (req, res) => {
        try {
            const { contentId } = req.params;

            BoardService.delete({ isDeleted: 1, contentId });

            ApiResponse.result(res, StatusCodes.OK, { message: "deleted!" });
        } catch (err) {
            console.log(err);
            ApiError.regist(err);
            ApiResponse.error(res, err);
        }
    };

    /**
     * 게시글 디테일 정보
     */
    static view: IController = async (req, res) => {
        try {
            const { contentId } = req.params;
            const result = await BoardService.view({ contentId: contentId });
            console.log(result);
            if (result.IsDeleted) {
                throw new ApiError(
                    "code_name",
                    StatusCodes.BAD_REQUEST,
                    "deleted content"
                );
            }
            ApiResponse.result(res, StatusCodes.OK, {
                result,
                message: "content information",
            });
        } catch (err) {
            console.log(err);
            ApiError.regist(err);
            ApiResponse.error(res, err);
        }
    };

    /**
     * 게시글 리스트 조회(페이지네이션ㅇ)
     */
    static list: IController = async (req, res) => {
        try {
            const { limit, offset } = req.body;

            if (!limit || !offset) {
                throw new ApiError(
                    "code_name",
                    StatusCodes.BAD_REQUEST,
                    "limit or offset not exist"
                );
            }

            const result = await BoardService.list({
                isDelete: 0,
                limit: +limit,
                offset: +offset,
            });

            ApiResponse.result(res, StatusCodes.OK, {
                result,
                message: "content list",
            });
        } catch (err) {
            console.log(err);
            ApiError.regist(err);
            ApiResponse.error(res, err);
        }
    };
}
