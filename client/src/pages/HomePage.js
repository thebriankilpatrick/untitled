import React from "react";
import Leaderboard from "../components/Leaderboard";
import HowToPlayText from "../components/HowToPlayText";

function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <HowToPlayText ></HowToPlayText>
            <Leaderboard ></Leaderboard>
        </>
    )
}

export default HomePage;