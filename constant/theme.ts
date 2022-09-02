import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  backgroundColor: "#FFFFFF", 
  nav: "#E1E2E2",
  donation:"",
  primary: "#F6F8FC", //for the cards
  accent1: "#939393", //for button rest phase
  accent2: "",
  accent3: "",
  accent4: "",
  accent5: "",
  text1: "#202124", // main text
  text2: "#64696E", // secondary text
  text3: "", 
  border: "#D3E3FD", //statistics and buttons
  borderHover: "",
  modal: "#C0C7D4",
  error: "#",
  warn: "#",
  dark: false,
};

export const darkTheme: DefaultTheme = {
  backgroundColor: "#0F1228",
  donation: "#",
  nav: "#272C45",
  primary: "#282E50",
  accent1: "#",
  accent2: "#",
  accent3: "#",
  accent4: "# ",
  accent5: "# ",
  // text1: "#C8CCE4",
  // text2: "#939393",
  text1: "#ffffff",
  text2: "#ABB1C6",
  text3: "#",
  border: "#A592F2",
  borderHover: "#",
  modal: "#161C30",
  error: "#",
  warn: "#", //"#FF6363",
  dark: true,
};

export type ThemeType = typeof lightTheme;
