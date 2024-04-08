import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SidebarMain from "../components/SidebarMain.jsx";

import { DRAWER_WIDTH } from "../util/config.js";

import { superLightBLue, lightBlue, middleBlue } from "../global-styles/Colors.js";
import { useAuth } from "../contexts/Authentication.context.jsx";

export default function LayoutMain({ children }) {
  const { user, checkStatus, balance } = useAuth();

  React.useEffect(() => {
    const updUserStatus = async () => {
      try {
        await checkStatus();
      } catch (error) {
        console.error(error);
      }
    };
    updUserStatus();
  }, []);

  return (
    <>
      <SidebarMain user={user} balance={balance} />

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
