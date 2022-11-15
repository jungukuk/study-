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
    static create = async (data: any) => {};
    static list = async (data: any) => {};
    static view = async (data: any) => {};
    static update = async (data: any) => {};
    static delete = async (data: any) => {};
}
