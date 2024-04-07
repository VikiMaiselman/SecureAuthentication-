import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { DRAWER_WIDTH } from "../util/config.js";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors.js";
import { useAuth } from "../contexts/Authentication.context.jsx";

export default function LayoutMain({ children }) {
  const { user, checkStatus } = useAuth();
  //   const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    const updUserStatus = async () => {
      try {
        await checkStatus();
      } catch (error) {
        console.error(error);
      }
    };
    updUserStatus();
    // setBalance(() => user.balance);
  }, []);

  return (
    <>
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
                {user.balance.toFixed?.(2)} USD
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
      <Box
        height={"100vh"}
        display="flex"
        flexDirection={"column"}
        alignItems="start"
        justifyContent="flex-start"
        marginLeft={`${DRAWER_WIDTH}px`}
      >
        {user.isAuthenticated && (
          <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: "auto" }}>
              Hello, {user.username}
            </Typography>
            <Link
              to="/logout"
              style={{
                display: "flex",
                alignItems: "center",
                transition: "all 0.4s ease-in-out",
                "&:hover": { transform: "scale(1.2)" },
              }}
            >
              <AccountCircleOutlinedIcon />
              Log Out
            </Link>
          </div>
        )}
        {children}
      </Box>
    </>
  );
}
