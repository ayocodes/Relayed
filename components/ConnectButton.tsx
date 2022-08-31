import React, { useEffect, useState, useContext } from "react";
import Text from "./Text";
import styled from "styled-components";
import AccountContext from "../context/account";
import ConnectContext from "../context/connect";
import NewUserContext from "../context/newuser";
import QuotaContext from "../context/quota";
import TQuotaContext from "../context/totalquota";
import Web3 from "web3";
import Router from "next/router";
import axios from "axios";

const SButton = styled.div`
  height: 3rem;
  width: 13rem;
  padding: 0 2.5rem;
  border: 2px solid #939393;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  user-select: none;
  cursor: pointer;

  :hover {
    border: 2px solid #b566c1;
    transition: all 250ms;
  }
`;

const ConnectButton = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [connected, setConnected] = useContext(ConnectContext);
  const [newUser, setNewUser] = useContext(NewUserContext);
  const [quota, setQuota] = useContext(QuotaContext);
  const [totalQuota, setTotalQuota] = useContext(TQuotaContext);

  useEffect(() => {
    // Web3 Browswer Detection
    if (typeof (window as any).ethereum == "undefined") {
      alert("pls install lukso extension");
      return;
    }
  }, []);

  async function signIn() {
    const web3 = new Web3((window as any).ethereum);
    const hash = Date.now();

    const date = hash + "";

    await web3.eth.requestAccounts().then(async (accountsRequest) => {
      const signature = await web3.eth.sign(date, accountsRequest[0]);
      const address = web3.eth.accounts.recover(
        date,
        (signature as any).signature
      );
      const sigAddress = (signature as any).address;
      console.log(sigAddress);
      console.log(address);

      if (sigAddress == address) {
        console.log(`${accountsRequest[0]} account address`);
        setAccount(accountsRequest[0]);
        setConnected(true);
        Router.push("./dashboard");

        axios
          .get(`http://localhost:5000/user/newuser/${accountsRequest[0]}`)
          .then((user) => {
            if (user.data[0].newUser) {
              setNewUser(true);
            }
            setQuota(user.data[0].quota.remainingQuota);
            setTotalQuota(user.data[0].quota.totalQuota);
          });

        return;
      }
    });
  }

  return (
    <SButton onClick={signIn}>
      <Text>Connect wallet</Text>
    </SButton>
  );
};

export default ConnectButton;
