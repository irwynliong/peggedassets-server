const chainContracts = {
  ethereum: {
    issued: ["0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"],
  },
  polygon: {
    issued: ["0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"],
  },
  optimism: {
    issued: ["0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"],
  },
  celo: {
    issued: ["0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"],
  },
  arbitrum: {
    issued: ["0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"],
  },
  base: {
    issued: ["0x4F604735c1cF31399C6E711D5962b2B3E0225AD3"],
  },
};

import { addChainExports } from "../helper/getSupply";
const adapter = addChainExports(chainContracts);
export default adapter;
