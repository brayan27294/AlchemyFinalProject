export interface Certification {
  certificateId?: Number;
  certifier: String;
  name: String;
  description: String;
  associateNFT: String;
  requirements: String[];
}

export interface NFT {
  nftId?: Number;
  nftAddress?: String;
  nftOwnerAddress: String;
  name: String;
  symbol: String;
  nftUrl: String;
  isCertificateAssociate: Boolean;
  associateCertificate: Number;
  associateAccounts: String[];
}

export interface MyCertification {
  certificateId?: Number;
  issuerCertificateId: Number;
  recipient: String;
  issueDate: Date;
  issuer: String;
  status: String;
  isValid: Boolean;
  certification: Certification;
}
