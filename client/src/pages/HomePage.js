import React from "react";
import Leaderboard from "../components/Leaderboard";
import HowToPlayText from "../components/HowToPlayText";
import HomePlayBtn from "../components/HomePlayBtn";
import "./HomePage.css";

function HomePage(props) {

    console.log("Here is the userId from the home page....", props.userId);

    return (
        <>
            <HomePlayBtn 
                username={props.username}
                wins={props.wins}
                losses={props.losses}
                rank={props.rank}
                findMatch={props.findMatch}
                userId={props.userId}
            />
            <HowToPlayText ></HowToPlayText>
            <Leaderboard ></Leaderboard>
        </>
    )
}

export default HomePage;