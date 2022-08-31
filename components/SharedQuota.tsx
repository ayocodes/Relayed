import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "./Text";

interface IShareProp {
  children: React.ReactNode;
  _id: any;
  UPAddress: string;
}

const SharedQuota: React.FC<IShareProp> = ({ children, _id, UPAddress }) => {
  const [_did, set_did] = useState();
  const [address, setaddress] = useState("");

  useEffect(() => {
    set_did(_id);
    setaddress(UPAddress);
  }, []);

  const compDelete = () => {
    const deleteData = {
      _id: _did,
      UPAddress: address,
    };
    axios.delete("http://localhost:5000/user/delete", { data: deleteData });

  };

  return (
    <SBox>
      <SText>{children}</SText>
      <Sdelete onClick={compDelete}>
        <img src="delete.png" alt="" />
      </Sdelete>
    </SBox>
  );
};
const SBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;
  align-items: center;
  margin: 1rem 0;
  padding-left: 0.5rem;
`;
const Sdelete = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 0.4rem;
  :hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const SText = styled(Text)`
  color: ${({ theme }) => theme.text2};
`;
export default SharedQuota;
