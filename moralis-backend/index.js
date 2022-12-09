const express = require('express')
// Import Moralis
const cors = require('cors');
const bodyParser = require('body-parser')
const Moralis = require('moralis').default
// Import the EvmChain dataType
const { EvmChain } = require("@moralisweb3/common-evm-utils")
const MORALIS_API_KEY = "0Fv7zoWhg4jIHO9b7AH63coTzFrOjCchggon6l9A1CJopxgWKlFwqRTDyFpQg8om"
const address = "0xbB4484b9Aa283F2B1cd70fD685f9590b0837c46D"
const chain = EvmChain.MUMBAI
const app = express()
app.use(cors());

app.use(bodyParser.json());
const port = 3000
const startServer = async () => {

    await Moralis.start({
  
      apiKey: "0Fv7zoWhg4jIHO9b7AH63coTzFrOjCchggon6l9A1CJopxgWKlFwqRTDyFpQg8om",
  
    })
}
startServer();
async function getDemoData() {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    })
  
    // Format the native balance formatted in ether via the .ether getter
    const native = nativeBalance.result.balance.ether
  
    return { native }
  }

  app.get("/balance/:id", async (req, res) => {
    try {
        const address = req.params.id;
        console.log(address)
      // Get and return the crypto data
      const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
      })
      // Format the native balance formatted in ether via the .ether getter
      const native = nativeBalance.result.balance.ether

      res.status(200)
      res.json(native)
    } catch (error) {
      // Handle errors
      console.error(error)
      res.status(500)
      res.json({ error: error.message })
    }
  })

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})