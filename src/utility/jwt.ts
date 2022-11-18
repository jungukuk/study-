import { Definition } from "src/config/definition";
import { sign, verify } from "jsonwebtoken";
export default class JWT {
    private static secretKey = Definition.jwt.secretKey;
    private static accessTokenOption = Definition.jwt.accessTokenOption;
    private static refreshTokenOption = Definition.jwt.refreshTokenOption;

    static createAccessToken(data: object) {
        try {
            return sign(data, this.secretKey, this.accessTokenOption);
        } catch (err) {
            throw new Error("accessToken error");
        }
    }

    static createRefreshToken(data: object) {
        try {
            return sign(data, this.secretKey, this.refreshTokenOption);
        } catch (err) {
            throw new Error("refreshToken error");
        }
    }

    static verifyToken(data: string) {
        try {
            const userInfo = verify(data, this.secretKey);
            return userInfo;
        } catch (err) {
            throw new Error("not authorized");
        }
    }
}
