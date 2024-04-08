import styled from "@emotion/styled";
import { Box, ListItem, ListItemText, Typography } from "@mui/material";

export const StyledSubheader = styled(Typography)({
  width: "fit-content",
  margin: 0,
  marginRight: "auto",
  marginBottom: "1em",
  padding: 0,
});

export const StyledTransaction = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "start",
  },
});

export const StyledListItemText = styled(ListItemText)({
  flex: 1,
  width: "25%",
  textAlign: "center",
  "@media (max-width: 576px)": {
    fontSize: "0.5em",
  },
});

export const StyledListItem = styled(ListItem)({
  background: "#ECF2FD",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
  "@media (max-width: 576px)": {
    flexDirection: "column",
    alignItems: "center",
    width: "500px",
    minWidth: "max-content",
  },
});

export const StyledSpan = styled("span")({
  color: "#F09479",
});
