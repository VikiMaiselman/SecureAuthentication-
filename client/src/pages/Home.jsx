import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

import { useAuth } from "../contexts/Authentication.context";
import { getTransactions } from "../util/helpers";

export default function Home() {
  const { user } = useAuth();
  const [txs, setTxs] = React.useState();

  React.useEffect(() => {
    const getTxsToDisplay = async () => {
      try {
        const txs = await getTransactions();
        setTxs(() => txs);
      } catch (error) {
        console.error(error);
      }
    };
    getTxsToDisplay();
  }, []);

  return (
    <Box width={"100%"} my={4}>
      <Typography variant="h6" sx={{ width: "fit-content", margin: 0, marginRight: "auto", padding: 0 }}>
        Recent Transactions From: <span>Today</span>
      </Typography>

      {React.Children.toArray(
        txs?.map((tx) => {
          console.log(tx, user);
          const amountTodisplay = tx.to === user.id ? `+${tx.amount}` : `-${tx.amount}`;
          return (
            <List>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                  <ListItemText primary={tx.name} />
                  <ListItemText primary={`${amountTodisplay} $`} />
                </ListItemButton>
              </ListItem>
            </List>
          );
        })
      )}
    </Box>
  );
}
