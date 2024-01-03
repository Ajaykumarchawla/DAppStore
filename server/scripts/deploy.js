const main = async () => {
  // contract for Notes
  const noteContractFactory = await ethers.getContractFactory("NoteContract");
  const noteContract = await noteContractFactory.deploy();

  console.log("notes contract deployed to: ", noteContract.address);

  // contract for Photos
  const photoContractFactory = await ethers.getContractFactory("PhotoContract");
  const photoContract = await photoContractFactory.deploy();

  console.log("photos contract deployed to: ", photoContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
