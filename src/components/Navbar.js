import logo from "../logo.png";

const Navbar = ({ web3Handler, account }) => {
  return (
    <nav className="navbar">
      <img src={logo} className="logo"></img>
      {account ? (
        <a
          className="button-link"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://etherscan.io/address/${account}`}
        >
          {account.slice(0, 5) + "..." + account.slice(38, 42)}
        </a>
      ) : (
        <button className="button" onClick={web3Handler}>
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
