import { ERC725 } from "@erc725/erc725.js";
import type { NextPage } from "next";
import Web3 from "web3";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Bound from "../components/Bound";
import Button from "../components/Button";
import PayModal from "../components/PayModal";
import Text from "../components/Text";
import AccountContext from "../context/account";
import ConnectContext from "../context/connect";
import AvatarContext from "../context/avatar";
import axios from "axios";

const Dashboard: NextPage = () => {
  const [account, setAccount] = useContext(AccountContext);
  const [connected, setConnected] = useContext(ConnectContext);
  const [avatar, setAvatar] = useContext(AvatarContext);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [totalQuota, setTotalQuota] = useState(0);
  const [quota, setQuota] = useState(0);
  const [daysLeft, setdaysLeft] = useState(0)



  useEffect(() => {
    if (!connected) {
      Router.push("./");
    }
    const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
    const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";
    // Parameters for ERC725 Instance
    const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
    const config = { ipfsGateway: IPFS_GATEWAY };

    async function fetchProfileData(address: string) {
      try {
        const profile = new ERC725(
          erc725schema as any,
          address,
          provider,
          config
        );
        return await profile.fetchData("LSP3Profile");
      } catch (error) {
        return console.log("This is not an ERC725 Contract");
      }
    }

    fetchProfileData(account).then((profileData) => {
      setName((profileData as any).value.LSP3Profile.name);
    });

    axios
    .get(`https://relayed-service.herokuapp.com/user/newuser/${account}`)
    .then((user) => {
      console.log(user)
      setQuota(user.data.quota.remainingQuota);
      setTotalQuota(user.data.quota.totalQuota);
      setdaysLeft(user.data.quota.daysLeft);
    });


  });


  return (
    <SMain>
      <SBox>
        <SBox1>
          <Avatar
            height={"9.4rem"}
            // imgUrl={"dp.jpg"}
            imgUrl={avatar}
            width={"9.4rem"}
          />
          <SBoxdet>
            <Text type="h6">Hello there, {name}
            </Text>
            <SText type="h6">{account}</SText>
          </SBoxdet>
        </SBox1>
        <SBox2>
          <Bound>
            <SHeader>Quota Statistics</SHeader>
            <SBox3>
              <SProgress>
                <CircularProgressbar
                  value={quota}
                  text={""}
                  maxValue={totalQuota}
                  styles={buildStyles({
                    // strokeLinecap: "round",
                    pathTransitionDuration: 0.5,
                    pathColor: "#A592F2",
                    trailColor: "#C8CCE4",
                  })}
                />
              </SProgress>
            </SBox3>
            <SQdetails>
              <img src="bullet.svg" alt="" />
              <SText1>
                {quota} of {totalQuota} rlyx left
              </SText1>
            </SQdetails>
            <SQdetails>
              <img src="bullet.svg" alt="" />
              <SText1>{daysLeft} days left</SText1>
            </SQdetails>
          </Bound>
          <SBound>
            <SHeader>Quota finished? buy more here</SHeader>
            <SBox3>
              <SText3>5K Naira/</SText3>
              <SText3>month</SText3>
            </SBox3>
            <SBox3>
              <Button
                func={() => {
                  // window.location.replace("https://paystack.com/pay/relayed");
                  setModal(true);
                }}
                color={"#939393"}
                borderColor={"#A592F2"}
              >
                Get now
              </Button>
            </SBox3>
            <PayModal modal={modal} setModal={setModal} />
          </SBound>
        </SBox2>
      </SBox>
    </SMain>
  );
};

export default Dashboard;

const SProgress = styled.div`
  height: 10rem;
  width: 10rem;
  margin: 1.2rem 0;
`;

const Sa = styled.a`
  text-decoration: none;
`;

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

const SBox1 = styled.div`
  display: flex;
`;
const SBoxdet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;
const SText = styled(Text)`
  font-weight: 700;
  margin-top: 1rem;
`;

const SBox2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 3rem;

  place-items: center;
  margin-top: 6rem;
`;

const SHeader = styled(Text)`
  color: ${({ theme }) => theme.text2};
  font-size: 1.1rem;
`;

const Simg = styled.img`
  height: 10rem;
  width: 10rem;
  margin: 1.2rem 0;
`;

const SQdetails = styled.div`
  display: flex;
  align-items: center;
`;

const SText1 = styled(Text)`
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 500;
`;

const SBox3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SBound = styled(Bound)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SText3 = styled.p`
  font-size: 3rem;
  padding: 1rem;
  font-weight: 600;
`;
function async() {
  throw new Error("Function not implemented.");
}
