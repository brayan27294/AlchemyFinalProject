export interface Certification {
  certificateId?: String;
  certifier: String;
  name: String;
  description: String;
  associateNFT: String;
  requirements: String[];
}

export interface NFT {
  nftId?: String;
  nftAddress?: String;
  nftOwnerAddress: String;
  name: String;
  symbol: String;
  nftUrl: String;
  associateAccounts: String[];
}
