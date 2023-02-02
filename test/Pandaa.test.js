const ETHPandaa = artifacts.require("../contracts/ETHPandaa.sol");
const BSCPandaa = artifacts.require("../contracts/BSCPandaa.sol");

var chai = require("chai");
var should = chai.should();

const EVM_REVERT = "VM Exception whilte processing transaction: revert";

contract("Pandaa", ([deployer]) => {
  const bridge = deployer;
  const supply = "1000000";
  let ethPandaa, bscPandaa, result;
  describe("Deployment", () => {
    beforeEach(async () => {
      ethPandaa = await ETHPandaa.new(bridge, web3.utils.toWei(supply));
      bscPandaa = await BSCPandaa.new(bridge, web3.utils.toWei(supply));
    });
    it("Returns owner address", async () => {
      result = await ethPandaa.owner();
      result.should.equal(deployer);
      result = await bscPandaa.owner();
      result.should.equal(deployer);
    });
    it("Returns bridge address", async () => {
      result = await ethPandaa.bridge();
      result.should.equal(deployer);
      result = await bscPandaa.bridge();
      result.should.equal(deployer);
    });
    it("Returns correct token name", async () => {
      result = await ethPandaa.name();
      result.should.equal("Pandaa Token");
      result = await bscPandaa.name();
      result.should.equal("Pandaa Token");
    });
    it("Returns correct correct token symbol", async () => {
      result = await ethPandaa.symbol();
      result.should.equal("PANDAA");
      result = await bscPandaa.symbol();
      result.should.equal("PANDAA");
    });
    it("Updated the balance of deployer to totalsupply", async () => {
      result = await ethPandaa.balanceOf(deployer);
      result = web3.utils.fromWei(result);
      result.should.equal("1000000");
      result = await bscPandaa.balanceOf(deployer);
      result = web3.utils.fromWei(result);
      result.should.equal("1000000");
    });
  });
});
