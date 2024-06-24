import * as userRepository from "../repositories/userInfoRepository";
import { BaseResponse,GenericBaseResponse } from "models/base.response";
import {UserInfoModel , UpdateUserModel, Attribute} from "../models/userInfo.model";

export const userLogin = async (address:string): Promise<GenericBaseResponse<UserInfoModel>>=>{
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
          balanceSOL = await userRepository.balanceSOL(address);
          // console.log(balanceSOL);
          if(checkUser.balance == balanceSOL) console.log("Balance not change");
          else{
              const updateBalance = await userRepository.updateUserBalance(address,balanceSOL);
              console.log(updateBalance);
          }
       }
       const user ={
        id: checkUser.id,
        is_delete: false,
        created_date: checkUser.created_date,
        modified_date: checkUser.modified_date,
        username: checkUser.username,
        address: checkUser.address,
        balance: balanceSOL ? balanceSOL : checkUser.balance,
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