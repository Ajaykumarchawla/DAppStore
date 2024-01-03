// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract PhotoContract {
    constructor() {}

    event AddPhoto(address recipient, uint photoId);
    event DeletePhoto(uint photoId, bool isDeleted);

    struct Photo {
        uint id;
        address username;
        string photoIpfs;
        bool isDeleted;
    }

    Photo[] private photos;

    //Mapping of Photo Id to the wallet address of the user
    mapping(uint256 => address) photoToOwner;

    // Method to be called by Frontend when trying to add a new photo
    function addPhoto(string memory photoIpfs, bool isDeleted) external {
        uint photoId = photos.length;
        photos.push(Photo(photoId, msg.sender, photoIpfs, isDeleted));
        photoToOwner[photoId] = msg.sender;
        emit AddPhoto(msg.sender, photoId);
    }

    // method to get all photos
    function getAllPhotos() external view returns (Photo[] memory) {
        Photo[] memory temporary = new Photo[](photos.length);

        uint counter = 0;
        for (uint i = 0; i < photos.length; i++) {
            if (photos[i].isDeleted == false) {
                temporary[counter] = photos[i];
                counter++;
            }
        }

        Photo[] memory result = new Photo[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getMyPhotos() external view returns (Photo[] memory) {
        Photo[] memory temporary = new Photo[](photos.length);

        uint counter = 0;
        for (uint i = 0; i < photos.length; i++) {
            if (photoToOwner[i] == msg.sender && photos[i].isDeleted == false) {
                temporary[counter] = photos[i];
                counter++;
            }
        }

        Photo[] memory result = new Photo[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to Delete A Photo

    function deletePhoto(uint photoId, bool isDeleted) external {
        if (photoToOwner[photoId] == msg.sender) {
            photos[photoId].isDeleted = isDeleted;
            emit DeletePhoto(photoId, isDeleted);
        }
    }
}
