import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { IController } from "src/@interface/IController";
import SignService from "src/service/user/sign";
import redisService from "src/service/redis";
import JWT from "src/utility/jwt";
import ApiResponse from "src/utility/apiResponse";
import ApiError from "src/utility/apiError";
import nodemailer from "nodemailer";

export default class signController {
    /**
     * 닉네임 중복 검사
     */
    static checkNick: IController = async (req, res) => {
        try {
            const { nickname } = req.body;
            SignService.checkNick(nickname);
            ApiResponse.init(res);
        } catch (err: any) {
            throw Error("err");
        }
    };
    /**
     * 이메일 인증번호 보내기
     */
    static sendPhoneDisitCode: IController = async (req, res) => {
        try {
            const { email } = req.body;
            // const vaildCheck = email.indexOf("@");
            // if (!email || email.length === 0 || vaildCheck === -1) {
            //     throw Error('error');
            // }
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
                text: "랜덤 숫자",
            });

            ApiResponse.init(res);
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

            ApiResponse.send(res, digitCode === curDigitCode);
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
            const { email, pwd } = req.body;

            ApiResponse.init(res);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 로그인
     * @return AccessToken, RefreshToken
     */
    static signin: IController = async (req, res) => {
        try {
            const { email, pwd } = req.body;

            // // token 반환
            ApiResponse.send(res);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 회원 정보 조회
     */
    static userInfo: IController = async (req, res) => {
        try {
            ApiResponse.init(res);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };

    /**
     * 회원 정보 수정
     */
    static modifyInfo: IController = async (req, res) => {
        try {
            ApiResponse.init(res);
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
            ApiResponse.init(res);
        } catch (error: any) {
            console.log(error);
            ApiError.regist(error);
            ApiResponse.error(res, error);
        }
    };
}
