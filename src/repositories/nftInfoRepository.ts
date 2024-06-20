import { ormconfig } from "../ormconfig"
import logger from "../logger/winston";
import { BaseResponse } from "models/base.response";
import { NftInfoModel } from "models/nftInfo.model";
import { Nft } from "../entities/nfts.entity";

const addNewNft = async (userID:number,data:NftInfoModel) =>{
    console.log(data);
    return true;
}
export {addNewNft}