import axios from "axios";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SharedQuota from "../components/SharedQuota";
import Text from "../components/Text";
import AccountContext from "../context/account";
import ConnectContext from "../context/connect";

interface IShareQuotaProps {
  _id: any;
  UPAddress: string;
}

const quota = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [connected, setConnected] = useContext(ConnectContext);
  const [recieverAddress, setRecieverAddress] = useState("");
  const [shareQuota, setShareQuota] = useState<IShareQuotaProps[]>();

  useEffect(() => {
    console.log(account);
    axios
      .get(`http://localhost:5000/user/transactions/${account}`)
      .then((data) => {
        const quotaData = data.data[0].shareQuota;
        setShareQuota(quotaData);
      });


    if (!connected) {
      Router.push("./");
    }
  }, []);

  const add = () => {
    const addData = {
      recieverAddress: recieverAddress,
      giverUPAddress: account,
    };

    shareQuota &&
      setShareQuota([...shareQuota, { _id: 0, UPAddress: recieverAddress }]);

    axios.put("http://localhost:5000/user/updateQuotaStatus", addData);
  };


  return (
    <SMain>
      <SBox>
        <Text type={"h6"}>Share quota with</Text>
        <Sdiv>
          <STextArea
            value={recieverAddress}
            onChange={(e) => setRecieverAddress(e.target.value)}
            required
          />
          <SButton onClick={add}>
            <SText>add</SText>
          </SButton>
        </Sdiv>
        {!shareQuota?.length ? (
          ""
        ) : (
          <Text type="h6">UPs you're sharing your quota with</Text>
        )}
        {shareQuota?.map((data, i) => (
          <SharedQuota
            _id={data._id}
            UPAddress={account}
            children={data.UPAddress}
            key={i}
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
  margin-top: 2rem;
`;

const SButton = styled.div`
  /* height:  3.4rem; */
  width: 4rem;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  border-radius: 0rem 0.5rem 0.5rem 0rem;

  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SText = styled(Text)`
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
  }
`;

const STextArea = styled.textarea`
  border: ${({ theme }) => `2px solid ${theme.primary}`};
  font-size: 16px;
  font-weight: 400;
  padding: 15px 1rem;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  color: white;
  background-color: transparent;
  resize: none;
  outline: none;
  width: 26rem;
  /* height: 3.4rem; */
`;

const Sdiv = styled.div`
  display: flex;
  height: 3.4rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export default quota;
