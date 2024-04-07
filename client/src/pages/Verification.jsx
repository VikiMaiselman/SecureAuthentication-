import { CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DigitSlot, StyledButton, StyledCard, StyledHeader, VerificationBackground } from "./VerificationStyles";
import { useAuth } from "../contexts/Authentication.context";

export default function Verification() {
  const [otpDigits, setOtpDigits] = React.useState(Array.from({ length: 6 }, () => ""));
  const inputRefs = React.useRef([]);
  const { isApproved, verify } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // inputRefs.current[0].focus();

  const handleChange = (idx, value) => {
    const updatedDigits = [...otpDigits];
    updatedDigits[idx] = value;
    setOtpDigits(updatedDigits);

    // Move cursor to the next input (if not at the last slot)
    if (idx < 5 && value.length === 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleMoveCursorOnBackspacePress = (key, idx, value) => {
    if (key === "Backspace" && idx > 0 && value.length === 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleClickVerify = async (e) => {
    const data = location.state;
    const updatedData = { ...data, otp: otpDigits.join("") };
    const response = await verify(updatedData);

    if (response === "approved") {
      isApproved(response);
      return navigate("/");
    }
    // show error message
    return navigate("/sign-up");
  };

  return (
    <>
      <VerificationBackground />
      <StyledCard>
        <CardContent>
          <StyledHeader variant="h5" gutterBottom>
            Two-Factor Authentication
          </StyledHeader>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Enter Two-factor <br /> Authentication Password
          </Typography>

          {React.Children.toArray(
            otpDigits.map((_, idx) => {
              return (
                <DigitSlot
                  inputRef={(ref) => (inputRefs.current[idx] = ref)}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleMoveCursorOnBackspacePress(e.key, idx, e.target.value)}
                  inputProps={{ maxLength: 1 }}
                />
              );
            })
          )}
        </CardContent>
        <CardActions>
          <StyledButton variant="contained" onClick={handleClickVerify}>
            Verify
          </StyledButton>
        </CardActions>
      </StyledCard>
    </>
  );
}
