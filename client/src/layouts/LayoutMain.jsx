import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import SidebarMain from "../components/SidebarMain.jsx";

import { DRAWER_WIDTH } from "../util/config.js";
import { useAuth } from "../contexts/Authentication.context.jsx";

import { LinkToLogout, StyledContainer, StyledSubheader, StyledUserData } from "./LayoutMainStyles.js";

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

      <StyledContainer marginLeft={`${DRAWER_WIDTH}px`}>
        {user.isAuthenticated && (
          <StyledUserData>
            <StyledSubheader variant="body1">Hello, {user.username}</StyledSubheader>
            <LinkToLogout to="/logout">
              <AccountCircleOutlinedIcon />
              Log Out
            </LinkToLogout>
          </StyledUserData>
        )}
        {children}
      </StyledContainer>
    </>
  );
}
