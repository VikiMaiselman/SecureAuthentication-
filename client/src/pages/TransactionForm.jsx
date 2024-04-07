import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../contexts/Authentication.context";
import { createTransaction } from "../util/helpers.js";

export default function TransactionForm() {
  const { user } = useAuth();
  const [tx, setTx] = React.useState({
    name: "",
    amount: "",
    to: "",
  });
  const [errAmount, setErrAmount] = React.useState("");
  const [errReceiver, setErrReceiver] = React.useState("");

  const validate = (inputName, inputValue) => {
    if (inputName === "amount") {
      inputValue = +inputValue;
      if (user.balance < inputValue) setErrAmount(() => "You do not have enough money to proceed with the transaction");
      else setErrAmount(() => "");
    }

    if (inputName === "to") {
      if (user.username === inputValue)
        setErrReceiver(() => "The emails of the sender and the reciever must be different");
      else setErrReceiver(() => "");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    validate(name, value);

    setTx((prevSt) => {
      return { ...prevSt, [name]: value };
    });
  };

  const handleTransfer = () => {
    createTransaction(tx);
  };

  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} my={7}>
      <Typography variant="h6" sx={{ marginBottom: "1em" }}>
        Create New Transaction:
      </Typography>
      <TextField
        id="name"
        name="name"
        placeholder="Enter transaction name/purpose..."
        value={tx.name}
        onChange={handleChange}
        sx={{ marginBottom: "2em" }}
      />
      <TextField
        id="amount"
        name="amount"
        placeholder="Enter amount..."
        type="number"
        value={tx.amount}
        onChange={handleChange}
        error={errAmount !== ""}
        helperText={errAmount}
        sx={{ marginBottom: "2em" }}
      />
      <TextField
        id="to"
        name="to"
        value={tx.to}
        onChange={handleChange}
        error={errReceiver !== ""}
        helperText={errReceiver}
        sx={{ marginBottom: "2em" }}
        placeholder="Enter the email of the recepient"
      />
      <Button onClick={handleTransfer}>Transfer Money</Button>
    </Box>
  );
}
