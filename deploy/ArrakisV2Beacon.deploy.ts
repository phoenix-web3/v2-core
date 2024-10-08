import { deployments, ethers, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { sleep } from "../src/utils";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  if (
    hre.network.name === "mainnet" ||
    hre.network.name === "polygon" ||
    hre.network.name === "goerli" ||
    hre.network.name === "optimism" ||
    hre.network.name === "arbitrum" ||
    hre.network.name === "binance" ||
    hre.network.name === "base" ||
    hre.network.name === "base_goerli" ||
    hre.network.name === "sepolia" ||
    hre.network.name === "gnosis"
  ) {
    console.log(
      `Deploying ArrakisV2Beacon to ${hre.network.name}. Hit ctrl + c to abort`
    );
    await sleep(10000);
  }

  const { deploy } = deployments;
  const { deployer, owner } = await getNamedAccounts();
  if (hre.network.name == "hardhat")
    await deploy("ArrakisV2Beacon", {
      from: deployer,
      args: [(await ethers.getContract("ArrakisV2")).address, deployer],
      log: hre.network.name != "hardhat" ? true : false,
    });
  else
    await deploy("ArrakisV2Beacon", {
      from: deployer,
      args: [(await ethers.getContract("ArrakisV2")).address, owner],
      log: hre.network.name != "hardhat" ? true : false,
    });
};

export default func;

func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const shouldSkip =
    hre.network.name === "mainnet" ||
    hre.network.name === "polygon" ||
    hre.network.name === "goerli" ||
    hre.network.name === "optimism" ||
    hre.network.name === "arbitrum" ||
    hre.network.name === "binance" ||
    hre.network.name === "base" ||
    hre.network.name === "base_goerli" ||
    hre.network.name === "sepolia" ||
    hre.network.name === "gnosis";
  return shouldSkip ? true : false;
};
func.tags = ["ArrakisV2Beacon"];
func.dependencies = ["ArrakisV2"];
