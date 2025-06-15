import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import CastDetails from "./pages/CastDetails";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id/season/:seasonNumber" element={<TvDetails />} />
          <Route path="/person/:id" element={<CastDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
