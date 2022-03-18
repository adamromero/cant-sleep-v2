import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthState";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminContent from "./pages/AdminContent";
import Login from "./pages/Login";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

import "./styles/main.css";
import Presentation from "./pages/Presentation";

const App = () => {
   const [legends, setLegends] = useState([]);
   const [mysteries, setMysteries] = useState([]);
   const [videos, setVideos] = useState([]);
   const [images, setImages] = useState([]);

   useEffect(() => {
      Promise.all([
         fetch("/api/legends"),
         fetch("/api/mysteries"),
         fetch("/api/videos"),
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
      <AuthProvider>
         <BrowserRouter>
            <Navigation />
            <Header />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route
                  path="/urban_legends"
                  element={
                     <Presentation
                        data={legends}
                        title="Urban Legends"
                        isVideo={false}
                     />
                  }
               />
               <Route
                  path="/unsolved_mysteries"
                  element={
                     <Presentation
                        data={mysteries}
                        title="Unsolved Mysteries"
                        isVideo={false}
                     />
                  }
               />
               <Route
                  path="/weird_videos"
                  element={
                     <Presentation
                        data={videos}
                        title="Weird Videos"
                        isVideo={true}
                     />
                  }
               />
               <Route path="/admin" element={<Admin images={images} />} />
               <Route path="/login" element={<Login />} />

               <Route
                  path="/admin_legends"
                  element={
                     <AdminContent
                        data={legends}
                        title="Urban Legends"
                        endpoint="legends"
                     />
                  }
               />
               <Route
                  path="/admin_mysteries"
                  element={
                     <AdminContent
                        data={mysteries}
                        title="Unsolved Mysteries"
                        endpoint="mysteries"
                     />
                  }
               />
               <Route
                  path="/admin_videos"
                  element={
                     <AdminContent
                        data={videos}
                        title="Weird Videos"
                        endpoint="videos"
                     />
                  }
               />
            </Routes>
         </BrowserRouter>
      </AuthProvider>
   );
};

ReactDOM.render(<App />, document.getElementById("app"));
