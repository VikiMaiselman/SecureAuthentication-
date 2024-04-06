import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <p>Transactions will be here soon...</p>

      <Link to="/logout">Log Out</Link>
    </>
  );
}
