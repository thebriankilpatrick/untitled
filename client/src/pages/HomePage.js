import React from "react";
import Leaderboard from "../components/Leaderboard";
import HowToPlayText from "../components/HowToPlayText";
import HomePlayBtn from "../components/HomePlayBtn";
import "./HomePage.css";

function HomePage(props) {

    return (
        <>
            <HomePlayBtn 
                username={props.username}
                wins={props.wins}
                losses={props.losses}
                rank={props.rank}
                findMatch={props.findMatch}
            />
            <HowToPlayText ></HowToPlayText>
            <Leaderboard ></Leaderboard>
        </>
    )
}

export default HomePage;