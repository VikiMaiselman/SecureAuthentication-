import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline, List, ListItemIcon, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { DRAWER_WIDTH } from "../util/config.js";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors.js";
import {
  BalanceInfo,
  StyledDrawer,
  StyledListButton,
  StyledListItem,
  StyledListItemText,
  StyledLogo,
} from "./SidebarMainStyled.jsx";

export default function SidebarMain({ user, balance }) {
  return (
    <div>
      <CssBaseline />

      <StyledDrawer variant="permanent" anchor="left">
        <StyledLogo variant={"h5"}>myBank</StyledLogo>
        {user.isAuthenticated && (
          <div>
            <Typography variant="caption">Available Balance:</Typography>
            <BalanceInfo variant="h5">{balance?.toFixed?.(2)} USD</BalanceInfo>
          </div>
        )}

        <List sx={{ width: "100%" }}>
          {user.isAuthenticated && (
            <>
              <StyledListItem component={Link} to={"/dashboard"}>
                <StyledListButton>
                  <ListItemIcon>
                    <GridViewIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <StyledListItemText primary={"Overview"} />
                </StyledListButton>
              </StyledListItem>
              <StyledListItem component={Link} to={"/create-transaction"}>
                <StyledListButton>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <StyledListItemText primary={"Create Transaction"} />
                </StyledListButton>
              </StyledListItem>
            </>
          )}
          {!user.isAuthenticated && (
            <StyledListItem component={Link} to={"/sign-up"}>
              <StyledListButton>
                <ListItemIcon>
                  <LoginOutlinedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <StyledListItemText primary={"Sign Up"} />
              </StyledListButton>
            </StyledListItem>
          )}
        </List>
      </StyledDrawer>
    </div>
  );
}
