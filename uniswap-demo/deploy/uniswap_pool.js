const ethers = require('ethers');
const UniswapJSON = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json')
const FACTORY_ABI = UniswapJSON.abi
const FACTORY_BYTECODE = UniswapJSON.bytecode
// import { getDotEnv } from "./utils.mjs"

// const dotEnv = getDotEnv();
const nodeService = 'http://nps.shang-chain.com:18028';
const privateKey = '0xce17eb1db596d840355168a9337861a99015db5061b4821338412870b8d105d3';
const owner = '';

// 连接网络
const provider = ethers.getDefaultProvider(nodeService);

// 加载钱包以部署合约
const wallet = new ethers.Wallet(privateKey, provider);

// 部署是异步的，所以我们使用异步IIFE
(async function() {

    // 常见合约工厂实例
    let factory = new ethers.ContractFactory(FACTORY_ABI, FACTORY_BYTECODE, wallet);

    // 请注意，我们将 "Hello World" 作为参数传递给合约构造函数constructor
    let contract = await factory.deploy();

    // 部署交易有一旦挖出，合约地址就可用
    // 参考: http://nps.shang-chain.com:18027/address/0xb3f6CdA2a51b65AB399C1eB7027e51a3c7b418cE
    console.log(contract.address);
    // "0xb3f6CdA2a51b65AB399C1eB7027e51a3c7b418cE"

    // 发送到网络用来部署合约的交易
    // 查看: http://nps.shang-chain.com:18027/tx/0x3d73ebe9555ebbdce9c0b908ebd7a495910a484700ab6f3bc42202409ae562c9
    console.log(contract.deployTransaction.hash);
    // "0x3d73ebe9555ebbdce9c0b908ebd7a495910a484700ab6f3bc42202409ae562c9"

    //合约还没有部署;我们必须等到它被挖出
    await contract.deployed()

    // 好了 合约已部署。
})();
