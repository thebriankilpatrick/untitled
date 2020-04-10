import React from "react";

function HowToPlayText() {
    return (
        <div className="container">
            <p>
               How to Play Super Smash Kittens:
            </p>
            <p>
                Super Smash Kittens is a battle card game, with the objective
                of destroying your opponent!  By using the cards at your disposal, 
                your mission is to decimate your opponent by lowering his/her health points.
            </p>
            <p>
                Each deck contains no more or no less than 20 cards.
                Of those 20 cards, the total power cannot exceed 100.
                When battling an opponent, you draw four cards from 
                your deck at random, and those are the cards you will be 
                using during the duration of the battle.
            </p>
            <p>
                During each turn, you and your opponent choose a card to battle.
                The outcome of the turn is decided based on who's card has the most
                power.  The difference of the two power's is how the damage is calculated.
                For instance, if your card has 5 power, and your opponent's card has 3 power, you
                will deal 2 damage to the opponent.
            </p>
            <p>
                Each battle consists of 4 turns, 1 turn for each card.  This means, you can only use each
                card once during a battle.  The player with the most health after the 4 turns is the 
                winner.  
            </p>
        </div>
    )
}

export default HowToPlayText;