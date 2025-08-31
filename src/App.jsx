import { useState } from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Router from "./router/router";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Router />
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
