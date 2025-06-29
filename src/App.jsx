import { useState } from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Router from "./router/router";
import Navbar from "./components/navbar";

import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
    </>
  );
}

export default App;
