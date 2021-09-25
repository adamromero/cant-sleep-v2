import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Home from "./components/Home";
import UrbanLegends from "./components/UrbanLegends";
import UnsolvedMysteries from "./components/UnsolvedMysteries";
import WeirdVideos from "./components/WeirdVideos";

import "./styles/main.css";

const App = () => {
   return (
      <Router>
         <Navigation />
         <Header />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/urban_legends" component={UrbanLegends} />
            <Route path="/unsolved_mysteries" component={UnsolvedMysteries} />
            <Route path="/weird_videos" component={WeirdVideos} />
         </Switch>
      </Router>
   );
};

ReactDOM.render(<App />, document.getElementById("app"));
