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
import Login from "./components/Login";

import "./styles/main.css";
import AdminLegends from "./components/AdminLegends";
import AdminMysteries from "./components/AdminMysteries";
import AdminVideos from "./components/AdminVideos";
import UpdateLegend from "./components/UpdateLegend";
import UpdateMystery from "./components/UpdateMystery";
import UpdateVideo from "./components/UpdateVideo";

const App = () => {
   return (
      <BrowserRouter>
         <Navigation />
         <Header />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/urban_legends" element={<UrbanLegends />} />
            <Route path="/unsolved_mysteries" element={<UnsolvedMysteries />} />
            <Route path="/weird_videos" element={<WeirdVideos />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin_legends" element={<AdminLegends />} />
            <Route path="/admin_mysteries" element={<AdminMysteries />} />
            <Route path="/admin_videos" element={<AdminVideos />} />
            <Route path="/update_legend/:id" element={<UpdateLegend />} />
            <Route path="/update_mystery/:id" element={<UpdateMystery />} />
            <Route path="/update_video/:id" element={<UpdateVideo />} />
         </Routes>
      </BrowserRouter>
   );
};

ReactDOM.render(<App />, document.getElementById("app"));
