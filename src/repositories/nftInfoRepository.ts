import { ormconfig } from "../ormconfig"
import logger from "../logger/winston";
import { BaseResponse } from "models/base.response";
import { NftInfoModel,GenericNftResponse } from "models/nftInfo.model";
import { Nft } from "../entities/nfts.entity";
import {ListedNFT } from "../entities/listedNFT.entity";
import { User } from "../entities/users.entity";
const connectionManager = ormconfig.manager;

const addNewNft = async (userID:number,data:NftInfoModel):Promise<BaseResponse> =>{
    try {
        
        const nftRepository = ormconfig.getRepository(Nft);
        // const userRepository = ormconfig.getRepository(User);
        // const userInfo = await userRepository.findOneBy({ id: userID });
        // if (!userInfo) {
        //     throw new Error("User not found");
        // }
        // console.log(data);
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
            message_code:200
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
        console.log(pageIndex,pageSize);
        
        const queryBuilderNftListed = ormconfig
            .getRepository(ListedNFT)
            .createQueryBuilder('n')
            .leftJoinAndSelect('n.nftID', 'nftInfo')
            // .leftJoinAndSelect('n.nftID','nftInfo')
            // .select("nftInfo.*")
            // .addSelect("n.id",'n_id')
            // .addSelect("n.price",'price')
            // .addSelect("n.isTrending",'isTrending')
            // .addSelect("n.isList",'isList')
            .select([
                'n.id',
                'n.price',
                'n.isTrending',
                'n.isList',
                "nftInfo.nftName",
        
            ])
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
            queryBuilderNftListed.andWhere("nftInfo.nftName LIKE :search", { search: `%${search}%` });
        }
        if(isTrending){
            queryBuilderNftListed.andWhere("n.isTrending = 1");
        }
        const totalRecord = await queryBuilderNftListed
        // .orderBy("price",order)
        // .skip((pageIndex - 1) * pageSize)
        // .limit(pageSize)
        .getCount();
        console.log(totalRecord);
        let skip = (pageIndex - 1) * pageSize;
        skip = skip > 0 ? skip : 0;
        // queryBuilderNftListed.orderBy("price",order);
        const nftListedEntities = await queryBuilderNftListed
        // .orderBy("price",order)
        .skip(skip)
        .take(pageSize)
        .getMany(); //getRawMany 
       console.log("đá",nftListedEntities);
       
        // const paginatedEntities = nftListedEntities.slice(skip, skip + pageSize);
        // console.log(paginatedEntities);
        // const nftListedEntities = await ormconfig
        //     .getRepository(ListedNFT)
        //     .createQueryBuilder('n')
        //     .leftJoinAndSelect('n.nftID','nftInfo')
        //     .select("nftInfo.*")
        //     .addSelect("n.price",'price')
        //     .where("nftInfo.is_delete = 0")
        //     .andWhere("n.is_delete = 0")
        //     .orderBy("price","ASC")
        //     .skip((pageIndex - 1) * pageSize)
        //     .take(pageSize)
        //     .getRawMany();
        // const totalRecord = await ormconfig
        //     .getRepository(ListedNFT)
        //     .createQueryBuilder('n')
        //     .leftJoinAndSelect('n.nftID','nftInfo')
        //     // .select("nftInfo.*")
        //     // .addSelect("n.price",'price')
        //     .where("nftInfo.is_delete = 0")
        //     .andWhere("n.is_delete = 0")
        //     .getCount();
        let res = []; 

       
        return nftListedEntities;
                                     
    } catch (error) {
        console.log(error);
        
    }
}

const getNftByID = async (nftID:number):Promise<GenericNftResponse|null> =>{
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
            console.log(nft);
            
            return nft;
        // const nftInfo = connectionManager.query('')
        ;

    } catch (error) {
        console.log(error);
        return null;
       
    }
    
}
export {addNewNft,getNftByID,getManyNftListed}