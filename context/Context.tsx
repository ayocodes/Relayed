import { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../constant/theme";
import ThemeContext from "./theme";
import AccountContext from "./account";
import ConnectContext from "./connect";
import NewUserContext from "./newuser";
import QuotaContext from "./quota";
import TQuotaContext from "./totalquota";

export default function Context({ children }: { children: any }) {
  const [theme, setTheme] = useState("dark");
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [quota, setQuota] = useState();
  const [totalQuota, setTotalQuota] = useState();
  return (
    <ThemeContext.Provider value={setTheme}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <ConnectContext.Provider value={[connected, setConnected]}>
          <AccountContext.Provider value={[account, setAccount]}>
            <NewUserContext.Provider value={[newUser, setNewUser]}>
              <TQuotaContext.Provider value={[totalQuota, setTotalQuota]}>
                <QuotaContext.Provider value={[quota, setQuota]}>
                  {children}
                </QuotaContext.Provider>
              </TQuotaContext.Provider>
            </NewUserContext.Provider>
          </AccountContext.Provider>
        </ConnectContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
