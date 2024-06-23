export interface NftInfoModel {
  nftName: string;
  symbol:string;
  image: string;
  description?: string;
  attribute?: Attribute[];
  mintAddress: string;
  tokenAccount: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

export interface GenericNftResponse extends NftInfoModel{
  ownAddress:string;
  createdAddress:string;
  price?:Number;
}