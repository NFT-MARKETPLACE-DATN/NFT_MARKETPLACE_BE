import { createCreateMetadataAccountV3Instruction, createCreateMasterEditionV3Instruction, createSetCollectionSizeInstruction } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID, createAccount, createMint, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import {
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
  } from "@metaplex-foundation/mpl-token-metadata";
// import { loadWalletKey } from "./utils";


// Creates a metaplex collection NFT
export const initCollection = async (
    connection: Connection,
    payer: Keypair
  ) => {
    // const cmintKey = loadWalletKey("CoLLES42WAZkkYA84xUG2Z7f2xMz4ATM32F4SYXnZKJ4.json");
    // const collectionMint = cmintKey.publicKey;
    const wallet = Keypair.fromSecretKey(
        new Uint8Array([180,235,79,84,102,152,96,102,213,153,140,176,49,228,214,142,57,102,193,5,71,26,229,58,98,95,252,99,127,59,59,93,3,5,199,47,233,144,194,189,164,186,174,181,120,158,19,16,114,171,210,46,69,236,68,90,187,50,250,39,199,22,93,94])
      )
    const mintKeypair = Keypair.generate();
    const collectionMint = await createMint(
      connection,
      payer,// signer
      payer.publicKey, //mint Authority
      payer.publicKey, //Account can freeze token
      0,
      mintKeypair, 
      {commitment: "finalized"},
      TOKEN_PROGRAM_ID
    );
    console.log("Account ", mintKeypair.publicKey);
    
    console.log("collectionMint",collectionMint);
    
    console.log("1")
    const collectionTokenAccount = await createAccount(
        connection, 
        payer, 
        collectionMint, 
        payer.publicKey, 
        undefined, 
        {commitment: "finalized"}, 
        TOKEN_PROGRAM_ID
    );
    console.log("2")
    console.log("collectionTokenAccount",collectionTokenAccount);
    
   const w= await mintTo(
       connection,
       payer, 
       collectionMint, 
       collectionTokenAccount, 
       payer, 
       1, 
       [], 
       {commitment: "finalized"}
      );
    console.log("mint To",w);
    
    console.log("3")
    const [collectionMetadataAccount, _b] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata", "utf8"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        collectionMint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );
    const collectionMeatadataIX = createCreateMetadataAccountV3Instruction(
      {
        metadata: collectionMetadataAccount,
        mint: collectionMint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: "MarketPlace Test 2",
            symbol: "ARTCHAIN",
            uri: "https://azure-acute-bee-777.mypinata.cloud/ipfs/QmeheDt5FVAEXS6FAcxyNYtT8JtdXSGoiuYRmyukkCV3F6",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
          collectionDetails: null,
        },
      }, TOKEN_METADATA_PROGRAM_ID
    );
    console.log("collectionMeatadataIX",collectionMeatadataIX);
    
    const [collectionMasterEditionAccount, _b2] =
      PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf8"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          collectionMint.toBuffer(),
          Buffer.from("edition", "utf8"),
        ],
        TOKEN_METADATA_PROGRAM_ID
      );
    const collectionMasterEditionIX = createCreateMasterEditionV3Instruction(
      {
        edition: collectionMasterEditionAccount,
        mint: collectionMint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
        metadata: collectionMetadataAccount,
        tokenProgram: TOKEN_PROGRAM_ID
      },
      {
        createMasterEditionArgs: {
          maxSupply: 0,
        },
      }, 
      TOKEN_METADATA_PROGRAM_ID
    );
  console.log("collectionMasterEditionIX",collectionMasterEditionIX);
  
    const sizeCollectionIX = createSetCollectionSizeInstruction(
      {
        collectionMetadata: collectionMetadataAccount,
        collectionAuthority: payer.publicKey,
        collectionMint: collectionMint,
      },
      {
        setCollectionSizeArgs: { size: 10000 },
      },
      TOKEN_METADATA_PROGRAM_ID
    );
  console.log("sizeCollectionIX",sizeCollectionIX);
  
    let tx = new Transaction()
      .add(collectionMeatadataIX)
      .add(collectionMasterEditionIX)
      .add(sizeCollectionIX);
    try {
      await sendAndConfirmTransaction(connection, tx, [payer], {
        commitment: "confirmed",
      });

      console.log("transaction",tx);
      
      console.log(
        "Successfull created NFT collection with collection address: " +
          collectionMint.toBase58()
      );
      return {
        collectionMint,
        collectionMetadataAccount,
        collectionMasterEditionAccount,
      };
    } catch (e) {
      console.error("Failed to init collection: ", e);
      throw e;
    }
  };

export async function main(){
    // const keypair = loadWalletKey("CNFTKDRCpENe7S1hPvDS2E6YJr3fKKUbc3DWuyjF1mEW.json");
    const wallet = Keypair.fromSecretKey(
        new Uint8Array([
          201, 248, 129, 145, 128, 218, 95, 80, 230, 175, 113, 51, 40, 111, 217, 130, 27, 158, 254, 75, 166, 97, 134, 232,
          205, 29, 151, 131, 103, 218, 67, 92, 202, 211, 163, 67, 242, 61, 145, 96, 8, 57, 157, 60, 198, 140, 88, 205, 229,
          202, 166, 35, 239, 197, 255, 166, 80, 232, 220, 82, 176, 178, 112, 116
        ])
      )
    const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/UZe8cyrmtLjH44EJ2mm8VZdo1ofTDCfA",'confirmed');
    
  await initCollection(connection, wallet);
}