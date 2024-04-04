import { styled } from "@mui/system";

// import bgImage from "public/assets/images/bg-family-saving-money.png";

const AuthPageContainer = styled("div")({
  height: "200px",
  background: "url('assets/images/bg-family-saving-money.png')",
  //   backgroundColor: "red",
  color: "red",
  fontSize: "2rem",
});

export default function Auth() {
  return <AuthPageContainer>text</AuthPageContainer>;
}

/*  <img
          src="paisaje-invernal.jpg"
          width={"100%"}
          height={"400"}
          style={{ objectFit: "cover" }}
          alt='Photo by <a href="https://unsplash.com/@todd_diemer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Todd Diemer</a> on <a href="https://unsplash.com/photos/snow-covered-house-67t2GJcD5PI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>'
        />
*/
