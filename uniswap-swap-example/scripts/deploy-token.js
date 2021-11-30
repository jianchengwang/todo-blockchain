async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const TokenA = await ethers.getContractFactory("TokenA");
    const tokenA = await TokenA.deploy();
    console.log("TokenA address:", tokenA.address);

    const TokenB = await ethers.getContractFactory("TokenB");
    const tokenB = await TokenA.deploy();
    console.log("TokenB address:", tokenB.address);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
