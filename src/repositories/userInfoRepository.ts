import { ormconfig } from "../ormconfig"
import logger from "../logger/winston";
import { User } from "../entities/users.entity";
import {UserInfoModel} from "../models/userInfo.model";
import { BaseResponse } from "models/base.response";
import * as solanaWeb3 from "@solana/web3.js";
import * as envConfig from "../env-config.json";

const checkUesr = async (userAddress :string) : Promise<User|any>=>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ address: userAddress });
        // console.log(userInfo);
        return userInfo;

    } catch (error) {
        return {
            success: false,
            message: "Faield to save NFT info to database",
            message_code: 400
        };
    }

    
}
const addNewUser = async(userAddress :string): Promise<BaseResponse> =>{
    try {
        const web3 = new solanaWeb3.Connection(envConfig.solanaNetwork.rpc);
        let userAddressPubkey = new solanaWeb3.PublicKey(userAddress);
        let nativeBalanceSOL = await web3.getBalance(userAddressPubkey);
        console.log(nativeBalanceSOL);
        
        const userInfoEntity = new User();
        userInfoEntity.address = userAddress;
        userInfoEntity.username = userAddress;
        userInfoEntity.roleID = 2;
        userInfoEntity.balance = nativeBalanceSOL;
        await ormconfig.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(userInfoEntity);
        });
        return {
            success: true,
            message: "Save user info to database",
            message_code: 200
        };
    } catch (error) {
        return {
            success: false,
            message: "Faield to save NFT info to database",
            message_code: 400
        };
    }

}


export {checkUesr,addNewUser}