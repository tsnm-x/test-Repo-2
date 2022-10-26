const express = require('express');
const app = express();
const port = 3000;
const Web3 = require("web3");
const url = "wss://mainnet.infura.io/ws/v3/e50821f47c9c40cfa7597160d03fdede";
const web3 = new Web3(url);
const contractAddress = "0x853d955aCEf822Db058eb8505911ED77F175b99e";
const ABI = require("./ABI.json")
app.use(express.json());

app.get('/', async(req, res) => {
    
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const totalSupply = await contract.methods.totalSupply().call()
    console.log(totalSupply)

    res.json({
        name,
        symbol,
        totalSupply
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})