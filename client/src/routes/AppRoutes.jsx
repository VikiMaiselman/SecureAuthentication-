import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Verification from "../pages/Verification";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        index
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      {/* <Route path="/logout" element={<Logout />} /> */}
      <Route
        path="/sign-up"
        element={
          <Layout>
            <Auth />
          </Layout>
        }
      />
      <Route
        path="/verification"
        element={
          <Layout>
            <Verification />
          </Layout>
        }
      />
      {/* <Route path="*" element={<Authenticate />} /> */}
    </Routes>
  );
}
