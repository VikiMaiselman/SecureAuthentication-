import { Box, Button, FormLabel, Tab, Tabs, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

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
  width: "30rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
        <Typography variant="h3" sx={{ color: "blue" }}>
          Let's Get Started
        </Typography>

        {/* <Tabs value={value} onChange={handleChange} centered> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleChangeTab} centered>
            <Tab id="signup" label="Sign Up" sx={{ border: "none" }} />
            <Tab id="signin" label="Sign In" />
          </Tabs>
        </Box>

        <FormLabel forHtml="email">Email</FormLabel>
        <TextField id="email" sx={{ width: "75%", backgroundColor: "rgb(255, 255, 255)" }}></TextField>

        <FormLabel forHtml="pswd">Password</FormLabel>
        <TextField id="pswd" sx={{ width: "75%", backgroundColor: "rgb(255, 255, 255)" }}></TextField>

        {activeTab === 0 && (
          <>
            <FormLabel forHtml="phone">Phone Number</FormLabel>
            <TextField id="phone" sx={{ width: "75%", backgroundColor: "rgb(255, 255, 255)" }}></TextField>
          </>
        )}

        <Button variant="contained" sx={{ width: "75%", backgroundColor: "#1A3496" }}>
          {activeTab === 0 ? "Sign Up" : "Sign In"}
        </Button>
      </AuthForm>
    </AuthPageContainer>
  );
}
