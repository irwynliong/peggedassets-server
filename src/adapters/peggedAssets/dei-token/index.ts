const sdk = require("@defillama/sdk");
import { sumSingleBalance } from "../helper/generalUtil";
import { bridgedSupply } from "../helper/getSupply";
import {
  ChainBlocks,
  PeggedIssuanceAdapter,
  Balances,
  ChainContracts,
} from "../peggedAsset.type";

const chainContracts: ChainContracts = {
  fantom: {
    issued: ["0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0"],
    // reserves: [
    //  "0xbB8B2F05A88108F7e9227b954358110c20e97E26", // anyDEI (maybe need to remove once bridged DEI is added?)
    //  "0xEf6b0872CfDF881Cf9Fe0918D3FA979c616AF983", // multisig
    //  ],
  },
  ethereum: {
    bridgedFromFantom: ["0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0"],
  },
  polygon: {
    bridgedFromFantom: ["0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0"],
  },
  bsc: {
    bridgedFromFantom: ["0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0"],
  },
  metis: {
    bridgedFromFantom: ["0xDE1E704dae0B4051e80DAbB26ab6ad6c12262DA0"],
  },
};

/*
async function chainMinted(chain: string, decimals: number) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    for (let issued of chainContracts[chain].issued) {
      const totalSupply = (
        await sdk.api.abi.call({
          abi: "erc20:totalSupply",
          target: issued,
          block: _chainBlocks?.[chain],
          chain: chain,
        })
      ).output;
      sumSingleBalance(
        balances,
        "peggedUSD",
        totalSupply / 10 ** decimals,
        "issued",
        false
      );
    }
    return balances;
  };
}
*/

async function chainMinted(chain: string, decimals: number) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    for (let issued of chainContracts[chain].issued) {
      const totalSupply = 0.01;

      sumSingleBalance(
        balances,
        "peggedUSD",
        totalSupply / 10 ** decimals,
        "issued",
        false
      );
    }
    return balances;
  };
}

/*
async function chainUnreleased(
  chain: string,
  decimals: number,
  owners: string[]
) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    for (let owner of owners) {
      const reserve = (
        await sdk.api.erc20.balanceOf({
          target: chainContracts[chain].issued[0],
          owner: owner,
          block: _chainBlocks?.[chain],
          chain: chain,
        })
      ).output;
      sumSingleBalance(balances, "peggedUSD", reserve / 10 ** decimals);
    }
    return balances;
  };
}

async function chainUnreleased(
  _chain: string,
  decimals: number,
  owners: string[]
) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    for (let owner of owners) {
      const reserve = 0.01;
      sumSingleBalance(balances, "peggedUSD", reserve / 10 ** decimals);
    }
    return balances;
  };
}
*/
const adapter: PeggedIssuanceAdapter = {
  fantom: {
    minted: chainMinted("fantom", 18),
  },
  // Either the bridged contracts are incorrect, or there are no holders on other chains.
  // Will need to be updated.
  /*
  ethereum: {
    fantom: bridgedSupply(
      "ethereum",
      18,
      chainContracts.ethereum.bridgedFromFantom
    ),
  },
  polygon: {
    fantom: bridgedSupply(
      "polygon",
      18,
      chainContracts.polygon.bridgedFromFantom
    ),
  },
  bsc: {
    fantom: bridgedSupply(
      "bsc",
      18,
      chainContracts.bsc.bridgedFromFantom
    ),
  },
  metis: {
    fantom: bridgedSupply(
      "metis",
      18,
      chainContracts.metis.bridgedFromFantom
    ),
  },
  */
};

export default adapter;
