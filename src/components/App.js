import "./App.css";
import { useState, useEffect, useRef } from "react";
import { ethers, Signer } from "ethers";
import { Row, Spinner } from "react-bootstrap";

import Navbar from "./Navbar";

//Import Contract's Json
import ETHPandaa from "../abis/ETHPandaa.json";
import ETHBridge from "../abis/ETHBridge.json";
import BSCPandaa from "../abis/BSCPandaa.json";
import BSCBridge from "../abis/BSCBridge.json";
function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [otherNetwork, setOtherNetwork] = useState(null);
  const currentChain = useRef(null);

  const [ethProvider, setETHProvider] = useState(null);
  const refETHProvider = useRef(null);
  const [bscProvider, setBSCProvider] = useState(null);
  const refBSCProvider = useRef(null);
  const [ethSigner, setETHSigner] = useState(null);
  const [bscSigner, setBSCSigner] = useState(null);

  const [amount, setAmount] = useState(0);

  const [ethBridge, setETHBridge] = useState(null);
  const [bscBridge, setBSCBridge] = useState(null);

  const [ethToken, setETHToken] = useState(null);
  const [bscToken, setBSCToken] = useState(null);

  const [hasProcessed, setHasProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [message, setMessage] = useState("Awaiting MetaMask Connection...");
  //Connect to Wallet and getNetworkId
  const web3Handler = async () => {
    //connect to metamask account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setIsConnected(true);
    const chainId = await window.ethereum.request({ method: "net_version" });
    setNetworkId(chainId);
    currentChain.current = chainId;
    console.log(`currentChain:${currentChain.current}`);
  };

  //Get ethereum providers
  const loadWeb3 = async () => {
    console.log("called");
    if (currentChain.current == "5") {
      console.log("Yes!ChainId is 5");
      setOtherNetwork("BSC Testnet");
      //set provider for goerli (MetaMask)
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      refETHProvider.current = ethProvider;
      setETHProvider(ethProvider);
      const ethSigner = ethProvider.getSigner();
      setETHSigner(ethSigner);
      //set provider for bsc testnet
      const bscProvider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      refBSCProvider.current = bscProvider;
      setBSCProvider(bscProvider);
      const bscSigner = bscProvider.getSigner();
      setBSCSigner(bscSigner);
      await loadContracts();
    } else if (currentChain.current == "97") {
      console.log("Yes!ChainId is 97");
      setOtherNetwork("Goerli Testnet");
      //set provider for BSC Testnet (MetaMask)
      const bscProvider = new ethers.providers.Web3Provider(window.ethereum);
      refBSCProvider.current = bscProvider;
      setBSCProvider(bscProvider);
      console.log(`State of bscprovider is: ${refBSCProvider}`);
      const bscSigner = bscProvider.getSigner();
      setBSCSigner(bscSigner);
      //set provider for goerli
      const ethProvider = new ethers.providers.JsonRpcProvider(
        `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
      );
      refETHProvider.current = ethProvider;
      setETHProvider(ethProvider);
      const ethSigner = ethProvider.getSigner();
      setETHSigner(ethSigner);
      await loadContracts();
    } else if (currentChain.current == "5777") {
      setOtherNetwork("Ganache");
      const bscProvider = new ethers.providers.Web3Provider(window.ethereum);
      refBSCProvider.current = bscProvider;
      setBSCProvider(bscProvider);
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      refETHProvider.current = ethProvider;
      setETHProvider(ethProvider);
      const ethSigner = ethProvider.getSigner();
      setETHSigner(ethSigner);
      setBSCSigner(ethSigner);
      await loadContracts();
    }
    window.ethereum.on("accountsChanged", ([account]) => {
      setAccount(account);
    });
    window.ethereum.on("chainChanged", (_chainId) => {
      window.location.reload();
    });
  };

  //load contracts & set up listening for bridge transfer events
  const loadContracts = async () => {
    console.log("Yes!Loading contracts...");
    if (!refETHProvider.current && !refBSCProvider.current) {
      console.log("provider not loaded!");
      return;
    }
    if (currentChain.current !== "5777") {
      console.log("Yes!Chain is not 5777.Loading contracts...");
      setMessage("Loading Contracts...");
      const ethBridge = new ethers.Contract(
        ETHBridge.networks[5].address,
        ETHBridge.abi,
        refETHProvider.current
      );
      setETHBridge(ethBridge);
      const ethToken = await ethBridge.token();
      console.log(`ethToken address:${ethToken}`);
      setETHToken(ethToken);
      const bscBridge = new ethers.Contract(
        BSCBridge.networks[97].address,
        BSCBridge.abi,
        refBSCProvider.current
      );
      setBSCBridge(bscBridge);
      const bscToken = await bscBridge.token();
      console.log(`bscToken address:${bscToken}`);
      setBSCToken(bscToken);
      // Depending on the network, we listen for when tokens are burned from the bridgeto mint
      // tokens on the other network... This is only for demonstration, for security it's more ideal to
      // have this specific logic on a server somewhere else, with a more secure implementation in place
      // incase of potential downtime (or if a user refreshes the page)!
      if (currentChain.current == "5") {
        ethBridge.on(
          "Transfer",
          async (from, to, amount, date, nonce, signature, step) => {
            console.log("One Transfer event captured on Goerli!");
            const bscWallet = new ethers.Wallet(
              process.env.REACT_APP_PRIVATE_KEY
            );
            const bscSigner = bscWallet.connect(refBSCProvider.current);
            const bridge = bscBridge.connect(bscSigner);
            console.log("About to mint on BSC Testnet!");
            await bridge.mint(from, to, amount, nonce, signature);
            console.log("Minted on BSC Testnet!");
            setHasProcessed(true);
            setIsLoading(false);
          }
        );
      }
      if (currentChain.current == "97") {
        bscBridge.on(
          "Transfer",
          async (from, to, amount, date, nonce, signature, step) => {
            console.log("One Transfer event captured on BSC Testnet!");
            const ethWallet = new ethers.Wallet(
              process.env.REACT_APP_PRIVATE_KEY
            );
            const ethSigner = ethWallet.connect(refETHProvider.current);
            const bridge = ethBridge.connect(ethSigner);
            console.log("About to mint on Goerli Testnet!");
            await bridge.mint(from, to, amount, nonce, signature);
            console.log("Minted on Goerli Testnet!");
            setHasProcessed(true);
            setIsLoading(false);
          }
        );
      }
    } else if (currentChain.current == "5777") {
      if (
        !ethBridge.networks[5777].address ||
        !bscBridge.networks[5777].address
      ) {
        alert("Contracts not deployed to Ganache");
        return;
      }
      const ethBridge = new ethers.Contract(
        ETHBridge.abi,
        ETHBridge.networks[5777].address,
        refETHProvider
      );
      setETHBridge(ethBridge);
      const ethToken = await ethBridge.token();
      setETHToken(ethToken);
      const bscBridge = new ethers.Contract(
        BSCBridge.abi,
        BSCBridge.networks[5777].address,
        refBSCProvider
      );
      setBSCBridge(bscBridge);
      const bscToken = await bscBridge.token();
      setBSCToken(bscToken);

      ethBridge.on(
        "Transfer",
        async (from, to, amount, date, nonce, signature, step) => {
          await bscBridge.mint(from, to, amount, nonce, signature);
          setHasProcessed(true);
          setIsLoading(false);
        }
      );
    }
    setIsLoading(false);
  };

  //bridge transfer
  const bridgeHandler = async () => {
    const amountInWei = ethers.utils.parseUnits(amount.toString(), "ether");
    if (networkId == "5") {
      console.log("handling");
      //Connect signer with contract...
      const bridge = await ethBridge.connect(ethSigner);
      //Create message, hash message,format hashed message and have user sign it...
      const id = await bridge.transferCount(account);
      const hashedMessage = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [account, amountInWei, Number(id) + 1]
      );
      console.log(hashedMessage);
      const formattedHashedMsg = ethers.utils.arrayify(hashedMessage);
      console.log(formattedHashedMsg);
      const signature = await ethSigner.signMessage(formattedHashedMsg);
      setMessage("Bridging over... Do NOT refresh the page!");
      setIsLoading(true);

      // Burn Tokens...
      await bridge.burn(account, amountInWei, signature);
    }
    if (networkId == "97") {
      //Connect signer with contract...
      const bridge = await bscBridge.connect(bscSigner);
      //Create message, hash message, format hashed message and have user sign it...
      const id = await bridge.transferCount(account);
      const hashedMessage = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [account, amountInWei, Number(id) + 1]
      );
      const formattedHashedMsg = ethers.utils.arrayify(hashedMessage);
      const signature = await bscSigner.signMessage(formattedHashedMsg);
      setMessage("Bridging over... Do NOT refresh the page!");
      setIsLoading(true);
      // Burn Tokens...
      await bridge.burn(account, amountInWei, signature);
    }
  };

  const addTokenHandler = async () => {
    let address;
    if (networkId == "5") {
      address = ethToken;
      console.log(`ethPandaa address:${address}`);
    }
    if (networkId == "97") {
      address = bscToken;
      console.log(`bscPandaa address:${address}`);
    }
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: address,
          symbol: "PANDAA",
          decimals: 18,
        },
      },
    });
  };

  const changeNetworkHandler = async () => {
    let chainId;
    if (networkId == "5") {
      chainId = "0x61";
    }
    if (networkId == "97") {
      chainId = "0x5";
    }
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  };

  useEffect(() => {
    loadWeb3();
  }, [account, networkId]);

  return (
    <div className="App">
      <Navbar web3Handler={web3Handler} account={account} />
      {isLoading ? (
        <div className="flex-container">
          <Spinner animation="grow" className="flex-item" />
          <p className="flex-item">{message}</p>
        </div>
      ) : (
        <main className="p-3">
          <h1 className="my-4">Pandaa Token Bridge</h1>
          <hr />
          <Row>
            <h2>Bridge your funds</h2>
            <div className="input-group mb-3">
              <input
                type="number"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="Amount in Ether"
                className="form-control border-generic"
              ></input>
              <button
                onClick={bridgeHandler}
                className="button"
              >{`Bridge to ${otherNetwork}`}</button>
            </div>
          </Row>
          <hr />
          <Row className="text-center">
            {networkId == "5" ? (
              <div className="flex-vertical">
                <p>Currently connected to Goerli Testnet</p>
                <button onClick={addTokenHandler} className="button ">
                  Add Token to MetaMask
                </button>
              </div>
            ) : networkId == "97" ? (
              <div className="flex-vertical">
                <p>Currently connected to BSC Testnet</p>
                <button onClick={addTokenHandler} className="button ">
                  Add Token to MetaMask
                </button>
              </div>
            ) : (
              <p>Unidentified network</p>
            )}
          </Row>
          {hasProcessed ? (
            <Row className="text-center">
              <div className="flex-vertical">
                <button onClick={changeNetworkHandler} className="button">
                  Switch Network
                </button>
              </div>
            </Row>
          ) : (
            <Row></Row>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
