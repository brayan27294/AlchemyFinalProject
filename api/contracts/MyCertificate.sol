// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyCertificate is Ownable {
    struct Certificate {
        uint256 certificateId;
        address certifier;
        string name;
        string description;
        address associateNFT;
        string[] requirements;
    }

    mapping(address => Certificate[]) private certificates;
    using Counters for Counters.Counter;
    mapping(address => Counters.Counter) private _totalCertificates;

    event CertificateCreated(uint256 indexed certificateId, address certifier);
    event CertificateUpdated(uint256 indexed certificateId, address certifier);

    function addCertificate(
        address certifier,
        string memory name,
        string memory description,
        address associateNFT,
        string[] memory requirements
    ) public onlyOwner {
        uint256 certificateId = _totalCertificates[certifier].current();
        _totalCertificates[certifier].increment();
        Certificate memory newCertificate = Certificate({
            certificateId: certificateId,
            certifier: certifier,
            name: name,
            description: description,
            associateNFT: associateNFT,
            requirements: requirements
        });

        certificates[certifier].push(newCertificate);

        emit CertificateCreated(certificateId, certifier);
    }

    function updateCertificate(
        uint256 certificateId,
        address certifier,
        string memory name,
        string memory description,
        address associateNFT,
        string[] memory requirements
    ) public onlyOwner {
        certificates[certifier][certificateId].name = name;
        certificates[certifier][certificateId].description = description;
        certificates[certifier][certificateId].associateNFT = associateNFT;
        certificates[certifier][certificateId].requirements = requirements;

        emit CertificateUpdated(certificateId, certifier);
    }

    function getCertificationsByCertifier(
        address certifier
    ) public view returns (Certificate[] memory) {
        return certificates[certifier];
    }

    function getCertificationsByCertifierAndCertId(
        address certifier,
        uint256 certificateId
    ) public view returns (Certificate memory) {
        return certificates[certifier][certificateId];
    }
}
