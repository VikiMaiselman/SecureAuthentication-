import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const AuthPageContainer = styled("div")({
  height: "80vh",
  width: "100%",
  //   background:
  //     "linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.4) 50%,rgba(255, 255, 255, 0.8) 50%)",
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
  //   paddingLeft: "500px",
  boxSizing: "border-box",
  boxShadow: "-600px -160px white inset",
  //   filter: "drop-shadow(-7mm -6mm 4mm rgb(255, 255, 255))",
  //   background:
  //     "linear-gradient(to right, rgba(255,255,255,0.8) 10px, rgba(255,255,255,0.4) 240px,rgba(255, 255, 255, 1) 290px)",
  //   backgroundRepeat: "no-repeat",
  //   opacity: 0.3,
  //   filter: "blur(1px)",
});

const AuthForm = styled("div")({
  width: "35rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  //   alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "white",
  opacity: "0.8",
});

export default function Auth() {
  return (
    <AuthPageContainer>
      <AuthBackground src="images/bg-family-saving-money.png" />

      <Typography variant="h4">Experience the future of banking</Typography>

      <AuthForm>
        <Typography variant="h3" sx={{ color: "blue" }}>
          Let's Get Started
        </Typography>
        <FormLabel forHtml="email">Email</FormLabel>
        <TextField id="email"></TextField>

        <FormLabel forHtml="pswd">Password</FormLabel>
        <TextField id="pswd"></TextField>

        <Button variant="contained" sx={{ opacity: 1 }}>
          Sign Up
        </Button>
      </AuthForm>
    </AuthPageContainer>
  );
}

/*  <img
          src="paisaje-invernal.jpg"
          width={"100%"}
          height={"400"}
          style={{ objectFit: "cover" }}
          alt='Photo by <a href="https://unsplash.com/@todd_diemer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Todd Diemer</a> on <a href="https://unsplash.com/photos/snow-covered-house-67t2GJcD5PI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
        />
*/
