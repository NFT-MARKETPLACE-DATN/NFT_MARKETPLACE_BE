import { ormconfig } from "../ormconfig"
import logger from "../logger/winston";
import { BaseResponse,NftAction } from "models/base.response";
import { NftInfoModel,GenericNftResponse, NftListModel } from "models/nftInfo.model";
import { Nft } from "../entities/nfts.entity";
import {ListedNFT } from "../entities/listedNFT.entity";
import { User } from "../entities/users.entity";
import { TransfersUser } from "../entities/transfersUser.entity";
const connectionManager = ormconfig.manager;

const addNewNft = async (userID:number,data:NftInfoModel):Promise<NftAction> =>{
    try {
        // thiếu phần check user
        const nftRepository = ormconfig.getRepository(Nft);
        // const userRepository = ormconfig.getRepository(User);
        // const userInfo = await userRepository.findOneBy({ id: userID });
        // if (!userInfo) {
        //     throw new Error("User not found");
        // }
        const nftInfo = new Nft();
        Object.assign(nftInfo, {
            userID:userID,
            userCreated:userID,
            ...data,
          });
        // nftInfo.nftName = data.nftName;
        // nftInfo.symbol = data.symbol;
        // nftInfo.image = data.image;
        // nftInfo.description = data.description ?? "";
        // nftInfo.attribute = data.attribute ?? [];
        // nftInfo.mintAddress = data.mintAddress;
        // nftInfo.tokenAccount = data.tokenAccount;
        // nftInfo.userID = userID;
        // nftInfo.userCreated = userID;
        // console.log(nftInfo);
        
        await nftRepository.save(nftInfo);

        return {
            success:true,
            message:"Add NFT to database success",
            message_code:200,
            nftID:nftInfo.id
        }
    } catch (error:any) {
        console.log(error.message);
        
        return {
            success:false,
            message:error.message,
            message_code:400,
            nftID:null,
        }
    }
    
};
const syncNftToMarket = async (data:NftListModel,userID:number,isAction:boolean):Promise<BaseResponse> =>{
    try {
        const nftListRepository = ormconfig.getRepository(ListedNFT);
        const nftRepository = ormconfig.getRepository(Nft);
        const nft = await nftListRepository
            .createQueryBuilder('nftList')
            .where("nftList.nftID = :nftID",{nftID:data.nftID})
            .getOne();
        // console.log(nft);
        // const userRepository = ormconfig.getRepository(User);
        // const userInfo = await userRepository.findOneBy({ id: userID });
        // if (!userInfo) {
        //     throw new Error("User not found");
        // }
        // console.log(data);
        if(nft){
            if(data.isList){
                if(nft.price != data.price || !nft.isList){
                    await nftListRepository.update({nftID:data.nftID},{
                        isList:true,
                        price:data.price,
                        isTrending:data.isTrending
                    });
                    if(isAction){
                        const transaction = data?.transaction ? data.transaction : null;
                        await addTransaction(2,transaction,userID,data.nftID);  
                    }
 
                    return {
                        success:true,
                        message: !nft.isList ? "List NFT success" : "Change price success",
                        message_code:200
                    }
                }else{
                    return {
                        success:true,
                        message:nft.price == data.price ? "Price not change" : " NFT is listed",
                        message_code:400
                    }
                }
            }else{
                try {
                    await nftListRepository.update({nftID:data.nftID},{
                        isList:false,
                    });
                    if(isAction){
                        const transaction = data?.transaction ? data.transaction : null;
                        await addTransaction(3,transaction,userID,data.nftID);
                    }
                      
                    return {
                        success:true,
                        message:"Unlisted NFT success",
                        message_code:200
                    }
                } catch (error) {
                    console.log(error);
                    return {
                        success:false,
                        message:"Unlisted NFT fail",
                        message_code:200
                    }
                }
                
            }
           
        }else{
        const checkNft =await nftRepository.findOneBy({id:data.nftID});
        if(checkNft){
            const nftInfo = new ListedNFT();
                Object.assign(nftInfo, {
                    ...data,
                });
            await nftListRepository.save(nftInfo);
            if(isAction){
                const transaction = data?.transaction ? data.transaction : null;
                await addTransaction(2,transaction,userID,data.nftID);  
            }

            return{
                success:true,
                message:"List NFT success",
                message_code:200
            }
        }else{
            return{
                success:false,
                message:"NFT not exit",
                message_code:400
            }}
        }
       

        
    } catch (error:any) {
        console.log(error.message);
        
        return {
            success:false,
            message:error.message,
            message_code:400
        }
    }
    
};
const getManyNftListed = async (pageIndex: number, pageSize: number,order?:"DESC"|"ASC", search?:string,isTrending?:boolean): Promise<any> =>{
    try {
        const queryBuilderNftListed = ormconfig
            .getRepository(ListedNFT)
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.nftID', 'nftInfo')
            // .leftJoinAndSelect('n.nftID','nftInfo')
            .select("nftInfo.id",'id')
            // .addSelect("nftInfo.id",'nftID')
            .addSelect("n.price",'price')
            .addSelect("n.isTrending",'isTrending')
            .addSelect("n.isList",'isList')
            .addSelect("nftInfo.image",'image')
            .addSelect("nftInfo.nftName",'name')
            // .select([
            //     'n.id ',
            //     'n.price',
            //     'n.isTrending',
            //     'n.isList',
            //     "nftInfo.nftName",
            //     "nftInfo.image"
            // ])
            // .select([
            //     'nftInfo.id AS nftId',
            //     'nftInfo.nftName AS name',
            //     'nftInfo.image AS image',
            //     'nftInfo.description AS description',
            //     'n.price AS price',
            //     'n.isTrending',
            //     'n.isList',
            //     'n.id'
            //   ])
            // .select([
            //     'nftInfo.id',
            //     'nftInfo.nftName',
            //     'nftInfo.image',
            //     'nftInfo.description',
            //     'n.price',
            //     'n.isTrending',
            //     'n.isList'
            //   ])
            // .select([
            //     'n.id',
            //     'n.price',
            //     'n.isTrending',
            //     'n.isList',
            //     'nftInfo.id AS nftId',
            //     'nftInfo.nftName',
            //     'nftInfo.image',
            //     'nftInfo.description'
            //   ])
            .where("nftInfo.is_delete = 0")
            .andWhere("n.is_delete = 0")
            .andWhere("n.isList = 1");

        if(search){
            queryBuilderNftListed.andWhere("LOWER(nftInfo.nftName) LIKE LOWER(:search)", { search: `%${search}%` });
        }
        if(isTrending){
            queryBuilderNftListed.andWhere("n.isTrending = 1");
        }
        const totalRecord = await queryBuilderNftListed
        // .orderBy("price",order)
        // .skip((pageIndex - 1) * pageSize)
        // .limit(pageSize)
        .getCount();
        // console.log(totalRecord);
        // let skip = (pageIndex - 1) * pageSize;
        // skip = skip > 0 ? skip : 0;
        // queryBuilderNftListed.orderBy("price",order);
        const nftListedEntities = await queryBuilderNftListed
        .orderBy("n.price",order)
        .offset((pageIndex - 1) * pageSize)
        .limit(pageSize)
        // .skip((pageIndex - 1) * pageSize)
        // .take(pageSize)
        .getRawMany(); //getMany 
        
       
        let res: { id: number; price: number; isList: boolean; name: string; image: string; }[] = []; //nftID:number
        nftListedEntities.forEach((record) =>{
            res.push({
                id:record.id,
                price:record.price != 0 ? (record.price/Math.pow(10, 9)) : 0,
                // nftID:record.nftID,
                isList:record.isList,
                name:record.name,
                image:record.image
            })
        })
    //     const { id, price, isList, nftID } = nftListedEntities[0];
    //    console.log(nftID);
       
        return {
            records: res,
            totalRecord: totalRecord
        };
                                     
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getNftByID = async (nftID:number):Promise<any|null> =>{
    try {
        // const nftRepository = ormconfig.getRepository(Nft);
        // const nftInfo = await nftRepository.findOneBy({ id:nftID  });
        // console.log(JSON.stringify(nftInfo?.userID));
        // return nftInfo;
        const nft = await connectionManager.getRepository(Nft)
            .createQueryBuilder('nft')
            .leftJoinAndSelect("nft.nftListed", "nftListed")
            .leftJoinAndSelect("nft.userID", "userOwn")
            .leftJoinAndSelect("nft.userCreated", "userCreated")
            .select('nft.*')
            .addSelect('userOwn.address','ownAddress')
            .addSelect('userCreated.address','createdAddress')
            .addSelect("nftListed.price",'price')
            .addSelect("nftListed.isList",'isList')
            .where('nft.id = :id', { id: nftID })
            .getRawOne();
            // console.log(nft);
        const record = {
            id: nft.id,
            price:nft.price > 0 ? (nft.price/Math.pow(10, 9)) : 0,
            isList:nft.isList,
            ownAddress:nft.ownAddress,
            createdAddress:nft.createdAddress,
            created_date:nft.created_date,
            nftName:nft.nft_name,
            symbol:nft.symbol,
            image:nft.image,
            description:nft.description,
            attribute:JSON.parse(nft.attribute),
            mint_address:nft.mint_address,
            token_account:nft.token_account,
            user_id:nft.user_id,
            metadataUrl:nft.metadata_url
        }    
            return record;
        // const nftInfo = connectionManager.query('')
        ;

    } catch (error) {
        console.log(error);
        return null;
       
    }
    
}

const getManyNftByUser =async (userID:number, pageIndex: number, pageSize: number, order?:"DESC"|"ASC", search?:string,isListed?:boolean,isCreacted?:boolean): Promise<any> =>{
    try {
        //thiếu phần check user
        const queryBuilderNftByUser = ormconfig
            .getRepository(Nft)
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.nftListed', 'nftListed')
            .select([
                'n.id as id',
                'n.nftName as nftName',
                'n.image as image',
                // 'n.isList',
                // "nftListed.nftName",
                // "nftListed.image"
            ])
            .where("n.is_delete = 0")
            
        if(isCreacted){
            queryBuilderNftByUser.andWhere("n.userCreated = :creacted", { creacted: `${userID}` });
        }else{
            queryBuilderNftByUser.andWhere("n.userID = :userID", { userID: `${userID}` });
        }

        if(search){
            queryBuilderNftByUser.andWhere("LOWER(n.nftName) LIKE LOWER(:search)", { search: `%${search}%` });
        }
        if(isListed){
            queryBuilderNftByUser
            .andWhere("nftListed.isList = 1")
            .andWhere("nftListed.is_delete = 0");
        }
        const totalRecord = await queryBuilderNftByUser
        .getCount();
        // console.log(totalRecord);

        const nftListedEntities = await queryBuilderNftByUser
        .orderBy("n.created_date",order)
        // .skip((pageIndex - 1) * pageSize)
        // .take(pageSize)
        // .getMany(); //getRawMany 
        .offset((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .getRawMany(); 
        let res: { id: number; name: string; image: string; }[] = []; 
        nftListedEntities.forEach((record) =>{
            res.push({
                id:record.id,
                name:record.nftName,
                image:record.image
            })
        })

       
        return {
            records: res,
            totalRecord: totalRecord
        };
                                     
    } catch (error:any) {
        console.log(error);
        return error.message
    }
}

const addTransaction = async (actionType:number,transaction:string | null,userID:number,nftID:number):Promise<BaseResponse>=>{
    try {
        const transactionRepository = await connectionManager.getRepository(TransfersUser);
        const transactionInfo = new TransfersUser();
        transactionInfo.userID = userID;
        transactionInfo.txID = transaction;
        transactionInfo.acctionType = actionType;
        transactionInfo.nftID = nftID;
        await transactionRepository.save(transactionInfo);
        return {
            success:true,
            message:"Add transaction to database success",
            message_code:200
        }
    } catch (error :any) {
        console.log(error.message);
        
        return {
            success:false,
            message:error.message,
            message_code:400
        }
    }
}

const transferNft = async(userID:number,nftID:number,) =>{
    const transactionRepository = await connectionManager.getRepository(TransfersUser);
    const userRepository = connectionManager.getRepository(User);
    const userInfo = await userRepository.findOneBy({id:userID});
    const nft = await connectionManager.getRepository(Nft)
                .createQueryBuilder('nft');
console.log(userInfo?.address);


}

const getNftsByAdmin = async (pageIndex: number, pageSize: number, search?:string,isList?:boolean) =>{
    try {
        const queryBuilderNftByAdmin = ormconfig
        .getRepository(Nft)
        .createQueryBuilder('n')
        .leftJoinAndSelect('n.nftListed', 'nftListed')
        .leftJoinAndSelect('n.userID', 'user')
        .select([
            'n.id as id',
            'n.nftName as nftName',
            'n.image as nftImage',
            'n.mintAddress as nftAddress',
            'user.address as userAddress',
            'n.created_date as created',
            "nftListed.isList as isListed",
            "nftListed.isTrending as isTrending",
            "nftListed.price as price",
            // 'n.isList',
            // "nftListed.nftName",
            // "nftListed.image"
        ])
        .where("n.is_delete = 0")
        if(search){
            queryBuilderNftByAdmin.andWhere("LOWER(n.nftName) LIKE LOWER(:search)", { search: `%${search}%` });
        }
        if(isList){
            queryBuilderNftByAdmin.andWhere("nftListed.isList = 1");
        }
        const nftEntities = await queryBuilderNftByAdmin
        .offset((pageIndex - 1) * pageSize)
        .limit(pageSize)
        .getRawMany(); 
        let res: { id: number; nftName: string; nftImage: string; nftAddress:string; userAddress:string; created:string; price: number | null; isList: boolean | null; isTrending:boolean |null   }[] = []; //nftID:number
        nftEntities.forEach((record) =>{
            res.push({
                id:record.id,
                nftName:record.nftName,
                nftImage:record.nftImage,
                nftAddress:record.nftAddress,
                userAddress:record.userAddress,
                created:record.created,
                isList:record.isList,
                isTrending:record.isTrending,
                price:record.price != 0 ? (record.price/Math.pow(10, 9)) : 0,
                // nftID:record.nftID,
      
            })
        })
        return res;
    } catch (error:any) {
        return null
    }
    
}

const updateIsTrendingNft = async (nftId:number, isTrending:number) : Promise<BaseResponse>=>{
    try {
        const nftRepository = await connectionManager.getRepository(Nft)
        const nftInfo = await nftRepository.findOneBy({ id: nftId });
        if (nftInfo == undefined || nftInfo == null) {
            return {
                success : false,
                message: "Not find user ",
                message_code: 400,
            };
        }
        // const user = await userRepository.update({ id: userID }, {
        //     roleID : isRole
        // });
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
export {addNewNft, syncNftToMarket , getNftByID, getManyNftListed, addTransaction , getManyNftByUser,transferNft, getNftsByAdmin, updateIsTrendingNft}