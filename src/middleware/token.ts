import { IMiddleware } from "./../@interface/IMddleware";
import JWT from "src/utility/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkToken: IMiddleware = async (req, res, next) => {
    try {
        const data: string = req.headers.authorization!;
        const token: string = data.split(" ")[1];

        if (!token) {
            throw new Error("accessToken not exist");
        }

        const userInfo: any = await JWT.verifyToken(token);

        req.userAuth = { userIdx: userInfo?.Id };
        next();
    } catch (err) {
        return new Error("token error");
    }
};
