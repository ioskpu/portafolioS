import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import { EasterEggButton } from './components/ui/EasterEggButton';
import { SecretToast } from './components/ui/SecretToast';
import { useKonamiCode } from './hooks/useKonamiCode';

const App = () => {
  const { activated } = useKonamiCode();

  return (
    <>
      <SecretToast show={activated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
      <EasterEggButton />
    </>
  );
};

export default App;
