import React, { useState } from "react";
import Web3 from "web3";
import UniversalProfileContract from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import KeyManagerContract from "@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json";
import styled from "styled-components";
import Button from "../components/Button";
import Text from "../components/Text";
import axios from "axios";

const send = () => {
  const [rAddress, setRAddress] = useState();
  const [amount, setAmount] = useState("");
  const [controllerAccount, setControllerAccount] = useState("");

  const send = async () => {
    const callData = "0x"; //no data needed for transferring

    const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
    const wweb3 = new Web3((window as any).ethereum);
    
    console.log(rAddress, amount, controllerAccount)

    const web3 = new Web3(RPC_ENDPOINT);
    await wweb3.eth.requestAccounts().then(async (accountsRequest) => {
      const myUniversalProfile = new web3.eth.Contract(
        UniversalProfileContract.abi as any,
        accountsRequest[0]
      );

      const keyManagerAddress = await myUniversalProfile.methods.owner().call();

      const KeyManager = new web3.eth.Contract(
        KeyManagerContract.abi as any,
        keyManagerAddress
      );
      console.log(KeyManager);

      const channelId = 0;

      const nonce = await KeyManager.methods
        .getNonce(controllerAccount, channelId)
        .call();

      const abiPayload = myUniversalProfile.methods
        .execute(0, rAddress, web3.utils.toWei(amount), callData)
        .encodeABI();

      const chainId = 2828;

      const hash = web3.utils.soliditySha3(chainId, keyManagerAddress, nonce, {
        t: "bytes",
        v: abiPayload,
      });

      const signatureObject = await wweb3.eth.sign(
        hash as string,
        accountsRequest[0]
      );
      const deliver = {
        UPAddress: accountsRequest[0],
        EOA: (signatureObject as any).address,
        signature: (signatureObject as any).signature,
        hash: hash,
        nonce: nonce,
        abiPayload: abiPayload,
      };

      console.log(deliver);

      axios.put("http://localhost:5000/user/execute", deliver);
    });
  };
  return (
    <SMain>
      <SBox>
        <label>
          <Text>send to 0x4a6f470298038bde612bc4d6055f3232737ae3f2</Text>
          <STextArea
            value={rAddress}
            onChange={(e) => setRAddress(e.target.value as any)}
            required
          />
        </label>
        <label>
          <Text>amount to send</Text>
          <STextArea
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          <Text>
            controllerAccount 0x24a69C92f7b4D5D913e385cCf04B5e60dc241A43
          </Text>
          <STextArea
            value={controllerAccount}
            onChange={(e) => setControllerAccount(e.target.value)}
            required
          />
        </label>
        <Button func={send} color={""} borderColor={"purple"}>
          send
        </Button>
      </SBox>
    </SMain>
  );
};

const SMain = styled.main`
  display: flex;
  justify-content: center;
`;
const SBox = styled.div`
  max-width: 65rem;
  width: 100%;
  margin: 2rem;
`;

const STextArea = styled.textarea`
  border: ${({ theme }) => `2px solid ${theme.primary}`};
  font-size: 16px;
  font-weight: 400;
  padding: 15px 1rem;
  border-radius: 0.5rem;
  color: white;
  background-color: transparent;
  resize: none;
  outline: none;
  width: 26rem;
  /* height: 3.4rem; */
`;

export default send;
