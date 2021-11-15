if(typeof window === 'undefined') {
    global.window = {}
  }
  import { abis, contractAddress } from "./contracts/index"
  // https://medium.com/@rasmuscnielsen/how-to-compile-web3-js-in-laravel-mix-6eccb4577666
  import Web3 from 'web3/dist/web3.min.js'
  // import { getDotEnv } from "./utils"
  
  // const dotEnv = getDotEnv();
  // const nodeService = dotEnv.nodeService;
  // const privateKey = dotEnv.privateKey;
  // const owner = dotEnv.owner;
  
  const nodeService = 'http://127.0.0.1:8545';
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
  const owner = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
  
  const web3 = new Web3(nodeService);
  
  const tokenAbi = abis.token;
  const tokenAddress = contractAddress.token;
  const contractToken = new web3.eth.Contract(tokenAbi, tokenAddress, {
    from: owner,
  });
  console.info(contractToken.methods)
  
  // const a = await contractToken.methods.totalSupply().call()
  // console.info(a)
  
  window.totalSupply = async function() {
    var a = await contractToken.methods.totalSupply().call()
    return a;
  }
  
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
  
  
  
  
  