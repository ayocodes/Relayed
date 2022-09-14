import styled from "styled-components";
import Text from "./Text";
import AccountContext from "../context/account";
import React, { useEffect, useState, useContext } from "react";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { callback } from "react-paystack/dist/types";

interface IPayProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PayModal: React.FC<IPayProps> = ({ modal, setModal }) => {
  const publicKey = "pk_test_6628c7bb8c59f5bdff14cb747b12cd2f8b419b2d";
  const amount = 500000; //  in kobo
  const [email, setEmail] = useState("");
  const [account, setAccount] = useContext(AccountContext);

  const onSuccess = (reference: any) => {
    handleSuccess(reference);
  };

  const componentProps = {
    email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: onSuccess as callback,
    // onSuccess: (reference: any) => {
    //   const data:any = reference

    // const response = {
    //   UPAddress: account,
    //   reference: reference.reference,
    //   message: reference.message,
    // }
    // console.log(response)
    // axios.put(
    //   `https://relayed-service.herokuapp.com/user/verifyTransaction`,
    //   {
    //     UPAddress: account,
    //     reference: reference.reference,
    //     message: reference.message,
    //   }
    // );
    // },
  };

  const handleSuccess = (reference: any) => {
    axios.put(`https://relayed-service.herokuapp.com/user/verifyTransaction`, {
      UPAddress: account,
      reference: reference.reference,
      message: reference.message,
    });
  };

  if (!modal) {
    return null;
  }
  return (
    <SModal onClick={() => setModal(false)}>
      <SBox1 onClick={(e) => e.stopPropagation()}>
        <SBox>
          <SText>Email</SText>
          <STextArea value={email} onChange={(e) => setEmail(e.target.value)} />
        </SBox>
        <SBox>
          <SText>Amount</SText>
          <Text>NGN {amount / 100}</Text>
        </SBox>
        <SBox2>
          <SPaystackButton {...componentProps} />
        </SBox2>
      </SBox1>
    </SModal>
  );
};

const SBox = styled.div`
  margin-bottom: 2rem;
`;

const SBox2 = styled.div`
  display: flex;
  justify-content: center;
`;

const SModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SBox1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 35vw;
  background: ${({ theme }) => theme.modal};
  border-radius: 1rem;
  height: 50vh;
  position: relative;
  padding: 2rem;
  justify-content: space-around;
`;

const SPaystackButton = styled(PaystackButton)`
  height: 2.5rem;
  width: 9rem;
`;

const SText = styled(Text)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text2};
  margin-bottom: 2px;
  padding-left: 4px;
`;

const STextArea = styled.textarea`
  border: ${({ theme }) => `2px solid ${theme.primary}`};
  font-size: 16px;
  font-weight: 400;
  padding: 15px 1rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.text1};
  background-color: transparent;
  resize: none;
  outline: none;
  width: 23rem;
  height: 3.5rem;
`;

export default PayModal;
