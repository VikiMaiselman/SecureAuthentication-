import { Button, FormLabel, Tab, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const AuthPageContainer = styled("div")({
  height: "80vh",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const AuthBackground = styled("img")({
  width: "auto",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -9,
  boxSizing: "border-box",
  boxShadow: "-600px -160px white inset",
  filter: "blur(1px)",
});

export const Overlay = styled("div")({
  width: "50%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: -7,
  background: "linear-gradient(to right, rgba(255,255,255,1) 75%, rgba(255,255,255,0.6) , rgba(255, 255, 255, 0))",
});

export const PageHeaderText = styled(Typography)({
  backgroundImage: "linear-gradient(45deg, #4A435D, #1A3496, #427EEE)",
  backgroundClip: "text",
  textFillColor: "transparent",
  fontWeight: "700",
  letterSpacing: 1.2,
});

export const AuthForm = styled("div")({
  width: "25rem",
  height: "85%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",

  paddingTop: "5em",
  paddingLeft: "2.5em",
  paddingRight: "1.5em",
  position: "relative",
  zIndex: 6,
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.75)",
});

export const StyledTab = styled(Tab)({
  color: "#1A3496",
  "&:focus": { outline: "none", color: "#1A3496" },
});

export const StyledFormLabel = styled(FormLabel)({
  alignSelf: "start",
});

export const StyledTextField = styled(TextField)({
  width: "100%",
  backgroundColor: "rgb(255, 255, 255)",
  marginBottom: "1em",
});

export const StyledButton = styled(Button)({
  width: "75%",
  backgroundColor: "#1A3496",
});
