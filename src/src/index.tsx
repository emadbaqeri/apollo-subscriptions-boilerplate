import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeScreen, MessageScreen } from "./Screens";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="/message" element={<MessageScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
