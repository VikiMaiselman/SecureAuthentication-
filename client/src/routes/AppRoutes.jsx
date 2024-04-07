import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Verification from "../pages/Verification";
import Logout from "../pages/Logout";
import { useAuth } from "../contexts/Authentication.context";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" index element={<Home />} />
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
          user.isBeingVerified ? (
            <Layout>
              <Verification />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/logout"
        element={
          <Layout>
            <Logout />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/sign-up" />} />
    </Routes>
  );
}
