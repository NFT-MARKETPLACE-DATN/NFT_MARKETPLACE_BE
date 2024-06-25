import * as nftRepository from "../repositories/nftInfoRepository";
import { NftInfoModel,GenericNftResponse } from "models/nftInfo.model";
import { BaseResponse,GenericBaseResponse } from "models/base.response";

const createNft = async (userID:number,data:any):Promise<BaseResponse> =>{
   const result =  await nftRepository.addNewNft(userID,data);
   return result;
  
}
const listNftToMarket = async(data:any,userID:Number,listAction:boolean):Promise<BaseResponse>=>{
   const result =  await nftRepository.listNftToMarket(data);
   console.log(listAction);
   
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
            message:'Get Nft Info fail',
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
}
export {createNft,listNftToMarket,getNftByID,getNftListed}