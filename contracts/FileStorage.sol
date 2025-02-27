
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string hash;
        string name;
        uint timestamp;
    }

    mapping(address => File[]) public files;

    event FileUploaded(address indexed user, string hash, string name, uint timestamp);

    function uploadFile(string memory _hash, string memory _name) public {
        files[msg.sender].push(File(_hash, _name, block.timestamp));
        emit FileUploaded(msg.sender, _hash, _name, block.timestamp);
    }

    function getFiles(address _user) public view returns (File[] memory) {
        return files[_user];
    }
}
