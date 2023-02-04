<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bzpassersby/PANDAA-Token-Bridge">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Pandaa Token Bridge</h3>

  <p align="center">
This is Pandaa token bridge web dapp that allow users to transfer Pandaa token between Goerli testnet and Binance testnet. 
    <br />
    <a href="https://black-hall-9809.on.fleek.co/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/bzpassersby/PANDAA-Token-Bridge/issues">Report Bug</a>
    ·
    <a href="https://github.com/bzpassersby/PANDAA-Token-Bridge/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://black-hall-9809.on.fleek.co/)

### Built With

- Solidity
- Truffle
- Web3 Js
- Ether Js
- Javascript
- React Js

<!-- GETTING STARTED -->

## Getting Started

Below is a list of prerequisite:

- Install [NodeJS](https://nodejs.org/en/), Recommended version is 14.16.0
- Install [MetaMask](https://metamask.io/) in your browser.

## Installation

### 1. Clone/Download the Repository

### 2. Install Dependencies:

`$ npm install `

### 3. Setup .env File

Create a .env file and update the value for the following fields. Note that `REACT_APP_PRIVATE_KEY` should be the same value as `PRIVATE_KEY`. and `REACT_APP_INFURA_API_KEY` should be the same value as `INFURA_API_KEY`.

```sh
PRIVATE_KEY=""
INFURA_API_KEY=""
REACT_APP_PRIVATE_KEY=""
REACT_APP_INFURA_API_KEY=""
```

### 4. Start Ganache

`$ npx ganache -p 7545 `

### 5. Test Smart Contract

`$ npx truffle test`

### 6. Migrate(Deploy) Smart Contracts

`$ npx truffle migrate --reset`
And specify network information with `--network`. Note we need to deploy contracts twice,
once on goerli testnet and once on binance testnet.

### 7. Run Frontend Application

In another separate terminal run:
`$ npm start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- To interact with the web dapp, first connect an ethereum account with metamask wallet and connect your ethereum account which you used for contract deployment. This is to make sure you have Pandaa Token already minted for you to begin with.

- Before we start, make sure metamask is configured to display both Goerli testnet and Binance testnet. Input below chain info in metamask to add Binance testnet:

```sh
Network name: BSC Testnet
New RPC URL:
https://data-seed-prebsc-1-s1.binance.org:8545/
Chain ID:
97
Currency symbol:
tBNB
Block explore URL:
https://testnet.bscscan.com
```

- Add Pandaa token to your MetaMask on Goerli and Bsc testnet.
  Click `Add Token to Metamask` button would add Pandaa token symbol on your metamask goerli and bsc networks. You should be able to see some Pandaa Token balance on both networks instantly.

- Connect your wallet and input an amount in ether to bridge. You should receive metamask prompt to sign message and then confirm the transaction. After a short wait(typically less than 1 minute), you should see the waiting message disappear. And you can check your new Pandda token balance which confirms
  the bridge is successful.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

bzpassersby - [@bzpassersby](https://twitter.com/bzpassersby) - bowenzby@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
