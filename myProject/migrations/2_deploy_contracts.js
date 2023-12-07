const TodoList = artifacts.require("TodoList"); // Ensure the contract name matches exactly the one defined in TodoList.sol

module.exports = function(deployer) {
  // Deploy TodoList contract
  deployer.deploy(TodoList);
};