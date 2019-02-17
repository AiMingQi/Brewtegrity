const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = "hamster useless similar silk junior stairs juice harvest deny bean pyramid miss"
const INFURA_KEY = "Iw4pUdWfzz9ZxddqpXrS"
const FACTORY_CONTRACT_ADDRESS = "0x12C42ff84eCF88050330d627A61aDb1b62f630D5"
const NFT_CONTRACT_ADDRESS = "0x12C42ff84eCF88050330d627A61aDb1b62f630D5"
const OWNER_ADDRESS = "0x12C42ff84eCF88050330d627A61aDb1b62f630D5"
const NETWORK = "rinkeby"
const NUM_BEERS = 1

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "mintTo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

const FACTORY_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_optionId",
        "type": "uint256"
      },
      {
        "name": "_toAddress",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (false) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_BEERS; i++) {
            const result = await nftContract.methods.mintTo(OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
            console.log("Minted creature. Transaction: " + result.transactionHash)
        }
    } else if (FACTORY_CONTRACT_ADDRESS) {
        const factoryContract = new web3Instance.eth.Contract(FACTORY_ABI, FACTORY_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_BEERS; i++) {
            const result = await factoryContract.methods.mint(DEFAULT_OPTION_ID, OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
            console.log("Minted creature. Transaction: " + result.transactionHash)
        }

        // Lootboxes issued directly to the owner.
        for (var i = 0; i < NUM_LOOTBOXES; i++) {
            const result = await factoryContract.methods.mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
            console.log("Minted lootbox. Transaction: " + result.transactionHash)
        }
    }
}

main()