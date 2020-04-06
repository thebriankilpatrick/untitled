import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import HomePage from "./HomePage";
import CollectionPage from "./Collection";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import "./MainPage.css";


function MainPage() {
    return (
        <Router >
            <>
                <Navbar ></Navbar>
                <SideNav ></SideNav>
                <Wrapper >
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/collection" component={CollectionPage}/>
                </Wrapper>
            </>
        </Router>
    )
}

export default MainPage;