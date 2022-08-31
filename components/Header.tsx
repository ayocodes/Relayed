import { useRouter } from "next/router";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import ConnectContext from "../context/connect";
import Avatar from "./Avatar";
import ConnectButton from "./ConnectButton";
import NavItem from "./NavItem";

const Header = () => {
  const [connected, setConnected] = useContext(ConnectContext);
  const [active, setActive] = useState("");
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
          Relayed<span style={{ color: "#A592F2" }}>.</span>
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
        {connected ? (
          <Avatar height={"3.75rem"} imgUrl={"/dp.jpg"} width={"3.75rem"} />
        ) : (
          <ConnectButton />
        )}
      </SBox>
    </SHeader>
  );
};
const SHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: ${({ theme }) => `2px solid ${theme.nav}`};
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${({ theme }) => `${theme.backgroundColor}`};
`;

const SBox = styled.div`
  max-width: 65rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem;
  align-items: center;
  /* padding: 0 1rem; */
`;

const SNavItem = styled(NavItem)`
  font-size: 1.7rem;
  border-bottom: none;
  font-weight: bold;

  width: min-content;
  line-height: 1.3;
  background: linear-gradient(
    113.98deg,
    #ffffff 34.61%,
    rgba(255, 255, 255, 0) 139.6%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Sdiv = styled.div`
  margin-left: -29rem;
  display: flex;
  width: 11rem;
  justify-content: space-between;
`;

export default Header;
