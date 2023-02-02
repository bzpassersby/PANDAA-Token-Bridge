const ETHPandaa = artifacts.require("../contracts/ETHPandaa.sol");
const BSCPandaa = artifacts.require("../contracts/BSCPandaa.sol");

const ETHBridge = artifacts.require("../contracts/ETHBridge.sol");
const BSCBridge = artifacts.require("../contracts/BSCBridge.sol");

module.exports = async function (deployer, network, accounts) {
  const supply = web3.utils.toWei("1000000");
  if (network == "goerli") {
    await deployer.deploy(ETHPandaa, accounts[0], supply);
    const ethPandaa = await ETHPandaa.deployed();
    console.log(`ETHPandaa is deployed at:${ethPandaa.address}`);
    await deployer.deploy(ETHBridge, ethPandaa.address);
    const ethBridge = await ETHBridge.deployed();
    console.log(`ETHBridge is deployed at:${ethBridge.address}`);
    await ethPandaa.setBridge(ethBridge.address);
  }
  if (network == "bsc_testnet") {
    await deployer.deploy(BSCPandaa, accounts[0], supply);
    const bscPandaa = await BSCPandaa.deployed();
    console.log(`BSCPandaa is deployed at:${bscPandaa.address}`);
    await deployer.deploy(BSCBridge, bscPandaa.address);
    const bscBridge = await BSCBridge.deployed();
    console.log(`BSCBridge is deployed at:${bscBridge.address}`);
    await bscPandaa.setBridge(bscBridge.address);
  }
};
