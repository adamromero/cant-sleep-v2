import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Home from "./components/Home";
import UrbanLegends from "./components/UrbanLegends";
import UnsolvedMysteries from "./components/UnsolvedMysteries";
import WeirdVideos from "./components/WeirdVideos";
import Admin from "./components/Admin";
import AdminContent from "./components/AdminContent";
import Login from "./components/Login";

import "./styles/main.css";

const App = () => {
   const [legends, setLegends] = useState([]);
   const [mysteries, setMysteries] = useState([]);
   const [videos, setVideos] = useState([]);
   const [images, setImages] = useState([]);

   useEffect(() => {
      Promise.all([
         fetch("http://localhost:5000/legends"),
         fetch("http://localhost:5000/mysteries"),
         fetch("http://localhost:5000/videos"),
      ])
         .then(function (responses) {
            return Promise.all(
               responses.map(function (response) {
                  return response.json();
               })
            );
         })
         .then(function (data) {
            setLegends(data[0].data);
            setMysteries(data[1].data);
            setVideos(data[2].data);
            setImages({
               legends: data[0].data[0].thumbnail,
               mysteries: data[1].data[0].thumbnail,
               videos: data[2].data[0].thumbnail,
            });
         })
         .catch(function (error) {
            console.log(error);
         });
   }, []);

   return (
      <BrowserRouter>
         <Navigation loggedIn={localStorage.getItem("token")} />
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
            <Route path="/admin" element={<Admin images={images} />} />
            <Route path="/login" element={<Login />} />

            <Route
               path="/admin_legends"
               element={<AdminContent data={legends} endpoint="legends" />}
            />
            <Route
               path="/admin_mysteries"
               element={<AdminContent data={mysteries} endpoint="mysteries" />}
            />
            <Route
               path="/admin_videos"
               element={<AdminContent data={videos} endpoint="videos" />}
            />
         </Routes>
      </BrowserRouter>
   );
};

ReactDOM.render(<App />, document.getElementById("app"));
