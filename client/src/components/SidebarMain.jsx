import React from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { DRAWER_WIDTH } from "../util/config.js";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors.js";

export default function SidebarMain({ user, balance }) {
  return (
    <div>
      <CssBaseline />

      <Drawer
        sx={{
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
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant={"h5"} sx={{ fontWeight: "600", paddingLeft: "1em", marginBottom: "1em" }}>
          myBank
        </Typography>
        {user.isAuthenticated && (
          <div>
            <Typography variant="caption" sx={{}}>
              Available Balance:
            </Typography>
            <Typography variant="h5" sx={{ paddingLeft: "1em" }}>
              {balance?.toFixed?.(2)} USD
            </Typography>
          </div>
        )}

        <List sx={{ width: "100%" }}>
          {user.isAuthenticated && (
            <>
              <ListItem component={Link} to={"/dashboard"} sx={{ background: middleBlue, marginY: "1em" }}>
                <ListItemButton sx={{ transition: "all 0.4s ease-in-out", "&:hover": { transform: "scale(1.1)" } }}>
                  <ListItemIcon>
                    <GridViewIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Overview"} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
              <ListItem component={Link} to={"/create-transaction"} sx={{ background: middleBlue, marginY: "1em" }}>
                <ListItemButton sx={{ transition: "all 0.4s ease-in-out", "&:hover": { transform: "scale(1.1)" } }}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Create Transaction"} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {!user.isAuthenticated && (
            <ListItem component={Link} to={"/sign-up"} sx={{ background: middleBlue, marginY: "1em" }}>
              <ListItemButton sx={{ transition: "all 0.4s ease-in-out", "&:hover": { transform: "scale(1.1)" } }}>
                {/* <ListItemIcon>{getIconForAppbar(index)}</ListItemIcon> */}
                <ListItemText primary={"Sign Up"} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
}
