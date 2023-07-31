// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MyNFT.sol";

contract MyNFTFactory is Ownable {
    using Counters for Counters.Counter;

    struct MyNFTStruct {
        uint256 nftId;
        address nftAddress;
        address nftOwnerAddress;
        string name;
        string symbol;
        string nftUrl;
        address[] associateAccounts;
    }

    mapping(address => MyNFTStruct[]) private myNFTByOwner;
    mapping(address => Counters.Counter) private _totalNFT;
    mapping(address => MyNFT) private deployedNFT;
    Counters.Counter private _totalDeployedNFT;

    event NFTDeployed(
        uint256 nftId,
        address nftAddress,
        address nftOwnerAddress,
        string name,
        string symbol,
        string nftUrl
    );

    event NFTMinted(
        uint256 nftId,
        address nftAddress,
        address nftOwnerAddress,
        address recipient,
        string name,
        string symbol,
        string nftUrl
    );

    function deployNFT(
        address nftOwnerAddress,
        string memory name,
        string memory symbol,
        string memory nftUrl,
        address[] memory initialOwner
    ) public onlyOwner {
        MyNFT nftContract = new MyNFT(name, symbol);
        _totalDeployedNFT.increment();
        address nftAddress = address(nftContract);
        deployedNFT[nftAddress] = nftContract;

        nftContract.safeMint(nftOwnerAddress, nftUrl);

        uint256 nftId = _totalNFT[nftOwnerAddress].current();
        _totalNFT[nftOwnerAddress].increment();

        MyNFTStruct memory newNFT = MyNFTStruct({
            nftId: nftId,
            nftAddress: nftAddress,
            nftOwnerAddress: nftOwnerAddress,
            name: name,
            symbol: symbol,
            nftUrl: nftUrl,
            associateAccounts: initialOwner
        });

        myNFTByOwner[nftOwnerAddress].push(newNFT);

        emit NFTDeployed(nftId, nftAddress, nftOwnerAddress, name, symbol, nftUrl);
    }

    function getNFTByOwner(
        address owner
    ) public view returns (MyNFTStruct[] memory) {
        return myNFTByOwner[owner];
    }

    function mintNFTtoNewOwner(
        address owner,
        uint256 nftId,
        address recipient
    ) public onlyOwner {
        MyNFTStruct memory nftStruct = myNFTByOwner[owner][nftId];
        MyNFT nftContract = deployedNFT[nftStruct.nftAddress];

        nftContract.safeMint(recipient, nftStruct.nftUrl);
        myNFTByOwner[owner][nftId].associateAccounts.push(recipient);

        emit NFTMinted(
            nftId,
            nftStruct.nftAddress,
            owner,
            recipient,
            nftStruct.name,
            nftStruct.symbol,
            nftStruct.nftUrl
        );
    }
}
