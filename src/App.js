import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import Search from "./pages/Search";
import SearchGenres from "./pages/SearchGenres";
import SearchGenre from "./pages/SearchGenre";
import SearchTheme from "./pages/SearchTheme";
import SearchPlatform from "./pages/SearchPlatform";
import SearchCompany from "./pages/SearchCompany";
import SearchPerspective from "./pages/SearchPerspective";
import Error from "./pages/Error";

function App() {
  const [url, setUrl] = useState(null);


  return (
    <Router>
      <div className="App overflow-x-hidden">
        <div className="flex  h-screen  relative text-white">
          <img
            src={ url}
            alt="images"
            className="blur-md fixed scale-105 z-[-1] overflow-hidden h-screen w-screen object-cover "
            href='preload' 
          />
          <Sidebar />
          <div className="flex flex-col flex-1 sm:pl-5">
            <Routes>
              <Route exact path="/" element={<Home setUrl={setUrl} />} />
              <Route
                exact
                path="/game/:id"
                element={<GameDetails setUrl={setUrl} />}
              />
              <Route
                exact
                path="/search/"
                element={<Search setUrl={setUrl} />}
              />
              <Route
                exact
                path="/search/:search"
                element={<Search setUrl={setUrl} />}
              />
              <Route
                exact
                path="/genres"
                element={<SearchGenres setUrl={setUrl} />}
              />
              <Route
                exact
                path="/genres/:genre"
                element={<SearchGenre setUrl={setUrl} />}
              />
              <Route
                exact
                path="/themes/:theme"
                element={<SearchTheme setUrl={setUrl} />}
              />
              <Route
                exact
                path="/platforms/:platform"
                element={<SearchPlatform setUrl={setUrl} />}
              />
              <Route
                exact
                path="/companies/:company"
                element={<SearchCompany setUrl={setUrl} />}
              />
              <Route
                exact
                path="/perspectives/:perspective"
                element={<SearchPerspective setUrl={setUrl} />}
              />
              <Route
              path='*'
                element={<Error />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
