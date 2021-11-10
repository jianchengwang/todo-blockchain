import { abis, contractAddress } from "./contracts/index"
import { ethers } from "ethers";
import { getDotEnv } from "./utils"

const dotEnv = getDotEnv();
const nodeService = dotEnv.nodeService;
const privateKey = dotEnv.privateKey;
const owner = dotEnv.owner;

const provider = new ethers.providers.JsonRpcProvider(nodeService);
provider.getBlockNumber().then(res => {
  console.log(res)
})

const tokenAbi = abis.token;
const tokenAddress = contractAddress.token;
const contractToken = new ethers.Contract(tokenAddress, tokenAbi, provider);
console.info(contractToken.methods)

// read
contractToken.totalSupply().then(res => {
  console.log(res)
});
