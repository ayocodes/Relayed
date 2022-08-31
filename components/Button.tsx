import React from "react";
import Text from "./Text";
import styled from "styled-components";

interface IButtonProps {
  children: React.ReactNode;
  func: React.MouseEventHandler;
  color: string;
  borderColor: string;
}

interface ISButtonProps {
color: string;
borderColor: string;
}

const SButton = styled.div<ISButtonProps>`
  height: 3rem;
  width: 13rem;
  padding: 0 2.5rem;
  border: ${({ color }) => `2px solid ${color}`};
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  user-select: none;
  cursor: pointer;

  :hover {
    border: ${({ borderColor }) => `2px solid ${borderColor}`};
    transition: all 250ms;
  }
`;

const Button: React.FC<IButtonProps> = ({children, func, color, borderColor}) => {
  return (
    <SButton onClick={func} color = {color} borderColor={borderColor}>
        <Text type="h6">{children}</Text>
    </SButton>
  );
};

export default Button;
