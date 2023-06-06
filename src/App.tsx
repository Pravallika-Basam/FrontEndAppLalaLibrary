import "./App.css";
import { NavBar } from "./Layouts/Navbar";
import { Footer } from "./Layouts/Footer";
import { HomePage } from "./Layouts/HomePage/HomePage";
import React from "react";
import { SearchBooksPage } from "./Layouts/SearchBooksPage/SearchBooksPage";
import { Routes, Route, Navigate } from "react-router-dom";
export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/search" element={<SearchBooksPage />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
