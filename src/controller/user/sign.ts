import { IDefinition } from "./../../@interface/IDefinition";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { IController } from "src/@interface/IController";
import SignService from "src/service/user/sign";
import redisService from "src/service/redis";
import JWT from "src/utility/jwt";
import ApiResponse from "src/utility/apiResponse";
import ApiError from "src/utility/apiError";
import nodemailer from "nodemailer";
import { digitCode } from "src/utility/math";

export default class signController {
    /**
     * 닉네임 중복 검사
     */
    static checkNick: IController = async (req, res) => {
        try {
            const { checkNick } = req.params;
            const isValid = await SignService.checkNick({ checkNick });

            if (isValid.SUCCESS) {
                throw new Error("nickName is already in use");
            }

            ApiResponse.result(res, StatusCodes.OK, {
                checkNick,
                message: "use nickname",
            });
        } catch (err: any) {
            ApiResponse.error(res, err);
        }
    };
    /**
     * 이메일 인증번호 보내기
     */
    static sendEmailDisitCode: IController = async (req, res) => {
        try {
            const { email } = req.body;
            const { digitCode } = req.digitCode;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "kinsng1599@gmail.com",
                    pass: "byxnurxqihxpqzlh",
                },
            });

            await transporter.sendMail({
                from: "ki141327612@gmail.com",
                to: email,
                subject: "이메일 인증",
                text: String(digitCode),
            });

            ApiResponse.result(res, StatusCodes.OK);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 이메일 인증번호 확인하기
     */
    static checkDisitCode: IController = async (req, res) => {
        try {
            const { digitCode } = req.body;
            const { status, digitCode: curDigitCode } = req.digitCode;

            if (!status) {
                throw new Error("expired code");
            }

            if (digitCode !== curDigitCode) {
                throw new Error("not matched code");
            }

            ApiResponse.result(res, StatusCodes.OK, {
                message: "certificated!",
            });
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 회원가입
     */
    static signUp: IController = async (req, res) => {
        try {
            const { nickname, email, pwd } = req.body;
            const salt = genSaltSync(10);
            const enPwd = hashSync(pwd, salt);
            const userInfo = { nickname, email, pwd: enPwd };

            SignService.signUp(userInfo);

            ApiResponse.result(res, StatusCodes.CREATED, {
                message: "created!",
            });
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 로그인
     * @return AccessToken, RefreshToken
     * 1. 이메일 패스워드가 db와 비교해서 다르면 에러
     * 2. 맞으면 패스워드는 삭제하고 나머지 info로 액세스 토큰, 리프레시 토큰 생성
     */
    static signin: IController = async (req, res) => {
        try {
            const { email, pwd } = req.body;
            const userInfo = await SignService.signIn({ email });

            if (!userInfo) {
                throw new Error("user not exist");
            }

            if (userInfo.IsDeleted) {
                throw new Error("already deleted user");
            }

            if (!compareSync(pwd, userInfo.Password)) {
                throw new Error("wrong password");
            }

            delete userInfo.Password;
            const accessToken: string = JWT.createAccessToken(userInfo);
            const refreshToken: string = JWT.createRefreshToken(userInfo);
            redisService.setRefreshToken(String(userInfo.Id), refreshToken);

            ApiResponse.result(res, StatusCodes.OK, {
                accessToken,
                refreshToken,
            });
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 회원 정보 조회
     * 1. 액세스토큰을 가지고 있는지 확인
     * 2. 액세스토큰이 유효한지 확인
     * 3. 유효하지 않다면 리프레시 토큰확인
     * 4. 리프레시 토큰이 유효하다면 액세스 토큰 발급
     * 5. 액세스 토큰으로 유저 정보 리턴
     */
    static userInfo: IController = async (req, res) => {
        try {
            const { userIdx } = req.userAuth;
            const userInfo = await SignService.userInfo(userIdx);
            ApiResponse.result(res, StatusCodes.OK, { userInfo });
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 회원 정보 수정
     * 수정을 하려면 토큰 확인
     * 기존 정보와 비교
     */
    static modifyInfo: IController = async (req, res) => {
        try {
            const { userIdx } = req.userAuth;
            const { nickname } = req.body;
            const userInfo = await SignService.userInfo(userIdx);

            if (!nickname) {
                throw new Error("nickname not exist");
            }

            if (userInfo.Nickname === nickname) {
                throw new Error("equel nickname");
            }

            SignService.modifyInfo({ nickname, userIdx });
            ApiResponse.result(res, StatusCodes.OK, { message: "modified!" });
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 회원 삭제
     * 접근 권한은 없으나 실제 DB에는 데이터가 존재해야 합니다.
     */
    static removeUser: IController = async (req, res) => {
        try {
            const { userIdx } = req.userAuth;
            SignService.removeUser({ isDeleted: 1, userIdx });
            ApiResponse.init(res);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };
}
