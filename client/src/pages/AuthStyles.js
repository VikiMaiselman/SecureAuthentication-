import { Button, FormLabel, Tab, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { lightBlue, middleBlue, darkBlue } from "../global-styles/Colors";

export const AuthPageContainer = styled("div")({
  minHeight: "80vh",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "small",
  },
});

export const AuthBackground = styled("img")({
  width: "auto",
  minHeight: "50em",
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -9,
  boxSizing: "border-box",
  boxShadow: "-600px -160px white inset",
  filter: "blur(1px)",
  "@media (max-width: 992px)": {
    minHeight: "80em",
  },
  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const Overlay = styled("div")({
  width: "50%",
  minHeight: "51em",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: -7,
  background: "linear-gradient(to right, rgba(255,255,255,1) 75%, rgba(255,255,255,0.6) , rgba(255, 255, 255, 0))",
  "@media (max-width: 992px)": {
    minHeight: "80em",
  },
  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const PageHeaderText = styled(Typography)({
  backgroundImage: `linear-gradient(45deg, ${darkBlue}, ${middleBlue}, ${lightBlue})`,
  backgroundClip: "text",
  textFillColor: "transparent",
  fontWeight: "700",
  letterSpacing: 1.2,
  "@media (max-width: 992px)": {
    fontSize: "2em",
    minWidth: "max-content",
  },
  "@media (max-width: 768px)": {
    display: "none",
  },
});

export const AuthForm = styled("div")({
  width: "25rem",
  minHeight: "85%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "5em",
  paddingBottom: "5em",
  paddingLeft: "2.5em",
  paddingRight: "1.5em",
  position: "relative",
  zIndex: 6,
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.75)",
  "@media (max-width: 768px)": {
    width: "20rem",
    minHeight: "50vh",
    paddingTop: "2.5em",
  },
});

export const StyledTab = styled(Tab)({
  color: "#1A3496",
  "&:focus": { outline: "none", color: middleBlue },
});

export const StyledFormLabel = styled(FormLabel)({
  alignSelf: "start",
});

export const StyledTextField = styled(TextField)({
  width: "100%",
  backgroundColor: "rgb(255, 255, 255)",
  marginBottom: "1em",
  "@media (max-width: 768px)": {
    fontSize: "small",
  },
});

export const StyledButton = styled(Button)({
  width: "75%",
  backgroundColor: middleBlue,
  marginBottom: "1em",
});

export const PaleStyledButton = styled(Button)({
  width: "75%",
  backgroundColor: lightBlue,
  marginBottom: "1em",
});
