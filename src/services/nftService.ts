import * as nftRepository from "../repositories/nftInfoRepository";
import { NftInfoModel,GenericNftResponse } from "models/nftInfo.model";
import { BaseResponse,GenericBaseResponse } from "models/base.response";
import * as userRepository from "../repositories/userInfoRepository";

const createNft = async (userID:number,data:any):Promise<BaseResponse> =>{
   const result =  await nftRepository.addNewNft(userID,data);
   if(result.success && result.nftID){
    await nftRepository.addTransaction(1,data.transaction,userID,result.nftID);
    const a = await userRepository.updateUserBalance(userID);
    console.log(a);
    
   }
   return result;
  
}
const syncNftToMarket = async(data:any,userID:number,isAction:boolean):Promise<BaseResponse>=>{
   const result =  await nftRepository.syncNftToMarket(data,userID,isAction);
//    console.log(isAction);
//    if(result.success && isAction){
//         if(data.isList){
//             await nftRepository.addTransaction(2,data.transaction,userID,data.nftID); 
//         }
       
//    }
   return result;
}

const getNftByID = async (nftID:number) :Promise<GenericBaseResponse<GenericNftResponse>>=>{
    const result =  await nftRepository.getNftByID(nftID);
    if(result){
        return {
            success: true,
            data: result,
            message:'Get Nft Info success',
            message_code:200
        }
    }else{
        return {
            success: true,
            data: null,
            message:'Record not found',
            message_code:400
        }
    }
    // return result;
};

const getNftListed = async (pageIndex:number,pageSize:number,order?:"DESC"|"ASC",search?:string,isTrending?:boolean)=>{
    const result =  await nftRepository.getManyNftListed(pageIndex,pageSize,order,search,isTrending);
    return result;
    // if(result){
    //     return {
    //         success: true,
    //         data: result,
    //         message:'Get Nft Info success',
    //         message_code:200
    //     }
    // }else{
    //     return {
    //         success: true,
    //         data: null,
    //         message:'Get Nft Info fail',
    //         message_code:400
    //     }
    // }
    // return result;
};
const transferNft = async (userID:number,nftID:number)=>{
    await nftRepository.transferNft(userID,nftID);

}
const getNftByUser = async (userID:number, pageIndex: number, pageSize: number, order?:"DESC"|"ASC", search?:string,isListed?:boolean,isCreacted?:boolean)=>{
    const result =  await nftRepository.getManyNftByUser(userID,pageIndex,pageSize,order,search,isListed,isCreacted);
    return result;
    
}
export {createNft, syncNftToMarket, getNftByID, getNftListed, getNftByUser, transferNft}