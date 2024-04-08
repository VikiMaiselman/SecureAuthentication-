import React from "react";
import { Button, Typography } from "@mui/material";

import { useAuth } from "../contexts/Authentication.context";
import { createTransaction } from "../util/helpers.js";
import { useNavigate } from "react-router-dom";
import { StyledContainer, StyledTextField } from "./TransactionFormStyled";

export default function TransactionForm() {
  const { user } = useAuth();
  const [tx, setTx] = React.useState({
    name: "",
    amount: "",
    to: "",
  });
  const [errAmount, setErrAmount] = React.useState("");
  const [errReceiver, setErrReceiver] = React.useState("");
  const navigate = useNavigate();

  const validate = (inputName, inputValue) => {
    if (inputName === "amount") {
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
    if (name === "amount") value = +value;
    setTx((prevSt) => {
      return { ...prevSt, [name]: value };
    });
  };

  const handleTransfer = async () => {
    createTransaction(tx);
    setTx(() => ({
      name: "",
      amount: "",
      to: "",
    }));
    navigate("/dashboard");
  };

  return (
    <StyledContainer>
      <Typography variant="h6" sx={{ marginBottom: "1em" }}>
        Create New Transaction:
      </Typography>
      <StyledTextField
        id="name"
        name="name"
        placeholder="Enter transaction name/purpose..."
        value={tx.name}
        onChange={handleChange}
      />
      <StyledTextField
        id="amount"
        name="amount"
        placeholder="Enter amount..."
        type="number"
        value={tx.amount}
        onChange={handleChange}
        error={errAmount !== ""}
        helperText={errAmount}
      />
      <StyledTextField
        id="to"
        name="to"
        value={tx.to}
        onChange={handleChange}
        error={errReceiver !== ""}
        helperText={errReceiver}
        placeholder="Enter the email of the recepient"
      />
      <Button onClick={handleTransfer}>Transfer Money</Button>
    </StyledContainer>
  );
}
