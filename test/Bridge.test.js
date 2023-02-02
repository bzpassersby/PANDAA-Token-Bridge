const ETHPandaa = artifacts.require("../contracts/ETHPandaa.sol");
const ETHBridge = artifacts.require("../contracts/ETHBridge.sol");
const BSCPandaa = artifacts.require("../contracts/BSCPandaa.sol");
const BSCBridge = artifacts.require("../contracts/BSCBridge.sol");

const chai = require("chai");
const should = chai.should();
contract("Bridge", ([deployer, user]) => {
  const supply = "1000000";
  let result, ethPandaa, bscPandaa, ethBridge, bscBridge;
  beforeEach(async () => {
    ethPandaa = await ETHPandaa.new(deployer, web3.utils.toWei(supply));
    console.log(`ethPandaa deployed at:${ethPandaa.address}`);
    bscPandaa = await BSCPandaa.new(deployer, web3.utils.toWei(supply));
    console.log(`bscPandaa deployed at:${bscPandaa.address}`);
    ethBridge = await ETHBridge.new(ethPandaa.address);
    bscBridge = await BSCBridge.new(bscPandaa.address);
    await ethPandaa.setBridge(ethBridge.address);
    await bscPandaa.setBridge(bscBridge.address);
  });
  describe("Deployment", () => {
    it("Returns correct associated token address", async () => {
      result = await ethBridge.token();
      result.should.equal(ethPandaa.address);
      result = await bscBridge.token();
      result.should.equal(bscPandaa.address);
    });
  });
  describe("Burn", () => {
    let amount = "1000";
    beforeEach(async () => {
      await ethBridge.burn(user, web3.utils.toWei(amount), [], {
        from: deployer,
      });
    });
    it("Correctly burns token", async () => {
      let balance = await ethPandaa.balanceOf(deployer);
      balance.toString().should.equal(web3.utils.toWei("999000"));
    });
  });
});
