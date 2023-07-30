// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CertificateManager is Ownable {
    using Counters for Counters.Counter;

    struct UserCertificate {
        uint256 certificateId;
        uint256 issuerCertificateId;
        address recipient;
        uint256 issueDate;
        address issuer;
        string status;
        bool isValid;
    }

    mapping(address => UserCertificate[]) public certificatesByRecipient;
    mapping(address => Counters.Counter) private _totalCertificates;
    mapping(address => UserCertificate[]) public certificatesByIssuer;
    mapping(address => Counters.Counter) private _totalCertificatesByIssuer;

    event UserRegistered(
        address recipient,
        uint256 indexed certificateId,
        address certifier,
        uint256 indexed issuerCertificateId
    );

    event CertificateIssued(
        address recipient,
        uint256 indexed certificateId,
        address certifier,
        uint256 indexed issuerCertificateId
    );

    event InvalidatedCertificate(
        address recipient,
        uint256 indexed certificateId,
        address certifier,
        uint256 indexed issuerCertificateId
    );

    function registerUser(
        address issuer,
        address recipient,
        uint256 issuerCertificateId
    ) public onlyOwner {
        uint256 certificateId = _totalCertificates[recipient].current();
        _totalCertificates[recipient].increment();
        _totalCertificatesByIssuer[issuer].increment();
        UserCertificate memory newCertificate = UserCertificate({
            certificateId: certificateId,
            issuerCertificateId: issuerCertificateId,
            recipient: recipient,
            issueDate: 0,
            issuer: issuer,
            status: "In Progress",
            isValid: true
        });

        certificatesByRecipient[recipient].push(newCertificate);
        certificatesByIssuer[issuer].push(newCertificate);

        emit UserRegistered(
            recipient,
            certificateId,
            issuer,
            issuerCertificateId
        );
    }

    function issueCertificate(
        uint256 certificateId,
        address recipient,
        uint256 issueDate
    ) public onlyOwner {
        certificatesByRecipient[recipient][certificateId].issueDate = issueDate;
        certificatesByRecipient[recipient][certificateId].status = "Completed";
        emit CertificateIssued(
            recipient,
            certificateId,
            certificatesByRecipient[recipient][certificateId].issuer,
            certificatesByRecipient[recipient][certificateId]
                .issuerCertificateId
        );
    }

    function getCertificationsByUser(
        address recipient
    ) public view returns (UserCertificate[] memory) {
        return certificatesByRecipient[recipient];
    }

    function invalidateCertificate(
        uint256 certificateId,
        address recipient
    ) public onlyOwner {
        certificatesByRecipient[recipient][certificateId].status = "Invalid";
        certificatesByRecipient[recipient][certificateId].isValid = false;
        emit InvalidatedCertificate(
            recipient,
            certificateId,
            certificatesByRecipient[recipient][certificateId].issuer,
            certificatesByRecipient[recipient][certificateId]
                .issuerCertificateId
        );
    }

    function getCertificationsByIssuer(
        address issuer
    ) public view returns (UserCertificate[] memory) {
        return certificatesByIssuer[issuer];
    }
}
