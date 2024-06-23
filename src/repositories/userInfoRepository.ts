import { ormconfig } from "../ormconfig";
import logger from "../logger/winston";
import { User } from "../entities/users.entity";
import {UserInfoModel , UpdateUserModel, Attribute} from "../models/userInfo.model";
import { BaseResponse,GenericBaseResponse } from "models/base.response";
import * as solanaWeb3 from "@solana/web3.js";
import * as envConfig from "../env-config.json";

const checkUser = async (userAddress :string) : Promise<UserInfoModel|null>=>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ address:userAddress  });
        console.log(userInfo);
        
        return userInfo;

    } catch (error) {
        return null;
    }

    
}
const addNewUser = async(userAddress :string): Promise<UserInfoModel|null> =>{
    try {
       
        let nativeBalanceSOL = await balanceSOL(userAddress);
        const userInfo = new User();
        userInfo.address = userAddress;
        userInfo.username = userAddress;
        userInfo.roleID = 2
        userInfo.balance = nativeBalanceSOL;
        await ormconfig.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(userInfo);
        });
        // const userInfo = {
        //     is_delete: false,
        //     username: userAddress,
        //     address: userAddress,
        //     created_date:new Date(),
        //     modified_date:new Date(),
        //     balance: nativeBalanceSOL,
        //     image: null,
        //     background: null,
        //     roleID: 2
        // }
        return userInfo;
    } catch (error) {
        console.log(error);
        
        return null;
    }

}
const updateUserBalance = async(userAddress :string,balance:number): Promise<BaseResponse> =>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ address: userAddress });
        console.log(userInfo);
        
        if (userInfo == undefined || userInfo == null) {
            return {
                success: false,
                message: "User record is not found",
                message_code: 400
            };
        }
        await userRepository.update({ address: userAddress }, {
            balance : balance
        });

        return {
            success: true,
            message: "Update balance user to database",
            message_code: 200
        };
    } catch (error) {
        console.log(error);
        
        return {
            success: false,
            message: "Faield to save NFT info to database",
            message_code: 400
        };
    }

}
const updateUserBackground = async(userAddress :string, background:string): Promise<BaseResponse> =>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ address: userAddress });
        if (userInfo == undefined || userInfo == null) {
            return {
                success: false,
                message: "User record is not found",
                message_code: 400
            };
        }
        await userRepository.update(userAddress, {
            background : background
        });

        return {
            success: true,
            message: "Update balance user to database",
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

const balanceSOL = async (address:string ) =>{
    const web3 = new solanaWeb3.Connection(envConfig.solanaNetwork.rpc);
    let userAddressPubkey = new solanaWeb3.PublicKey(address);
    let nativeBalanceSOL = await web3.getBalance(userAddressPubkey);
    return nativeBalanceSOL;
}

export {checkUser,addNewUser,updateUserBalance,balanceSOL}