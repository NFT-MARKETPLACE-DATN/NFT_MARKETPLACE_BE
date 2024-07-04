import { ormconfig } from "../ormconfig";
import logger from "../logger/winston";
import { User } from "../entities/users.entity";
import {UserInfoModel , UpdateUserModel, Attribute} from "../models/userInfo.model";
import { BaseResponse,GenericBaseResponse,UserBalance } from "models/base.response";
import * as solanaWeb3 from "@solana/web3.js";
import * as envConfig from "../env-config.json";
import { TransfersUser } from "../entities/transfersUser.entity";
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
const updateUserBackground = async(userID :number, background:string): Promise<UserInfoModel | null> =>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ id: userID });
        if (userInfo == undefined || userInfo == null) {
            return null;
        }
       if(background == userInfo.background){
        return userInfo;
       }else{
        await userRepository.update({ id: userID }, {
            background : background
        });
        const updatedUser =await userRepository.findOneBy({ id: userID });
        return updatedUser;
       }

    } catch (error:any) {
        return null;
    }

}

const balanceSOL = async (address:string ) =>{
    try {
        const web3 = new solanaWeb3.Connection(envConfig.solanaNetwork.rpc);
        let userAddressPubkey = new solanaWeb3.PublicKey(address);
        let nativeBalanceSOL = await web3.getBalance(userAddressPubkey);
        return nativeBalanceSOL;
    } catch (error) {
        return 0;
    }

}
const getManyTransaction =async (userID:number,pageIndex: number, pageSize: number, order?:"DESC"|"ASC", search?:number ) => {
    try {
        // const transactionRepository = await connectionManager.getRepository(TransfersUser);
        const queryBuilderTransactionByUser = ormconfig
            .getRepository(TransfersUser)
            .createQueryBuilder('t')
            .leftJoinAndSelect('t.acctionType', 'at')
            .leftJoinAndSelect('t.nftID', 'n')
            .select([
                't.id as id',
                't.created_date as created',
                't.txID as txID',
                'at.name as actionName',
                "n.nftName as nftName",
                "n.image as nftImage"
            ])
            .where("t.userID = :userID",{userID:userID})
            .andWhere("t.is_delete = 0")
            // .andWhere("n.isList = 1");
            if(search && search !== 0){
                queryBuilderTransactionByUser.andWhere("at.id = :search", { search: `${search}` });
            }

            const totalRecord = await queryBuilderTransactionByUser
            .getCount();
            // console.log(totalRecord);
    
            const transactionEntities = await queryBuilderTransactionByUser
            .orderBy("t.created_date",order)
            .offset((pageIndex - 1) * pageSize)
            .limit(pageSize)
            .getRawMany(); //getRawMany 
            // console.log(transactionEntities);
            
            let res: { id: number; created: Date; txID:string; actionName:string; nftName:string; nftImage: string; }[] = []; 
            transactionEntities.forEach((record) =>{
                res.push({
                    id:record.id,
                    created:record.created,
                    txID:record.txID,
                    actionName:record.actionName,
                    nftName:record.nftName,
                    nftImage:record.nftImage
                })
            })
            return {
                records: res,
                totalRecord: totalRecord
            };
    } catch (error:any) {
        return error.message
    }
}

const getUserbyAdmin = async (pageIndex: number, pageSize: number, order?:"DESC"|"ASC", search?:string)  =>{
    try {
          // const userRepository = await connectionManager.getRepository(User);
    let searchName = null
    if(search) {
        searchName = search;
    }
    const user = await connectionManager.query(
        `CALL proc_get_user_by_ad(?,?,?,?)`,
        [
            pageIndex,
            pageSize,
            order,
            searchName
        ]
    );
    let res: { id: number; created: Date; address:string; balance:number; isAdmin:number; nftCount: number; }[] = []; 
    user[0].forEach((record:any)=>{
        res.push({
            id:record.id,
            created:record.created_date,
            address:record.address,
            balance:record.balance == 0 ? 0: (Number(record.balance)/Math.pow(10, 9)),
            isAdmin:record.isAdmin,
            nftCount:record.nftCount
        })
    })
    // console.log(user[0]);
        return res;
    } catch (error) {
        return null;
    }
  
    
}
const updateRoleUser = async(userID:number, isRole:number): Promise<BaseResponse>=>{
    try {
        const userRepository = ormconfig.getRepository(User);
        const userInfo = await userRepository.findOneBy({ id: userID });
        if (userInfo == undefined || userInfo == null) {
            return {
                success : false,
                message: "Not find user ",
                message_code: 400,
            };
        }
        const user = await userRepository.update({ id: userID }, {
            roleID : isRole
        });
        return {
            success : true,
            message: "Update role success ",
            message_code: 200,
        }
    } catch (error:any) {
        return {
            success : false,
            message: error.message,
            message_code: 400,
        }
    }
   
}
export {checkUser, addNewUser, updateUserBalance, balanceSOL, getManyTransaction, updateUserBackground, getUserbyAdmin, updateRoleUser}