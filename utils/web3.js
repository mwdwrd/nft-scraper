
import Web3 from "web3";
import ABI from "../abi.json";
import { config } from "../config.js";

const httpProvider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${config.infuraKey}`);

export const web3 = new Web3(httpProvider);
export const contract = new web3.eth.Contract(ABI, config.contractAddress);
