import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Home from "./components/Home";
import UrbanLegends from "./components/UrbanLegends";
import UnsolvedMysteries from "./components/UnsolvedMysteries";
import WeirdVideos from "./components/WeirdVideos";
import Admin from "./components/Admin";
import Login from "./components/Login";

import "./styles/main.css";

const initialState = {
   legends: [
      {
         id: 1,
         title: "Robert the Doll",
         thumbnail: "image.jpg",
         story: "Robert the Doll now lives at the Fort East Martello Museum in Key West, Florida...",
      },
      {
         id: 2,
         title: "The Grinning Man",
         thumbnail: "image.jpg",
         story: "The Grinning Man, sometimes referred to as Indrid Cold...",
      },
   ],
   mysteries: [
      {
         id: 1,
         title: "The Kelly-Hopkinsville Encounter",
         thumbnail: "image.jpg",
         story: "On the evening of August 21, 1955, family friend Billy Ray Taylor of Pennsylvania...",
      },
      {
         id: 2,
         title: "The Flatwoods Monster",
         thumbnail: "image.jpg",
         story: "At 7:15 PM on September 12, 1952, three little boys witnessed a bright object...",
      },
   ],
   videos: [
      {
         id: 1,
         title: "Hand Thing",
         thumbnail: "image.jpg",
         urlId: "DGodkjpM-IU",
      },
      {
         id: 2,
         title: "Rubber Johnny",
         thumbnail: "image.jpg",
         urlId: "iOVO_s7ycL8",
      },
   ],
};

const { legends, mysteries, videos } = initialState;

const App = () => {
   return (
      <BrowserRouter>
         <Navigation />
         <Header />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
               path="/urban_legends"
               element={<UrbanLegends data={legends} />}
            />
            <Route
               path="/unsolved_mysteries"
               element={<UnsolvedMysteries data={mysteries} />}
            />
            <Route
               path="/weird_videos"
               element={<WeirdVideos data={videos} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </BrowserRouter>
   );
};

ReactDOM.render(<App />, document.getElementById("app"));
