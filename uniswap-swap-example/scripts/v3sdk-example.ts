import { ethers } from "ethers";
import { Address } from "cluster";

const provider = new ethers.providers.JsonRpcProvider("http://nps.shang-chain.com:18028");
const poolAddress = "0xb3f6CdA2a51b65AB399C1eB7027e51a3c7b418cE";

const poolImmutablesAbi = [
    "function factory() external view returns (address)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function fee() external view returns (uint24)",
    "function tickSpacing() external view returns (int24)",
    "function maxLiquidityPerTick() external view returns (uint128)",
  ];

const poolContract = new ethers.Contract(
    poolAddress,
    poolImmutablesAbi,
    provider
);

interface Immutables {
    factory: Address;
    token0: Address;
    token1: Address;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: number;
  }

async function getPoolImmutables() {
    const PoolImmutables: Immutables = {
        factory: await poolContract.factory(),
        token0: await poolContract.token0(),
        token1: await poolContract.token1(),
        fee: await poolContract.fee(),
        tickSpacing: await poolContract.tickSpacing(),
        maxLiquidityPerTick: await poolContract.maxLiquidityPerTick(),
    };
    return PoolImmutables;
}

getPoolImmutables().then((result) => {
  console.log(result);
});