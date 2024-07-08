import { BaseResponse,GenericBaseResponse } from "../models/base.response";
import { User } from "../entities/users.entity";
import { ormconfig } from "../ormconfig";
import * as solanaWeb3 from "@solana/web3.js";
import * as envConfig from "../env-config.json";
import * as artchain from "../ArtChainMarket_wallet.json";
import { Nft } from "../entities/nfts.entity";
import {ListedNFT } from "../entities/listedNFT.entity";
import { createCreateMetadataAccountV3Instruction, createCreateMasterEditionV3Instruction, createSetCollectionSizeInstruction } from "@metaplex-foundation/mpl-token-metadata";
import { 
    TOKEN_PROGRAM_ID,
    createTransferInstruction,
    getOrCreateAssociatedTokenAccount,
    createMintToInstruction,
    createApproveInstruction,
    getAssociatedTokenAddressSync,
    ASSOCIATED_TOKEN_PROGRAM_ID, 
    createAssociatedTokenAccountInstruction ,
    createAccount, createMint,getMint, 
    mintTo, 
    getMinimumBalanceForRentExemptMint,
    getAccountLenForMint ,MINT_SIZE ,
    createInitializeMintInstruction, 
    createInitializeAccountInstruction } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, Transaction,sendAndConfirmTransaction,  Signer , SystemProgram , clusterApiUrl   } from "@solana/web3.js";
import {
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
  } from "@metaplex-foundation/mpl-token-metadata";
import * as fs from 'fs';
import * as path from 'path';
const walletPath = path.resolve(__dirname, "../ArtChainMarket_wallet.json");
const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
const connectionManager = ormconfig.manager;

export const transferNftBlockChain = async (userBuyNftAddress : string, mintAddress:string,tokenAccountUserSell:string) =>{
    try {
    if(!process.env.SOLANA_URL){
        throw new Error("SOLANA_URL environment variable is not set");
    }
    const connection = new Connection(process.env.SOLANA_URL, 'confirmed');
    const wallet = Keypair.fromSecretKey(
        new Uint8Array(walletData)
      )
    const programId = TOKEN_PROGRAM_ID;
    const tokenAccountUserBuy = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        new PublicKey(mintAddress),
        new PublicKey(userBuyNftAddress)
      );
      const transactionTransferNFT = createTransferInstruction(
        new PublicKey(tokenAccountUserSell), //nguồn
        tokenAccountUserBuy.address, //đích CX3Bo2H92PeDf6723HtXcZ3kzXR67Q3g2JUo2W5Kqohb
        wallet.publicKey,
        1,
        [],
        programId
    );
    // console.log(tokenAccountUserBuy.address.toBase58());
    const transaction = new Transaction()
    .add(transactionTransferNFT);
    // console.log(transaction);
    
    const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);
    // console.log(signature);
    return {
        status:true,
        transaction : signature,
        tokenAccountUserBuy : tokenAccountUserBuy.address.toBase58()
    }
    
    } catch (error : any ) {
        console.log(error);
        return {
            status: false,
            transaction : error.message,
            tokenAccountUserBuy : null
        }
    }
}

export const tranferNftToUser = async (userID:number, nftID:number, userBuyNftAddress : string, mintAddress:string,tokenAccountUserSell:string, transactionBuyNft? :string) =>{
   try {
    const result = await transferNftBlockChain(userBuyNftAddress, mintAddress, tokenAccountUserSell);
    if(result.status){
        
        await connectionManager.query(
            `CALL proc_transfer_buy_nft(?, ?, ?, ?, ?, @o_code)`,
            [
                userID,
                nftID,
                result.tokenAccountUserBuy,
                transactionBuyNft,
                result.transaction
            ]
        )
        const outputValue = await connectionManager.query(
            "SELECT @o_code as o_code LIMIT 1"
        );
        if(outputValue[0].o_code == 1){
            return {
                status:true,
                message : "Buy NFT success"
            }
        }else{
            return{
                status: false,
                message : "Buy NFT fail"
            }
        }
    }else{
        return{
            status: false,
            message : "Buy NFT fail"
        }
    }
   } catch (error:any) {
    console.log(error);
    
    return{
        status: false,
        message: error.message
    }
   }
   
}