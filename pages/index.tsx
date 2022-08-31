import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import ConnectButton from "../components/ConnectButton";

const Home = () => {
  return (
    <SMain>
      <SCenter>
        <SIntroBox>
          <SIntrowrite>
            <STitle>New ways to perform transaction on the blockchain</STitle>
            <Sintro>
              Enjoy gasless transactions, choose a subscription plan and well,
              perform transactions!
              {"\n"}But first, you'll have to connect to your wallet.
            </Sintro>
            <ConnectButton />
          </SIntrowrite>
          <Simg src="redone3.jpg" alt="" />
        </SIntroBox>
        <SText2>Things you might be thinking about</SText2>
        <SFAQBox>
          <SFAQWrite>
            <SText type="h3">What is relay service?</SText>
            <Text>
              Relay service is just like the telecommunication of the internet,
              it enables you to perform any transaction on the blockchain
              without paying for it.
            </Text>
          </SFAQWrite>
          <SFAQWrite>
            <SText type="h3">How does it work?</SText>
            <Text>
              For our first time users, we give them 1 lyx which would be about
              10 free transactions for them. After that, you pay for your
              transactions per month.
            </Text>
          </SFAQWrite>
        </SFAQBox>
      </SCenter>
    </SMain>
  );
};
const SMain = styled.main`
  display: flex;
  justify-content: center;
`;

const SCenter = styled.div`
  max-width: 65rem;
  width: 100%;
  margin: 2rem;
  margin-top: 2rem;
`;

const STitle = styled.p`
  font-size: 3.3rem;
  font-weight: bold;
  line-height: 5rem;
  margin-bottom: 2rem;
`;

const SFAQBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  /* place-items: center; */
  gap: 1rem;
  row-gap: 2rem;
`;

const SIntroBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
`;

const SFAQWrite = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  width: 100%;
  margin: 0 0.5rem;
`;

const SIntrowrite = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 38rem;
  width: 100%;
  z-index: 1;
`;

const Sintro = styled(Text)`
  margin-bottom: 2rem;
`;
const SText2 = styled(Text)`
  margin-top: 10rem;
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text2};
`;
const SText = styled(Text)`
  margin-bottom: 1.5rem;
  font-weight: 600;
  line-height: 2rem;
`;

const Simg = styled.img`
  /* width: 100%; */
  height: 23rem;
  width: 32rem;
`;

export default Home;
