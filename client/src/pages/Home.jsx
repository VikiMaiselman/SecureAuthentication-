import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { useAuth } from "../contexts/Authentication.context";
import { getTransactions } from "../util/helpers";
import { StyledListItemText, StyledSubheader, StyledTransaction } from "./HomeStyles";

export default function Home() {
  const { user, updateBalance } = useAuth();
  const [txs, setTxs] = React.useState();

  React.useEffect(() => {
    const getTxsToDisplay = async () => {
      try {
        const txs = await getTransactions();
        setTxs(() => txs);
        await updateBalance();
      } catch (error) {
        console.error(error);
      }
    };
    getTxsToDisplay();
  }, []);

  return (
    <Box width={"100%"} my={4}>
      <StyledSubheader variant="h6">
        Recent Transactions From: <span style={{ color: "#F09479" }}>Today</span>
      </StyledSubheader>

      {React.Children.toArray(
        txs?.map((tx) => {
          const amountTodisplay = tx.to === user.id ? `+${tx.amount}` : `-${tx.amount}`;
          const colorOfMoney = tx.to === user.id ? "green" : "red";
          return (
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <StyledTransaction>
                    <StyledListItemText primary={tx.name} />
                    <StyledListItemText sx={{ color: colorOfMoney }} primary={`${amountTodisplay} $`} />
                    <StyledListItemText primary={tx.to === user.id ? user.username : tx.to} />
                  </StyledTransaction>
                </ListItemButton>
              </ListItem>
            </List>
          );
        })
      )}
    </Box>
  );
}
