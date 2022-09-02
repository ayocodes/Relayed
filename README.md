## WELCOME TO RELAYED.

Relayed is a transaction relay service submitted for Lukso's hackathon. It offers a subscription service where users can pay for monthly subscriptions and then they can perform gasless transactions through the relay service provider.

[Watch a quick demo ](https://www.loom.com/share/941830ba523f48b2ace5cca48d954552)
[Try out the app ](https://relayed-ten.vercel.app/dashboard)
[Check out the server](https://github.com/ayocodes/relayedServer)

## How it works

- **To execute a transaction send a PUT request to**
  "https://relayed-service.herokuapp.com/user/execute"
  <br />

  **It request**
  {
  UPAddress: UPAddress
  EOA: EOA's signing it (to verify if the signature signing and decrypted hash is the same)
  Signature: EOA's signature
  Hash: hash
  Nonce: nonce
  AbiPayload: abiPayload
  };
  <br />

  **It returns**
  {
  Success: true
  ControllerAccount: EOA
  Cate: Date()
  TransactionHash: executeRelayCallTransaction.transactionHash
  GasUsed: executeRelayCallTransaction.cumulativeGasUsed
  }
  <br />
  <br />

- **To check user's balance send a Post request to**
  "https://relayed-service.herokuapp.com/user/checkQuota"
  <br />

  **It request**
  {
  Address: UPAddress
  Timestamp: Date.now() as hash
  Signature: signature
  EOA: EOA address
  }
  <br />

  **It returns**
  {
  Quota: quota left
  Unit: unit of the relay which is rlyx
  TotalQuota: total quota left
  }

  **The relayer can be tested with [sending lyxs](https://relayed-ten.vercel.app/send)** 

### Technologies used

- Nextjs
- LSP fuctions
- Mongodb
  <br />
  _contact me @ omotolatomi01@gmail.com_
