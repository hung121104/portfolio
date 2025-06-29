import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import TransitionComponent from "../components/transition";

import Home from "../pages/home";
import About from "../pages/about";


const Router = () => {
  return (
      <Routes>        
          <Route
            index
            element={
              <TransitionComponent>
                <Home />
              </TransitionComponent>
            }
          />
          <Route
            path="/about"
            element={
              <TransitionComponent>
                <About />
              </TransitionComponent>
            }
          />       
      </Routes>
  );
};

export default Router;
