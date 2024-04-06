import styled from "@emotion/styled";
import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { verify } from "../util/helpers";

const VerificationBackground = styled("div")({
  width: "100%",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -9,
  background: "linear-gradient(to right bottom, rgba(255,255,255,1), #D0E3FF)",
  filter: "blur(1px)",
});

export default function Verification() {
  const [otpDigits, setOtpDigits] = React.useState(Array.from({ length: 6 }, () => ""));
  const inputRefs = React.useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const handleChange = (idx, value) => {
    const updatedDigits = [...otpDigits];
    updatedDigits[idx] = value;
    setOtpDigits(updatedDigits);

    // Move cursor to the next input (if not at the last slot)
    if (idx < 5 && value.length === 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleBackspace = (key, idx, value) => {
    // Move cursor to the previous input (if not at the first slot)
    if (key === "Backspace" && idx > 0 && value.length === 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleClickVerify = async (e) => {
    const data = location.state;
    const updatedData = { ...data, otp: otpDigits.join("") };
    const response = await verify(updatedData);
    console.log(response);
    if (response === "approved") return navigate("/");
    // show error message
    return navigate("/sign-up");
  };

  return (
    <>
      <VerificationBackground />
      <Card sx={{ minWidth: 275, padding: "5em 2.5em", borderRadius: "10px", marginLeft: "auto", marginRight: "auto" }}>
        <CardContent>
          {/* sx={{ fontSize: 14 }} */}
          <Typography variant="h5" sx={{ color: "#4A435D", fontWeight: 600 }} gutterBottom>
            Two-Factor Authentication
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Enter Two-factor <br /> Authentication Password
          </Typography>

          {React.Children.toArray(
            otpDigits.map((digit, idx) => {
              return (
                <TextField
                  sx={{ width: "2.5em" }}
                  inputRef={(ref) => (inputRefs.current[idx] = ref)}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleBackspace(e.key, idx, e.target.value)}
                  inputProps={{ maxLength: 1 }}
                ></TextField>
              );
            })
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ width: "75%", backgroundColor: "#1A3496", marginLeft: "auto", marginRight: "auto" }}
            onClick={handleClickVerify}
          >
            Verify
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
