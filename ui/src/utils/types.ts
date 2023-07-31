export interface Certification {
  certificateId?: String;
  certifier: String;
  name: String;
  description: String;
  associateNFT: String;
  requirements: String[];
}

export interface UserDataNFT {
  tokenId: Number;
  userAddress: String;
}

export interface NFT {
  id?: String;
  name: String;
  symbol: String;
  nftUrl: String;
  ownerAddress: String;
  nftAddress?: String;
  owners: UserDataNFT[];
}
