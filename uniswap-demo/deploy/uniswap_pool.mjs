import { ethers } from 'ethers';
import {
    abi as FACTORY_ABI,
    bytecode as FACTORY_BYTECODE,
} from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import { getDotEnv } from "./utils.mjs"

const dotEnv = getDotEnv();
const nodeService = dotEnv.nodeService;
const privateKey = dotEnv.privateKey;
const owner = dotEnv.owner;

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
    // 参考: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
    console.log(contract.address);
    // "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E"

    // 发送到网络用来部署合约的交易
    // 查看: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
    console.log(contract.deployTransaction.hash);
    // "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"

    //合约还没有部署;我们必须等到它被挖出
    await contract.deployed()

    // 好了 合约已部署。
})();
