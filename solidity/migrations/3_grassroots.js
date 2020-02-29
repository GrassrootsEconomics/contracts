let ContractRegistry = artifacts.require('ContractRegistry');
let ContractRegistryClient = artifacts.require('ContractRegistryClient');
let BancorNetwork = artifacts.require('BancorNetwork');
let BancorConverter = artifacts.require('BancorConverter');
let EtherToken = artifacts.require('EtherToken');
let SmartToken = artifacts.require('SmartToken');
let SmartTokenController = artifacts.require('SmartTokenController');
let Owned = artifacts.require('Owned');
let Utils = artifacts.require('Utils');

module.exports = async function(deployer, network, accounts) {
	deployer.then(async () => {
		let registry = await deployer.deploy(ContractRegistry);
		let registryClient = await deployer.deploy(ContractRegistryClient, registry);
		let network = await deployer.deploy(BancorNetwork, registry.address);
		let etherToken = await deployer.deploy(EtherToken);
		let smartToken = await deployer.deploy(SmartToken, 'Grassroots Smarttoken', 'SMRT', 18);
		let r = await web3.eth.sendTransaction({from: accounts[0], to: etherToken.address, value: 100000000});
		let converter = await deployer.deploy(BancorConverter, smartToken.address, registry.address, 0, etherToken.address, 25000);

	});
}
