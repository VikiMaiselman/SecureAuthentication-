import styled from "@emotion/styled";
import { Drawer, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

import { DRAWER_WIDTH } from "../util/config.js";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors.js";

export const StyledDrawer = styled(Drawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  display: "flex",
  "& .MuiDrawer-paper": {
    width: DRAWER_WIDTH,
    boxSizing: "border-box",
    background: `linear-gradient(to bottom, ${superLightBLue}, ${lightBlue})`,
    paddingTop: "2rem",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "flex-start",
    gap: "1.5em",
  },
});

export const StyledLogo = styled(Typography)({
  fontWeight: "600",
  paddingLeft: "1em",
  marginBottom: "1em",
});

export const BalanceInfo = styled(Typography)({
  paddingLeft: "1em",
});

export const StyledListItem = styled(ListItem)({
  background: middleBlue,
  marginTop: "1em",
  marginBottom: "1em",
});

export const StyledListButton = styled(ListItemButton)({
  transition: "all 0.4s ease-in-out",
  "&:hover": { transform: "scale(1.1)" },
});

export const StyledListItemText = styled(ListItemText)({
  color: "white",
});
