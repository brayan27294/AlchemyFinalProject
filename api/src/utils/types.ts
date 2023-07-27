export interface Certification {
  id: String;
  name: String;
  description: String;
  nftUrl: String;
  requirements: String[];
  address: String;
}

export interface UserDataNFT {
  tokenId: Number;
  userAddress: String;
}

export interface NFT {
  id: String;
  name: String;
  symbol: String;
  nftUrl: String;
  ownerAddress: String;
  nftAddress: String;
  owners: UserDataNFT;
}
