import styled from "@emotion/styled";
import { Box, ListItemText, Typography } from "@mui/material";

export const StyledSubheader = styled(Typography)({
  width: "fit-content",
  margin: 0,
  marginRight: "auto",
  padding: 0,
});

export const StyledTransaction = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const StyledListItemText = styled(ListItemText)({
  flex: 1,
  width: "25%",
});
