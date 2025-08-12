import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Uploads from "./pages/Uploads";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/reports"
        element={
          <Layout>
            <Report />
          </Layout>
        }
      />
      <Route
        path="/analytics"
        element={
          <Layout>
            <Analytics />
          </Layout>
        }
      />
      <Route
        path="/uploads"
        element={
          <Layout>
            <Uploads />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
