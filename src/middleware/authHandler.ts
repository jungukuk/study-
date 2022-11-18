import { IMiddleware } from "src/@interface/IMddleware";
import redisService from "src/service/redis";
import { digitCode } from "src/utility/math";

export const setDisitCode: IMiddleware = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isVaild = email.indexOf("@");

        if (!email || email.length === 0 || isVaild === -1) {
            throw new Error("email error");
        }

        const authNum = digitCode(5);
        const result = await redisService.setDisitCode(email, authNum);
        req.digitCode = { status: result === "OK", digitCode: authNum };

        next();
    } catch (err) {
        throw new Error("error");
    }
};

export const getDisitCode: IMiddleware = async (req, res, next) => {
    try {
        const { email } = req.body;
        const code = await redisService.getVaule(email);
        req.digitCode = { status: Boolean(code), digitCode: code };

        next();
    } catch (err) {}
};
