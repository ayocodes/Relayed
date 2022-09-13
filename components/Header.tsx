import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AvatarContext from "../context/avatar";
import ConnectContext from "../context/connect";
import ThemeContext from "../context/theme2";
import Avatar from "./Avatar";
import ConnectButton from "./ConnectButton";
import NavItem from "./NavItem";

const Header = () => {
  const [connected, setConnected] = useContext(ConnectContext);
  const [active, setActive] = useState("");
  const [avatar, setAvatar] = useContext(AvatarContext);
  const [theme, setTheme] = useContext(ThemeContext);
  const router = useRouter();
  const route = router.route;

  useEffect(() => {
    switch (route) {
      case "/dashboard":
        setActive("dashboard");
        break;
      case "/transactions":
        setActive("transaction");
        break;
      case "/quota":
        setActive("quota");
        break;

      default:
        break;
    }
  }, [route]);
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const isActive = useCallback(
    (name: string) => {
      return name === active ? true : false;
    },
    [active]
  );

  return (
    <SHeader>
      <SBox>
        <SNavItem
          setActive={setActive}
          name={"dashboard"}
          active={isActive("dashboard")}
          route={"/dashboard"}
        >
          Relayed.
        </SNavItem>
        {connected ? (
          <Sdiv>
            <NavItem
              setActive={setActive}
              name={"transaction"}
              active={isActive("transaction")}
              route={"/transactions"}
            >
              Transaction
            </NavItem>
            <NavItem
              setActive={setActive}
              name={"quota"}
              active={isActive("quota")}
              route={"/quota"}
            >
              Quota
            </NavItem>
          </Sdiv>
        ) : (
          ""
        )}
        <SBox2>
          <SBox1 onClick={themeToggler}>
            {theme === "light" ? (
              <Simg src="darkMode.svg" alt="darkMode" />
            ) : (
              <Simg src="lightMode.svg" alt="lightMode" />
            )}
          </SBox1>

          {connected ? (
            <Avatar
              height={"3.75rem"}
              // imgUrl={"dp.jpg"}
              imgUrl={avatar}
              width={"3.75rem"}
            />
          ) : (
            <ConnectButton />
          )}
        </SBox2>
      </SBox>
    </SHeader>
  );
};
const SHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: ${({ theme }) => `2px solid ${theme.nav}`};
  background-color: ${({ theme }) => theme.backgroundColor};

  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Simg = styled.img`
  width: 1.7rem;
`;

const SBox1 = styled.div`
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  :hover {
    background-color: ${({ theme }) => theme.modal};
  }
`;

const SBox = styled.div`
  max-width: 65rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem;
  align-items: center;
`;

const SNavItem = styled(NavItem)`
  font-size: 1.8rem;
  border-bottom: none;
  font-weight: bold;

  width: min-content;
  line-height: 1.3;
  background: linear-gradient(269.7deg, #3646d9 0.11%, #b75dee 91.18%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Sdiv = styled.div`
  margin-left: -15rem;
  display: flex;
  width: 100%;
  max-width: 11rem;
  justify-content: space-between;
`;

const SBox2 = styled.div`
  display: flex;
  width: 100%;
  max-width: 20rem;
  justify-content: space-between;
`;

export default Header;
