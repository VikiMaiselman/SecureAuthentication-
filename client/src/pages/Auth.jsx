import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Tabs } from "@mui/material";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import { composeDataForBackend, signup } from "../util/helpers.js";
import {
  AuthBackground,
  AuthForm,
  AuthPageContainer,
  Overlay,
  PageHeaderText,
  StyledButton,
  StyledFormLabel,
  StyledTab,
  StyledTextField,
} from "./AuthStyles.js";

export default function Auth() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChangeTab = (e, newValue) => {
    setActiveTab(() => newValue);
  };

  const handleChangeUserData = (e) => {
    let name, value;

    if (typeof e === "object") {
      name = e.target.name;
      value = e.target.value;
    }

    if (typeof e === "string") {
      name = "phone";
      value = e;
    }

    const updaterFunc = (prevSt) => {
      return { ...prevSt, [name]: value };
    };
    setUserData(updaterFunc);
  };

  const handleClick = async () => {
    const data = composeDataForBackend(userData, activeTab);
    const response = await signup(data);
    console.log(response, data);
    if (response === "pending") return navigate("/verification", { state: data, replace: true });
    // show error message
    return navigate("/sign-up");
  };

  return (
    <AuthPageContainer>
      <Overlay />
      <AuthBackground src="images/bg-family-saving-money.png" />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }}>
        <PageHeaderText variant="h3">Experience the</PageHeaderText>
        <PageHeaderText variant="h3">Future of Banking</PageHeaderText>
      </div>

      <AuthForm>
        <Typography variant="h3" sx={{ color: "#1A3496", alignSelf: "center" }}>
          Let's Get Started
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", alignSelf: "center" }}>
          <Tabs value={activeTab} onChange={handleChangeTab}>
            <StyledTab id="signup" label="Sign Up" />
            <StyledTab id="signin" label="Sign In" />
          </Tabs>
        </Box>

        <StyledFormLabel htmlFor="email">Email</StyledFormLabel>
        <StyledTextField id="email" onChange={handleChangeUserData} name="email" value={userData.email} />

        <StyledFormLabel htmlFor="password">Password</StyledFormLabel>
        <StyledTextField
          id="password"
          type="password"
          sx={{ marginBottom: `${activeTab === 0 ? "1em" : "2em"}` }}
          onChange={handleChangeUserData}
          name="password"
          value={userData.password}
        />

        {!activeTab && (
          <>
            <StyledFormLabel htmlFor="phone">Phone Number</StyledFormLabel>
            <PhoneInput
              id="phone"
              country={"il"}
              inputStyle={{ width: "100%" }}
              style={{ marginBottom: "2em" }}
              onChange={handleChangeUserData}
              name="phone"
              value={userData.phone}
            />
          </>
        )}

        <StyledButton variant="contained" onClick={handleClick}>
          {activeTab === 0 ? "Sign Up" : "Sign In"}
        </StyledButton>
      </AuthForm>
    </AuthPageContainer>
  );
}
