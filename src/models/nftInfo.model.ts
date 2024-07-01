export interface NftInfoModel {
  nftName: string;
  symbol:string;
  image: string;
  description?: string;
  attribute?: Attribute[];
  mintAddress: string;
  tokenAccount: string;
  metadataUrl:string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

export interface GenericNftResponse extends NftInfoModel{
  ownAddress:string;
  createdAddress:string;
  price?:Number;
  isTrending?:boolean;
  isList?:boolean;
}

export interface NftListModel{
 nftID:number;
 price:number;
 isList?:boolean;
 isTrending?:boolean;
 transaction?:string;
}
export interface TransactionModel{
  txID:string;
  acctionType:number;
}