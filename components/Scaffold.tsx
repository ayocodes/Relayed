import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";

import Modal from "./Modal";

interface IScaffoldProp {
  children: React.ReactNode;
}

const SScaffold = styled.div`
  display: flex;
  flex-direction: column;
`;

const Scaffold: React.FC<IScaffoldProp> = ({ children }) => {

  return (
    <SScaffold>
      <Header />
      {children}
      <Modal />
    </SScaffold>
  );
};

export default Scaffold;
