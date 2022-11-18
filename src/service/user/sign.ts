import { Definition } from "src/config/definition";
import DB from "src/utility/dbUtil";
const { name: dbName } = Definition.mysql;
/**
 * 회원가입 로직
 * 1. FE - 닉네임 입력
 * 2. BE - 닉네임 중복 체크
 * 3. FE - 비밀번호 입력 및 비밀번호 정규표현식 체크 및 무결성 확인
 * 4. FE - 이메일 입력
 * 5. BE - 이메일로 인증번호 전송
 * 6. FE - 이메일에 온 인증번호 확인 후 입력
 * 7. BE - 인증번호 검증
 * 8. BE - 회원가입
 * 8. BE - (Advanced) 인증 여부 확인 후 회원가입
 */

/**
 * @param sendEmailDisitCode
 * @param checkDisitCode
 * @param signUp
 * @param signIn
 * @param userInfo
 * @param modifyInfo
 * @param removeUser
 */
export default class SignService {
    static checkNick = async (data: any) => {
        const sql =
            "SELECT EXISTS (SELECT * FROM `tbUser` WHERE `Nickname` = ?) AS SUCCESS";

        const result = await DB.execute(dbName, sql, [data.checkNick]);
        return result[0];
    };
    static sendEmailDisitCode = async (data: any) => {};
    static checkDisitCode = async (data: any) => {};

    static signUp = async (data: any) => {
        const dml = "INSERT INTO `tbUser`";
        const model = "(`Nickname`, `Email`, `Password`)";
        const value = "VALUES (?,?,?)";
        const sql = [dml, model, value].join(" ");

        return await DB.execute(dbName, sql, [
            data.nickname,
            data.email,
            data.pwd,
        ]);
    };
    static signIn = async (data: any) => {
        const dql = "SELECT `Id`, `Nickname`, `Email`, `Password`, `IsDeleted`";
        const model = "FROM `tbUser`";
        const value = "WHERE `Email` = ?";

        const sql = [dql, model, value].join(" ");

        const userinfo = await DB.execute(dbName, sql, [data.email]);
        return userinfo[0];
    };
    static userInfo = async (data: any) => {
        const dql =
            "SELECT `Id`, `Nickname`, `Email`, `IsDeleted`, `Created_at`";
        const model = "FROM `tbUser`";
        const value = "WHERE `Id` = ?";

        const sql = [dql, model, value].join(" ");

        const userinfo = await DB.execute(dbName, sql, [data]);
        return userinfo[0];
    };
    static modifyInfo = async (data: any) => {
        const dml = "UPDATE `tbUser`";
        let model = "SET `Nickname` = ?";
        // model += "`Id` = ?,";
        // model += "`Id` = ?";
        const value = "WHERE `Id` = ?";
        const sql = [dml, model, value].join(" ");

        const userinfo = await DB.execute(dbName, sql, [
            data.nickname,
            data.userIdx,
        ]);
        return userinfo[0];
    };
    static removeUser = async (data: any) => {
        const dml = "UPDATE `tbUser`";
        let model = "SET `IsDeleted` = ?";
        // model += "`Id` = ?,";
        // model += "`Id` = ?";
        const value = "WHERE `Id` = ?";
        const sql = [dml, model, value].join(" ");

        const userinfo = await DB.execute(dbName, sql, [
            data.isDeleted,
            data.userIdx,
        ]);
        return userinfo[0];
    };
}
