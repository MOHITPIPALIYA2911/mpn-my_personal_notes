import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Protected from "./view/Protected";

import Login from "./components/Auth/Login";
import Home from "./view/Dashboard/Home";
import AddNotes from "./view/managenotes/AddNotes";
import ViewNotes from "./view/managenotes/ViewNotes";
import Settings from "./view/settings/Settings";
import ViewAccount from "./view/manageaccount/ViewAccount";
import Registration from "./components/Auth/Registration";
import ViewNoteBin from "./view/managenotes/ViewNoteBin";
import HowToUse from "./view/help/HowToUse";
import AboutUs from "./view/help/AboutUs";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          {/*------------------------ Authentication Routes / Without Token ------------------------*/}
          <Route exact path="/" index element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Registration />} />

          {/*------------------------ Settings Routes ------------------------*/}
          <Route
            exact
            path="settings"
            element={
              <Layout>
                <Protected Cmp={Settings} />
              </Layout>
            }
          />

          {/*------------------------ Dashboard Routes ------------------------*/}
          <Route
            exact
            path="home"
            element={
              <Layout>
                <Protected Cmp={Home} />
              </Layout>
            }
          />

          {/*------------------------ Manage account Routes ------------------------*/}
          <Route
            exact
            path="/viewaccount"
            element={
              <Layout>
                <Protected Cmp={ViewAccount} />
              </Layout>
            }
          />

          {/*------------------------ Help Routes ------------------------*/}
          <Route
            exact
            path="/howtouse"
            element={
              <Layout>
                <Protected Cmp={HowToUse} />
              </Layout>
            }
          />
          <Route
            exact
            path="/aboutus"
            element={
              <Layout>
                <Protected Cmp={AboutUs} />
              </Layout>
            }
          />

          {/*------------------------ Manage notes Routes ------------------------*/}
          <Route
            exact
            path="/addnotes"
            element={
              <Layout>
                <Protected Cmp={AddNotes} />
              </Layout>
            }
          />
          <Route
            exact
            path="/addnotes/:id"
            element={
              <Layout>
                <Protected Cmp={AddNotes} />
              </Layout>
            }
          />
          <Route
            exact
            path="/viewnotes"
            element={
              <Layout>
                <Protected Cmp={ViewNotes} />
              </Layout>
            }
          />
          <Route
            exact
            path="/viewnotesbin"
            element={
              <Layout>
                <Protected Cmp={ViewNoteBin} />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <IndexView /> */}
    </>
  );
}

export default App;
