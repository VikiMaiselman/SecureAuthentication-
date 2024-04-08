import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import logo from "../images/ironvestLogo.svg";

export const LayoutContainer = styled("div")({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  "@media (max-width: 768px)": {
    alignItems: "center",
  },
  "@media (max-width: 300px)": {
    // fontSize: "2rem",
  },
});

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <header>
        <Typography variant={"h3"}>myBank</Typography>
      </header>
      {children}
      <footer style={{ display: "flex", alignItems: "center" }}>Powered by &nbsp; {<img src={logo} />}</footer>
    </LayoutContainer>
  );
}
