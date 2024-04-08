import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";

export const StyledContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginTop: "5em",
});

export const StyledTextField = styled(TextField)({
  marginBottom: "2em",
});

export const StyledButton = styled(Button)({
  transition: "all 0.4s ease-in-out",
  "&:hover": { transform: "scale(1.1)" },
});
