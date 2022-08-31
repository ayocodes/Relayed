import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import NewUserContext from "../context/newuser";
import Button from "./Button";
import Text from "./Text";
import AccountContext from "../context/account";


const Modal: React.FC = () => {
  const [newUser, setNewUser] = useContext(NewUserContext);
  const [account, setAccount] = useContext(AccountContext);


  const close = () => {
    setNewUser(false);
    axios.put('http://localhost:5000/user/update', {UPAddress: account})
  };

  if (!newUser) {
    return null;
  }

  return (
    <SModal onClick={close}>
      <SBox1 onClick={(e) => e.stopPropagation()}>
        <SBox2>
          <SClose onClick={close}>
            <img src="close2.png" alt="" />
          </SClose>
        </SBox2>
        <SBox3>
          <p>👋🔥💣 </p>
          <SBox4></SBox4>

          <Text type="h6">
            Welcome to <span style={{ fontWeight: "bold" }}>Relayed.</span>
          </Text>
          <SBox4></SBox4>

          <SText>
            You have been given free 50 rlyx to perform any transaction across
            Lukso's Blockchain. Enjoy!
          </SText>
          <SBox4></SBox4>
          <Button func={close} color={'#161C30'} borderColor={"#A592F2"}>
            Okay!
          </Button>
        </SBox3>
      </SBox1>
    </SModal>
  );
};

const SBox5 = styled.div`
  display: grid;
  place-items: center;
`;
const SBox4 = styled.div`
  display: flex;
  height: 1rem;
`;

const SText = styled.p`
  font-weight: 300;
  text-align: center;
`;
const SBox3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
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
  padding: 1rem 2rem;
`;

const SClose = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  display: grid;
  place-items: center;
  border-radius: 6px;
  :hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const SBox2 = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  /* padding-bottom: 1rem; */
`;

export default Modal;
