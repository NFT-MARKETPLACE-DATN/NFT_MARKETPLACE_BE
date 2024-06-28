import { ormconfig } from "../ormconfig";
import logger from "../logger/winston";
import { User } from "../entities/users.entity";
import {UserInfoModel , UpdateUserModel, Attribute} from "../models/userInfo.model";
import { BaseResponse,GenericBaseResponse,UserBalance } from "models/base.response";
import * as solanaWeb3 from "@solana/web3.js";
import * as envConfig from "../env-config.json";
import { TransfersUser } from "entities/transfersUser.entity";
const connectionManager = ormconfig.manager;

const checkUser = async (userAddress :string) : Promise<UserInfoModel|null>=>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ address:userAddress  });
        
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
const updateUserBalance = async(userID :number): Promise<UserBalance> =>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ id: userID });
        // console.log(userInfo);
        
        if (userInfo == undefined || userInfo == null) {
            return {
                success: false,
                message: "User record is not found",
                message_code: 400,
                balance:null
            };
        }
        const balance = await balanceSOL(userInfo.address);
        if(balance == userInfo.balance ){
            return {
                success: true,
                message: "Balance User not change",
                message_code: 200,
                balance:balance,
            }; 
        }else{
            await userRepository.update({ id: userID }, {
                balance : balance
            });
    
            return {
                success: true,
                message: "Update balance user to database",
                message_code: 200,
                balance:balance,
            };
        }
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Faield to save NFT info to database",
            message_code: 400,
            balance:null
        };
    }

}
const updateUserBackground = async(userID :number, background:string): Promise<BaseResponse> =>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ id: userID });
        if (userInfo == undefined || userInfo == null) {
            return {
                success: false,
                message: "User record is not found",
                message_code: 400
            };
        }
        await userRepository.update({ id: userID }, {
            background : background
        });

        return {
            success: true,
            message: "Update background user to database",
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
const getManyTransaction =async (userID:number,pageIndex: number, pageSize: number, order?:"DESC"|"ASC", search?:string ) => {
    try {
        const transactionRepository = await connectionManager.getRepository(TransfersUser);
        const queryBuilderTransactionByUser = ormconfig
            .getRepository(TransfersUser)
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.acctionType', 'at')
            // .select([
            //     'n.id',
            //     'n.price',
            //     'n.isTrending',
            //     'n.isList',
            //     "nftInfo.nftName",
            //     "nftInfo.image"
            // ])
            .where("t.userID = :userID",{userID:userID})
            .andWhere("t.is_delete = 0")
            // .andWhere("n.isList = 1");
            if(search){
                queryBuilderTransactionByUser.andWhere("at.name LIKE :search", { search: `%${search}%` });
            }

            const totalRecord = await queryBuilderTransactionByUser
            .getCount();
            console.log(totalRecord);
    
            const transactionEntities = await queryBuilderTransactionByUser
            .orderBy("t.created_date",order)
            .skip((pageIndex - 1) * pageSize)
            .take(pageSize)
            .getMany(); //getRawMany 
            console.log(transactionEntities);
            
            let res = []; 

       
            return transactionEntities;
    } catch (error) {
        
    }
}
export {checkUser,addNewUser,updateUserBalance,balanceSOL,getManyTransaction}