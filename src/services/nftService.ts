import * as nftRepository from "../repositories/nftInfoRepository";
import { NftInfoModel,GenericNftResponse } from "models/nftInfo.model";
import { BaseResponse,GenericBaseResponse } from "models/base.response";
const createNft = async (userID:number,data:any) =>{
   const result =  await nftRepository.addNewNft(userID,data);
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
}
export {createNft,getNftByID}