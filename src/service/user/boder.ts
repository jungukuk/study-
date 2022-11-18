import { Definition } from "src/config/definition";
import DB from "src/utility/dbUtil";
const { name: dbName } = Definition.mysql;

/**
 * @param create 게시글을 추가합니다.
 * @param list   게시글 리스트를 출력합니다. (페이징네이션 O)
 * @param view   게시글의 디테일 페이지를 출력합니다.
 * @param update 게시글을 수정합니다.
 * @param delete 게시글을 삭제합니다. ( 실제 삭제 X 유저가 삭제된 게시글을 확인은 할 수 없으나, DB에는 남아 있어야 합니다. )
 */
export default class BoardService {
    static create = async (data: any) => {
        const dml = "INSERT INTO `tbContents`";
        const model = "(UserId, Title, TextContent)";
        const value = "VALUES (?,?,?)";

        const sql = [dml, model, value].join(" ");

        await DB.execute(dbName, sql, [
            data.userIdx,
            data.title,
            data.textContent,
        ]);
    };

    static list = async (data: any) => {
        const dql = "SELECT *";
        const model = "FROM `tbContents`";
        let value = "WHERE `IsDeleted` = ? LIMIT ? OFFSET ?";

        const sql = [dql, model, value].join(" ");

        const result = await DB.execute(dbName, sql, [
            data.isDelete,
            data.limit,
            data.offset,
        ]);
        return result;
    };

    static view = async (data: any) => {
        const dql = "SELECT *";
        const model = "FROM `tbContents`";
        const value = "WHERE `Id` = ?";

        const sql = [dql, model, value].join(" ");

        const contentInfo = await DB.execute(dbName, sql, [data.contentId]);
        return contentInfo[0];
    };

    static update = async (data: any) => {
        const dml = "UPDATE `tbContents`";
        let model = "SET `Title` = ?";
        model += ", `TextContent` = ?";
        const value = "WHERE `Id` = ?";

        const sql = [dml, model, value].join(" ");

        await DB.execute(dbName, sql, [
            data.title,
            data.textContent,
            data.contentId,
        ]);
    };

    static delete = async (data: any) => {
        const dml = "UPDATE `tbContents`";
        let model = "SET `IsDeleted` = ?";
        const value = "WHERE `Id` = ?";

        const sql = [dml, model, value].join(" ");

        await DB.execute(dbName, sql, [data.isDeleted, data.contentId]);
    };
}
