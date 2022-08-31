import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface INavItemProps {
  setActive: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  children: React.ReactNode;
  active: boolean;
  route: string;
  className?: any;
}

interface ISNavItem {
  active: boolean;
}

const NavItem: React.FC<INavItemProps> = ({
  setActive,
  name,
  children,
  active,
  route,
  className,
}) => {
  return (
    <Link passHref={true} href={route}>
      <SLink onClick={() => setActive(name)}>
        <Sp active={active} className={className}>
          {children}
        </Sp>
      </SLink>
    </Link>
  );
};

const SLink = styled.a`
  text-decoration: none;
  user-select: none;
`;

const Sp = styled.p<ISNavItem>`
  ${({ active, theme }) =>
    active ? `color: ${theme.text1}` : `color: ${theme.text2}`};
  font-size: 1rem;
  :hover {
    ${({ theme }) => `color: ${theme.text1}`};
    transition: all 250ms;
  }
`;

export default NavItem;
