// import * as anchor from '@project-serum/anchor'
// import {Connection, PublicKey, clusterApiUrl, Keypair, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';

import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
  } from '@solana/web3.js';
// import {TOKEN_PROGRAM_ID, createMint, getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
// const BufferLayout = require('buffer-layout')
// Load các biến môi trường từ file .env
dotenv.config()

// const idl = require('../idl/testMintNFT.json')
// const idlPath = path.join(__dirname, '../idl/testMintNFT.json'); 
// const contractData = fs.readFileSync(idlPath, 'utf-8');
// const contractInfo = JSON.parse(contractData);
const mintNFT = async () => {
    
// const secretKey = Uint8Array.from(contractInfo);
// const key = web3.Keypair.fromSecretKey(secretKey);
// console.log(key);

  const solanaURL = process.env.SOLANA_URL?.toString();
  const connection = new web3.Connection(`${solanaURL}`, "confirmed");
//   const version = await connection.getVersion();
//   console.log(version);
  
// const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
  // console.log(connection);

  // const connection = new anchor.web3.Connection(`${solanaURL}`);
  //   const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate(); // tạo account mint NFT
  // const programId = new PublicKey('JBvHTFchtwRSL3d4GzWQYS5NQCe6jd71yQrdBgU39FQJ');
  // const privateKeyBuffer = Buffer.from('[201,248,129,145,128,218,95,80,230,175,113,51,40,111,217,130,27,158,254,75,166,97,134,232,205,29,151,131,103,218,67,92,202,211,163,67,242,61,145,96,8,57,157,60,198,140,88,205,229,202,166,35,239,197,255,166,80,232,220,82,176,178,112,116]', 'hex');
  // const keypair = Keypair.fromSecretKey(privateKeyBuffer);
  // console.log(keypair);
//   const wallet = web3.Keypair.fromSecretKey(
//     new Uint8Array([
//       201, 248, 129, 145, 128, 218, 95, 80, 230, 175, 113, 51, 40, 111, 217, 130, 27, 158, 254, 75, 166, 97, 134, 232,
//       205, 29, 151, 131, 103, 218, 67, 92, 202, 211, 163, 67, 242, 61, 145, 96, 8, 57, 157, 60, 198, 140, 88, 205, 229,
//       202, 166, 35, 239, 197, 255, 166, 80, 232, 220, 82, 176, 178, 112, 116
//     ])
//   )
  // const userWallet = new PublicKey(keypair.publicKey);
// console.log(wallet.publicKey);

  // const provider = anchor.AnchorProvider.env()
  // const wallet = provider.wallet as anchor.Wallet;
  // anchor.setProvider(provider);
  const mintKeypair = web3.Keypair.generate();
  // console.log(wallet.publicKey);

  // console.log(mintKeypair.publicKey);

  const testNftTitle = 'Beta'
  const testNftSymbol = 'BETA'
  const testNftUri = 'https://azure-acute-bee-777.mypinata.cloud/ipfs/QmRJKcMq7iRoLv9hxHKewjaPFB5DS79E4yCFVnAnaoFAsJ'
  const programId = new web3.PublicKey('JBvHTFchtwRSL3d4GzWQYS5NQCe6jd71yQrdBgU39FQJ')
  const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');
//   console.log(TOKEN_METADATA_PROGRAM_ID);
//   const tokenAddress = await getAssociatedTokenAddress(
//     mintKeypair.publicKey,
//     wallet.publicKey,
//     false,
//     TOKEN_PROGRAM_ID,
//     ASSOCIATED_TOKEN_PROGRAM_ID
//   )
//   const tokenAddress = await web3.PublicKey.findProgramAddress(
//     [
//       wallet.publicKey.toBuffer(),
//       TOKEN_PROGRAM_ID.toBuffer(),
//       mintKeypair.publicKey.toBuffer(),
//     ],
//     ASSOCIATED_TOKEN_PROGRAM_ID
//   );
  //   console.log(tokenAddress);
  // const [metadataAddress] = await web3.PublicKey.findProgramAddress(
  //   [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mintKeypair.publicKey.toBuffer()],
  //   TOKEN_METADATA_PROGRAM_ID
  // )
  // console.log(metadataAddress);
  // const [masterEditionAddress] = await web3.PublicKey.findProgramAddress(
  //   [
  //     Buffer.from('metadata'),
  //     TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //     mintKeypair.publicKey.toBuffer(),
  //     Buffer.from('edition')
  //   ],
  //   TOKEN_METADATA_PROGRAM_ID
  // )
//   console.log('Master edition metadata initialized')
//   const dataLayout = BufferLayout.struct([
//     // BufferLayout.u8('instruction'),
//     BufferLayout.cstr('metadata_title'),
//     BufferLayout.cstr('metadata_symbol'),
//     BufferLayout.cstr('metadata_uri')
//   ])
//   const data = Buffer.alloc(1024)
//   const encodeLength = dataLayout.encode(
//     {
//     //   instruction: 0, // Assumed 0 is the instruction index for mint function
//       metadata_title: testNftTitle,
//       metadata_symbol: testNftSymbol,
//       metadata_uri: testNftUri
//     },
//     data
//   )
//   const instruction = new web3.TransactionInstruction({
//     keys: [
//       { pubkey: metadataAddress, isSigner: false, isWritable: true },
//       { pubkey: masterEditionAddress, isSigner: false, isWritable: true },
//       { pubkey: mintKeypair.publicKey, isSigner: true, isWritable: false },
//     //   { pubkey: tokenAddress[0], isSigner: false, isWritable: true },
//     //   { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
//       { pubkey: TOKEN_METADATA_PROGRAM_ID, isSigner: false, isWritable: false }
//     ],
//     programId: key.publicKey,
//     data: Buffer.alloc(0),
//   })
  //   console.log(instruction);
  // const walletPath = path.join(__dirname, '../idl/wallet.json'); 
  // const wallet = fs.readFileSync(walletPath, 'utf-8');
  // const walletInfo = JSON.parse(wallet);
  // const secretKeyWallet = Uint8Array.from(walletInfo);
  // const walletPayer = web3.Keypair.fromSecretKey(secretKeyWallet);
  
//   const transaction = new web3.Transaction().add(instruction)

//   const signedTransaction = await web3.sendAndConfirmTransaction(connection, transaction, [walletPayer], {
//     commitment: 'singleGossip',
//     preflightCommitment: 'singleGossip'
// })
// const program = new web3.PublicKey('BttVkZMdCrhYeCzE82b3J1mjwe6FDDDJ8vyPrVqbgVgU');

// //   console.log((key.publicKey));
// //   console.log(`Using program ${key.publicKey.toBase58()}`);
//   const GREETING_SEED = 'hello';
//  const greetedPubkey = await web3.PublicKey.createWithSeed(
//     walletPayer.publicKey,
//     GREETING_SEED,
//     program,
//   );
//   console.log(greetedPubkey);
//   const instruction = new TransactionInstruction({
//     keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
//     programId:program,
//     data: Buffer.alloc(0), // All instructions are hellos
//   });
//  const tx =  await sendAndConfirmTransaction(
//     connection,
//     new Transaction().add(instruction),
//     [walletPayer],
//   );
//   console.log(tx);
  
//   console.log('Transaction Signature:', signedTransaction)
// console.log(tx);
  // const instruction = new web3.TransactionInstruction({
  //   keys: [
  //     { pubkey: walletPayer.publicKey, isSigner: true, isWritable: false },
  //     { pubkey: TOKEN_METADATA_PROGRAM_ID, isSigner: false, isWritable: false }
  //   ],
  //   programId: key.publicKey,
  //   data: Buffer.alloc(0),
  // })
//    const tx =  await sendAndConfirmTransaction(
//     connection,
//     new Transaction().add(instruction),
//     [walletPayer],
//   );
// const signedTransaction = await connection.sendTransaction(new Transaction().add(instruction), [walletPayer]);
//   console.log(signedTransaction);


  const fromPubkey = new PublicKey("9FuCBoWm4ea8cSV1UuovAUEhe7rdCrVHMWJJRiosMRi1");
    const toPubkey = new PublicKey("AwdSWfTwpa3PiihdDiVXmS7jJW8ui15TW2vfu5oyRESy");
    const recentBlockhash = await connection.getRecentBlockhash();
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: toPubkey,
      lamports: 1000000, // Số lượng SOL cần gửi
    })
  );
  transaction.recentBlockhash = recentBlockhash.blockhash;
  // console.log(transaction);
  // const signature = await connection.sendTransaction(transaction, []);
  // const recentBlockhash = await connection.getRecentBlockhash();
  // transaction.recentBlockhash = recentBlockhash.blockhash;
  console.log(JSON.stringify(transaction.serialize()));
  
  
}

  
export default mintNFT
