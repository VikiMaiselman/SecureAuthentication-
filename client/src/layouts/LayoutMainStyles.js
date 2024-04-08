import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "flex-start",
});

export const StyledUserData = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const StyledSubheader = styled(Typography)({
  marginRight: "auto",
});

export const LinkToLogout = styled(Link)({
  display: "flex",
  alignItems: "center",
  transition: "all 0.4s ease-in-out",
  "&:hover": { transform: "scale(1.2)" },
});
