import React from "react";
import Leaderboard from "../components/Leaderboard";
import HowToPlayText from "../components/HowToPlayText";
import HomePlayBtn from "../components/HomePlayBtn";
import "./HomePage.css";

function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <HomePlayBtn ></HomePlayBtn>
            <HowToPlayText ></HowToPlayText>
            <Leaderboard ></Leaderboard>
        </>
    )
}

export default HomePage;