import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AIAnalysis from "./pages/AIAnalysis";
import Market from "./pages/Market";
// import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-analysis" element={<AIAnalysis />} />

        <Route path="/market" element={<Market />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </>
  );
}