import { Definition } from "src/config/definition";
import { ISignIn, ISignUp } from "src/interface/user/ISign";
import DB from "src/utility/dbUtil";
const { name: dbName } = Definition.mysql;

export default class SignService {
  static signUp = async (data: ISignUp) => {
    const dml = "INSERT INTO `tbUser`";
    const model = "(`CarNumber`, `Email`, `Pwd`, `Phone`)";
    const value = "VALUES (?,?,?,?)";
    const sql = [dml, model, value].join(" ");

    return await DB.execute(dbName, sql, [data.carNumber, data.email, data.pwd, data.phone]);
  };

  static signIn = async (data: ISignIn) => {
    const dql = "SELECT `Pwd`, `IDX_USER`, `CarNumber`, `Email`, `Phone`, `ProfileImg`";
    const model = "FROM `tbUser`";
    const value = "WHERE `CarNumber` = ?";
    const sql = [dql, model, value].join(" ");

    const userInfo = await DB.execute(dbName, sql, [data.carNumber]);

    return userInfo[0];
  };

  //   static select = async (data: IFaqBaseDTO) => {
  //     const dql = "SELECT `faqIdx`, `faqTitle`, `faqContent`, `faqCategory`";
  //     const model = "FROM `tbFaq`";
  //     const value = "WHERE `faqIdx` = ?";
  //     const sql = [dql, model, value].join(" ");

  //     return await DB.execute(dbName, sql, [data.faqIdx]);
  //   };

  //   static update = async (data: IFaqDTO) => {
  //     const dml = "UPDATE `tbFaq`";
  //     const model = "SET `faqTitle` = ?, `faqContent` = ?, `faqCategory` = ?";
  //     const value = "WHERE `faqIdx` = ?";
  //     const sql = [dml, model, value].join(" ");

  //     return await DB.execute(dbName, sql, [data.faqTitle, data.faqContent, data.faqCategory, data.faqIdx]);
  //   };

  //   static delete = async (data: IFaqBaseDTO) => {
  //     const dml = "DELETE FROM `tbFaq`";
  //     const value = "WHERE `faqIdx` = ?";
  //     const sql = [dml, value].join(" ");

  //     return await DB.execute(dbName, sql, [data.faqIdx]);
  //   };
}
