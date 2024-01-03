const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Photo Contract", function () {
  let Photo;
  let owner;

  const NUM_TOTAL_NOT_MY_NOTES = 5;
  const NUM_TOTAL_MY_NOTES = 3;

  let totalPhotos;

  beforeEach(async function () {
    Photo = await ethers.getContractFactory("PhotoContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    photobook = await Photo.deploy();

    totalPhotos = [];

    for (let i = 0; i < NUM_TOTAL_NOT_MY_NOTES; i++) {
      let photo = {
        photoText: "This is to save with Id: " + i,
        username: addr1,
        isDeleted: false,
      };

      await photobook.connect(addr1).addPhoto(photo.photoText, photo.isDeleted);
      totalPhotos.push(photo);
    }

    for (let i = 0; i < NUM_TOTAL_MY_NOTES; i++) {
      let photo = {
        photoText: "This is to save with Id: " + i,
        username: owner,
        isDeleted: false,
      };

      await photobook.connect(owner).addPhoto(photo.photoText, photo.isDeleted);
      totalPhotos.push(photo);
    }
  });

  describe("Add photo", function () {
    it("should emit AddPhoto event", async function () {
      let photo = {
        photoText: "new photo",
        isDeleted: false,
      };
      await expect(await photobook.addPhoto(photo.photoText, photo.isDeleted))
        .to.emit(photobook, "AddPhoto")
        .withArgs(owner.address, NUM_TOTAL_NOT_MY_NOTES + NUM_TOTAL_MY_NOTES);
    });
  });

  describe("Delete Photo", function () {
    it("should emit delete photo event", async function () {
      const NOTE_ID = 5;
      const NOTE_DELETED = true;

      await expect(await photobook.deletePhoto(NOTE_ID, NOTE_DELETED))
        .to.emit(photobook, "DeletePhoto")
        .withArgs(NOTE_ID, NOTE_DELETED);
    });
  });
});
