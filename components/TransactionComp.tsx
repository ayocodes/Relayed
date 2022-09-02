import React from "react";
import styled from "styled-components";
import Text from "./Text";

interface ITransactionProps {
  transactionHash: string;
  EOAAccount: string;
  status: boolean;
  ///check if this is correct
  date: any;
  gas: number;
}

const SBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => `4px solid ${theme.nav}`};
  padding: 2rem 0;
`;

const Sstatus = styled.div`
  display: flex;
  width: 43rem;
  justify-content: space-between;
  align-items: center;
`;

const SText = styled.p`
color: ${({theme}) => `${theme.text2}`};
font-size: .9rem;
`
const SText2 = styled(Text)`
padding-bottom: 7px;
`
const Transaction: React.FC<ITransactionProps> = ({
  transactionHash,
  EOAAccount,
  status,
  date,
  gas
}) => {
  return (
    <SBox>
      <Sstatus>
        {status ? (
          <img src="successNew.svg" alt="success" />
        ) : (
          <img src="failedNew.svg" alt="failed" />
        )}
        <div>
          <SText2 type="h6">EOA: {EOAAccount}</SText2>
          <SText>hash: {transactionHash}</SText>
        </div>
      </Sstatus>
      <div>
        <SText>date: {date}</SText>
        <SText>gas : {gas}gwei</SText>
      </div>
    </SBox>
  );
};

export default Transaction;
