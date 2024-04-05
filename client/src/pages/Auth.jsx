import React from "react";
import { Box, Button, FormLabel, Tab, Tabs, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import "react-phone-input-2/lib/bootstrap.css";

const AuthPageContainer = styled("div")({
  height: "80vh",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const AuthBackground = styled("img")({
  width: "auto",
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -9,
  boxSizing: "border-box",
  boxShadow: "-600px -160px white inset",
  filter: "blur(1px)",
});

const Overlay = styled("div")({
  width: "50%",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: -7,
  background: "linear-gradient(to right, rgba(255,255,255,1) 75%, rgba(255,255,255,0.6) , rgba(255, 255, 255, 0))",
});

const AuthForm = styled("div")({
  width: "25rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",

  paddingTop: "5em",
  paddingLeft: "2.5em",
  paddingRight: "1.5em",
  position: "relative",
  zIndex: 6,
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.75)",
});

export default function Auth() {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChangeTab = (e, newValue) => {
    // const { value } = e.target.id;
    setActiveTab(() => newValue);
  };
  return (
    <AuthPageContainer>
      <Overlay />
      <AuthBackground src="images/bg-family-saving-money.png" />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }}>
        <Typography
          variant="h3"
          sx={{
            backgroundImage: "linear-gradient(45deg, #4A435D, #1A3496, #427EEE)",
            backgroundClip: "text",
            textFillColor: "transparent",
            fontWeight: "700",
            letterSpacing: 1.2,
          }}
        >
          Experience the
        </Typography>
        <Typography
          variant="h3"
          sx={{
            backgroundImage: "linear-gradient(45deg, #4A435D, #1A3496, #427EEE)",
            backgroundClip: "text",
            textFillColor: "transparent",
            fontWeight: "700",
            letterSpacing: 1.2,
          }}
        >
          Future of Banking
        </Typography>
      </div>

      <AuthForm>
        <Typography variant="h3" sx={{ color: "blue", alignSelf: "center" }}>
          Let's Get Started
        </Typography>

        {/* <Tabs value={value} onChange={handleChange} centered> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", alignSelf: "center" }}>
          <Tabs variant="text" value={activeTab} onChange={handleChangeTab}>
            <Tab id="signup" label="Sign Up" sx={{ "&:focus": { outline: "none" } }} />
            <Tab id="signin" label="Sign In" />
          </Tabs>
        </Box>

        <FormLabel forHtml="email" sx={{ alignSelf: "start" }}>
          Email
        </FormLabel>
        <TextField
          id="email"
          sx={{ width: "100%", backgroundColor: "rgb(255, 255, 255)", marginBottom: "1em" }}
        ></TextField>

        <FormLabel forHtml="pswd" sx={{ alignSelf: "start" }}>
          Password
        </FormLabel>
        <TextField
          id="pswd"
          sx={{ width: "100%", backgroundColor: "rgb(255, 255, 255)", marginBottom: "1em" }}
        ></TextField>

        {!activeTab && (
          <>
            <FormLabel forHtml="phone" sx={{ alignSelf: "start" }}>
              Phone Number
            </FormLabel>
            <PhoneInput id="phone" country={"il"} inputStyle={{ width: "100%", marginBottom: "1em" }} />

            {/* value={this.state.phone} onChange={(phone) => this.setState({ phone })} */}
          </>
        )}

        <Button variant="contained" sx={{ width: "75%", backgroundColor: "#1A3496" }}>
          {activeTab === 0 ? "Sign Up" : "Sign In"}
        </Button>
      </AuthForm>
    </AuthPageContainer>
  );
}
