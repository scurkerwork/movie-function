import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-data-table-component-extensions/dist/index.css";
import "toastify-js/src/toastify.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movie from "./pages/movies";
import MovieDetail from "./pages/movies/detail";
import MovieCreate from "./pages/movies/create";
import ActorDetail from "./pages/actors/detail";
import ActorCreate from "./pages/actors/create";
import Actors from "./pages/actors";
import NavigationMenu from "./components/NavigationMenu";
import './App.css';

const App = () => {
  return (
    <div className="container-fluid">
      <NavigationMenu />
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Movie />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/movies/create" element={<MovieCreate />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/actors/:id" element={<ActorDetail />} />
            <Route path="/actors/create" element={<ActorCreate />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
