import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import TransactionComp from "../components/TransactionComp";
import AccountContext from "../context/account";
import ConnectContext from "../context/connect";

interface ITransactionProps {
  transactionHash: string;
  controllerAccount: string;
  success: boolean;
  date: any;
  gasUsed: number;
}

const Transaction = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [connected, setConnected] = useContext(ConnectContext);
  const [transactions, setTransactions] = useState<ITransactionProps[]>();

  useEffect(() => {
    console.log(account);
    axios
      .get(`https://relayed-service.herokuapp.com/user/transactions/${account}`)
      .then((transactionData) => {
        const transaction = transactionData.data[0].transaction;
        setTransactions(transaction);
      });
      if (!connected) {
        Router.push("./");
      }
  }, []);

  // if (!transactions?.length) {
  //   return <Text>Your transactions will show here</Text>;
  // }

  return (
    <SMain>
      <SBox>
        {!transactions?.length ? (
          <Text type="h6">Your transactions will show here</Text>
        ) : (
          ""
        )}
        {transactions?.map((transaction, i) => (
          <TransactionComp
            key={i}
            transactionHash={transaction.transactionHash}
            EOAAccount={transaction.controllerAccount}
            status={transaction.success}
            date={transaction.date}
            gas={transaction.gasUsed}
          />
        ))}
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

export default Transaction;
