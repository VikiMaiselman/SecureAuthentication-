import { Typography } from "@mui/material";

import { styled } from "@mui/system";

export const LayoutContainer = styled("div")({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  //   transform: "translate(-50%, -50%)",
  "@media (max-width: 800px)": {
    // fontSize: "2.5rem",
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
      <footer>Powered by IronVest</footer>
    </LayoutContainer>
  );
}
