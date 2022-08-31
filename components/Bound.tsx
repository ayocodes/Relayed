import React from "react";
import styled from "styled-components";

interface IBoundProp {
  children: React.ReactNode;
  className?: any;
}

const SBound = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  position: relative;
  max-width: 30.5rem;
  background-color: ${({ theme }) => theme.primary};
  height: 20.3rem;
  padding: 1.8rem 3rem;
`;

const Bound: React.FC<IBoundProp> = ({ className, children }) => {
  return <SBound className={className}>{children}</SBound>;
};

export default Bound;
