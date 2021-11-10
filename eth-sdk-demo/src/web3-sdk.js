import { abis, contractAddress } from "./contracts/index"
import Web3 from "web3"
import { getDotEnv } from "./utils"

const dotEnv = getDotEnv();
const nodeService = dotEnv.nodeService;
const privateKey = dotEnv.privateKey;
const owner = dotEnv.owner;

const web3 = new Web3(nodeService);

const tokenAbi = abis.token;
const tokenAddress = contractAddress.token;
const contractToken = new web3.eth.Contract(tokenAbi, tokenAddress, {
  from: owner,
});
console.info(contractToken.methods)

// read
contractToken.methods.totalSupply().call().then(res => {
  console.log(res)
});

// write
//获取nonce,使用本地私钥发送交易
web3.eth.getTransactionCount(owner).then(
  nonce => {
    const tx = {
      nonce: nonce,
      gasLimit: '0x271000',
      to: tokenAddress,
      data: contractToken.methods.transfer('0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 1000).encodeABI(),
    }
    web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
      tran.on('confirmation', (confirmationNumber, receipt) => {
        console.log('confirmation: ' + confirmationNumber);
      });
      tran.on('transactionHash', hash => {
        console.log('hash');
        console.log(hash);
      });
      tran.on('receipt', receipt => {
        console.log('reciept');
        console.log(receipt);
      });
      tran.on('error', console.error);
    });

  }
)




