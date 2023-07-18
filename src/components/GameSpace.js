/*
 * GameSpace.js
*/

import classes from "./style/GameSpace.module.css";
import React, { useState, useEffect, useMemo } from 'react';

const bgColors = {
    inWord: "#f5e554",
    correct: "#78e22c",
    incorrect: "#dadada"
}

function GuessBox(props) 
{
    return (
        <div className = {classes.guessBox} 
            id = {props.id} 
            style = {{backgroundColor: bgColors[props.state]}}>
            {props.letter}
        </div>
    )
}

const SpriteBox = React.memo(({ sprite }) => {
    const [isBouncing, setIsBouncing] = useState(true);
        
    useEffect(() => {
        const interval = setInterval(() => {
            setIsBouncing((prevIsBouncing) => !prevIsBouncing);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const componentClass = sprite.includes('unown') ? 'unown' : 'pokeSprite';

    return (
        <>
            <img className = {`${classes[componentClass]} ${
                isBouncing ? classes.bounceAnimation : ''
            }`}
                 src = {sprite}
                 alt = ''
            />
        </>
    )
});

const MemoizedSpriteBox = React.memo(SpriteBox); 

function GameRow(props)
{
	return (
		<div className = {classes.gameRow}
             style = {{gridTemplateColumns: '40px '.repeat(props.length)}}>
            { props.sprite !== 'NaN' && 
                <MemoizedSpriteBox sprite = {props.sprite} /> } 
            {props.boxes.map((box) => 
                (<GuessBox key = {box.id}
                    state = {box.state}
                    letter = {box.letter}
                />))}
            { props.sprite !== 'NaN' && 
                <MemoizedSpriteBox sprite = {props.sprite} /> }
        </div>
	);
}

function GameSpace(props)
{
    return (
        <div className = {classes.gameSpace} 
             style = {{gridTemplateRows: "1fr".repeat(6)}}>
            { props.gameSpace.map((row) => (
                <GameRow key = {row.id}
                    state = {row.state}
                    length = {row.length}
                    boxes = {row.boxes}
                    guess = {row.guess} 
                    sprite = {row.sprite}
                />
            ))}
        </div>
    );
}

export default GameSpace;
