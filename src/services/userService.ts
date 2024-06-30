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
              // console.log(balanceSOL);
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
const getTransactionUser = async(userID:number,pageIndex:number,pageSize:number,order?:"DESC"|"ASC",search?:number) =>{
    try {
      const result = await userRepository.getManyTransaction(userID,pageIndex,pageSize,order,search);
      return result;
    } catch (error:any) {
      console.log(error);
      return error.message
    }
}
const userUpdateBackground = async (userID :number, background:string):Promise<GenericBaseResponse<UserInfoModel>> =>{
  const user = await userRepository.updateUserBackground(userID,background);
  if(user){
    const userInfo ={
      id: user.id,
      is_delete: false,
      created_date: user.created_date,
      modified_date: user.modified_date,
      username: user.username,
      address: user.address,
      balance: (Number(user.balance)/Math.pow(10, 9)),
      image: user.image,
      background: user.background,
      roleID: user.roleID
     }
     return {
        success: true,
        data: userInfo,
        message:'Update user background success',
        message_code:400
     }
  }else{
    return {
      success: false,
      data: null,
      message:'Update user background fail',
      message_code:400
   }
  }
  
  // return user;

}
export {userLogin, getTransactionUser,userUpdateBackground}