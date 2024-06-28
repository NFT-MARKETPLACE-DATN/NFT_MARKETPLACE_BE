import * as userRepository from "../repositories/userInfoRepository";
import { BaseResponse,GenericBaseResponse } from "models/base.response";
import {UserInfoModel , UpdateUserModel, Attribute} from "../models/userInfo.model";

 const userLogin = async (address:string): Promise<GenericBaseResponse<UserInfoModel>>=>{
    try {
       let checkUser = await userRepository.checkUser(address);
       let balanceSOL = null;
       if(!checkUser){
        checkUser =  await userRepository.addNewUser(address);
        if(!checkUser){
            return {
              success: false,
              data: null,
              message:' Invalid address faield to save user info to database',
              message_code:400
            }
        }
       }else{
          // balanceSOL = await userRepository.balanceSOL(address);
          // // console.log(balanceSOL);
          // if(checkUser.balance == balanceSOL) console.log("Balance not change");
          // else{
              balanceSOL = await userRepository.updateUserBalance(Number(checkUser.id));
              console.log(balanceSOL);
          // }
       }
       const user ={
        id: checkUser.id,
        is_delete: false,
        created_date: checkUser.created_date,
        modified_date: checkUser.modified_date,
        username: checkUser.username,
        address: checkUser.address,
        balance: balanceSOL?.balance ? (balanceSOL.balance/Math.pow(10, 9)) : (Number(checkUser.balance)/Math.pow(10, 9)),
        image: checkUser.image,
        background: checkUser.background,
        roleID: checkUser.roleID
       }

      return {
        success: true,
        data: user,
        message:'Get UserInfo success',
        message_code:400
      };
    } catch (error) {

        return {
          success: true,
          data: null,
          message:'Get UserInfo success',
          message_code:400
        };
    }
}
const getTransactionUser = async(userID:number,pageIndex:number,pageSize:number,order?:"DESC"|"ASC",search?:string) =>{
    try {
      const result = await userRepository.getManyTransaction(userID,pageIndex,pageSize,order,search);
      return result;
    } catch (error) {
      console.log(error);
      
    }
}
export {userLogin, getTransactionUser}