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
            <div className="row">
                <div className="col s12 m6 l12">
                    <HowToPlayText ></HowToPlayText>
                </div>
                <div className="col s12 m6 l12">
                    <Leaderboard ></Leaderboard>
                </div>
            </div>
        </>
    )
}

export default HomePage;