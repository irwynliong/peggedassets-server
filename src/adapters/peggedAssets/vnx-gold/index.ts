const sdk = require("@defillama/sdk");
import { sumSingleBalance } from "../helper/generalUtil";
import { solanaMintedOrBridged } from "../helper/getSupply";
import {
  Balances,
  ChainBlocks,
  PeggedIssuanceAdapter,
  ChainContracts,
} from "../peggedAsset.type";
import { getTotalSupply as tezosGetTotalSupply } from "../helper/tezos";

const chainContracts: ChainContracts = {
  ethereum: {
    issued: ["0x6d57B2E05F26C26b549231c866bdd39779e4a488"],
  },
  polygon: {
    issed: ["0xC8bB8eDa94931cA2F20EF43eA7dBD58E68400400"],
  },
  solana: {
    issued: ["9TPL8droGJ7jThsq4momaoz6uhTcvX2SeMqipoPmNa8R"],
  },
  q: {
    issued: ["0xe4fadbbf24f118b1e63d65f1aac2a825a07f7619"],
  },
  tezos: {
    issued: ["KT1LSH97386CURN9FgRNqdQJoHaHY6e1vxUv"],
  },
};

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
        "peggedGOLD",
        totalSupply / 10 ** decimals,
        "issued",
        false
      );
    }
    return balances;
  };
}

async function tezosMinted(contract: string) {
  return async function (
    _timestamp: number,
    _ethBlock: number,
    _chainBlocks: ChainBlocks
  ) {
    let balances = {} as Balances;
    const totalSupply = await tezosGetTotalSupply(contract);
    sumSingleBalance(balances, "peggedCHF", totalSupply, "issued", false);
    return balances;
  };
}

const adapter: PeggedIssuanceAdapter = {
  ethereum: {
    minted: chainMinted("ethereum", 18),
  },
  polygon: {
    minted: chainMinted("polygon", 18),
  },
  solana: {
    minted: solanaMintedOrBridged(chainContracts.solana.issued),
  },
  q: {
    minted: chainMinted("q", 18),
  },
  tezos: {
    minted: tezosMinted(chainContracts.tezos.issued[0]),
  },
};

export default adapter;
