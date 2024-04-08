import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../layouts/Layout";
import LayoutMain from "../layouts/LayoutMain";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Verification from "../pages/Verification";
import Logout from "../pages/Logout";
import TransactionForm from "../pages/TransactionForm";

import { useAuth } from "../contexts/Authentication.context";
import React from "react";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" index element={<LayoutMain>{/* <Home /> */}</LayoutMain>} />
      <Route
        path="/dashboard"
        index
        element={
          user.isAuthenticated ? (
            <LayoutMain>
              <Home />
            </LayoutMain>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/create-transaction"
        index
        element={
          user.isAuthenticated ? (
            <LayoutMain>
              <TransactionForm />
            </LayoutMain>
          ) : (
            <Navigate to="/" />
          )
        }
      />
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
