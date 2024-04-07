import { Button, Card, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { superLightBLue, middleBlue, darkBlue } from "../global-styles/Colors";

export const VerificationBackground = styled("div")({
  width: "100%",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -9,
  background: `linear-gradient(to right bottom, rgba(255,255,255,1), ${superLightBLue})`,
  filter: "blur(1px)",
});

export const StyledCard = styled(Card)({
  minWidth: 275,
  padding: "5em 2.5em",
  borderRadius: "10px",
  marginLeft: "auto",
  marginRight: "auto",
});

export const StyledHeader = styled(Typography)({
  color: `${darkBlue}`,
  fontWeight: 600,
});

export const DigitSlot = styled(TextField)({
  width: "2.5em",
});

export const StyledButton = styled(Button)({
  width: "75%",
  backgroundColor: `${middleBlue}`,
  marginLeft: "auto",
  marginRight: "auto",
});
