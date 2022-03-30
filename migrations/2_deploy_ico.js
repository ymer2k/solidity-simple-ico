// Import the HelloWorld contract...
const Ico = artifacts.require("Ico");

module.exports = (deployer) => {
  // Deploy it!
  deployer.deploy(Ico);
}