export interface NftInfoModel {
  nftName: string;
  image: string;
  description: string;
  attribute: Attribute[];
  mintAddress: string;
  tokenAcount: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}