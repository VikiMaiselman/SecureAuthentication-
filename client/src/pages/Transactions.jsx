import React from "react";
import { Box, List, ListItemButton, ListItemIcon } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { useAuth } from "../contexts/Authentication.context";
import { getDateLabel, getTransactions } from "../util/helpers";
import {
  StyledListItem,
  StyledListItemText,
  StyledSpan,
  StyledSubheader,
  StyledTransaction,
} from "./TransactionsStyles";

export default function Transactions() {
  const { user, updateBalance, balance } = useAuth();
  const [txs, setTxs] = React.useState();

  React.useEffect(() => {
    const getTxsToDisplay = async () => {
      try {
        const txs = await getTransactions();
        console.log(txs);
        setTxs(() => txs);
        await updateBalance();
      } catch (error) {
        console.error(error);
      }
    };
    getTxsToDisplay();
  }, [balance]);

  return (
    <Box width={"100%"} my={4}>
      <StyledSubheader variant="h6">
        Recent Transactions From: <StyledSpan>Today</StyledSpan>
      </StyledSubheader>

      {React.Children.toArray(
        txs?.map((tx) => {
          const amountTodisplay = tx.to._id === user.id ? `+${tx.amount}` : `-${tx.amount}`;
          const colorOfMoney = tx.to._id === user.id ? "green" : "red";
          const dateLabel = getDateLabel(new Date(tx.when));
          const toOrFromWhom = tx.to._id === user.id ? `To ${user.username}` : `From ${tx.from.username}`;

          return (
            <List>
              <StyledListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <StyledTransaction>
                    <StyledListItemText primary={tx.name} />
                    <StyledListItemText sx={{ color: colorOfMoney }} primary={`${amountTodisplay} $`} />
                    <StyledListItemText primary={toOrFromWhom} />
                    <StyledListItemText primary={dateLabel} />
                  </StyledTransaction>
                </ListItemButton>
              </StyledListItem>
            </List>
          );
        })
      )}
    </Box>
  );
}
