require('dotenv').config();
const hre = require('hardhat'),
  { expect } = require("chai"),
  utilsFactory = require('./utils'),
  { MOONCAT_ACCLIMATOR_ADDRESS, MOONCAT_OWNER_ADDRESS , MOONCAT_RESCUE_ADDRESS, MOONCAT_TOKEN_ID} = process.env
let currentSnapshot = false;
describe('Name Cat', function() {
  before(async function() {
    MCA = await hre.ethers.getContractAt("ERC721", MOONCAT_ACCLIMATOR_ADDRESS);
    MCR = await hre.ethers.getContractAt("MoonCatRescue", MOONCAT_RESCUE_ADDRESS);
    accounts = await hre.ethers.getSigners();
  });

  beforeEach(async function() {
    currentSnapshot = await network.provider.request({
      method: "evm_snapshot", params: []
    });

    //deploy nameAcclimatedMoonCat
    const nameAcclimatedMoonCat = await hre.ethers.getContractFactory("nameAcclimatedMoonCat");
    NAMC = await nameAcclimatedMoonCat.deploy();
  });

  afterEach(async function() {
    await network.provider.request({
      method: "evm_revert", params: [currentSnapshot]
    });
  });


  it ('Should name the acclimated cat in a single transaction', async function() {
    //setup impersonation
    MoonCatOwner = await ethers.provider.getSigner(MOONCAT_OWNER_ADDRESS);
    await ethers.provider.send("hardhat_impersonateAccount", [MOONCAT_OWNER_ADDRESS]);

    name = "Beelzebub"
    bytesName = hre.ethers.utils.formatBytes32String(name)
    console.log(bytesName)
    await MCA.connect(MoonCatOwner)['safeTransferFrom(address,address,uint256,bytes)'](MOONCAT_OWNER_ADDRESS, NAMC.address, 2807,bytesName)
    //confirm catName
    expect(await MCA.ownerOf(MOONCAT_TOKEN_ID)).to.equal(MOONCAT_OWNER_ADDRESS, "cat not transfered back");
    expect(await MCR.catNames(CAT_ID)).to.equal(bytesName, "cat not named");
  });

});
