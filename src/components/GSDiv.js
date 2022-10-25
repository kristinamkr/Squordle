/*
 * GSDiv.js
*/ 

import classes from "./style/GSDiv.module.css";
import GameSpace from "./GameSpace.js";
import Keyboard from "./Keyboard.js";
import Backdrop from "./Backdrop.js";
import WinDisplay from "./WinDisplay.js";
import LoseDisplay from "./LoseDisplay.js";
import InfoDisplay from "./InfoDisplay.js";
import ShopDisplay from "./ShopDisplay.js";
import ShuckleDisplay from "./ShuckleDisplay.js";
import ShinyDisplay from "./ShinyDisplay.js";
import PoffinStorage from "./PoffinStorage.js";

import { useState, useEffect } from 'react';

function GSDiv(props) 
{
	useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
  		return () => document.removeEventListener("keydown", keyDownHandler);
    });

	const [gamespace, setGamespace] = useState(props.rows);
	const [letterStates, setLetterStates] = useState(props.letterStates);
	const [displayState, setDisplayState] = 
        useState({"showShop": false,
                  "showInfo": false,
                  "showWinpage": false,
                  "showLosepage": false,
                  "showBackdrop": false,
                  "showShucklePage": false,
                  "showShinyPage": false})

    // would a switch case be more efficient?
    // also what does this do? just initialize?
    if (window.localStorage.length !== 13) 
    {
	    if(!(window.localStorage.pokedollars)) {
            window.localStorage.pokedollars = 0;
	  	}
	    if(!(window.localStorage.adoptedShuckle)) {
	      	window.localStorage.adoptedShuckle = false;
	    }
	    if(!(window.localStorage.shopState)) {
	    	window.localStorage.shopState = 0;
	    }  
	    if(!(window.localStorage.spicyPoffin)) {
	    	window.localStorage.spicyPoffin = 0;
	    }
	    if(!(window.localStorage.sweetPoffin)) {
	      	window.localStorage.sweetPoffin = 0;
	    }  
	    if(!(window.localStorage.bitterPoffin)) {
	      	window.localStorage.bitterPoffin = 0;
	    }  
	    if(!(window.localStorage.goldPoffin)) {
	      	window.localStorage.goldPoffin = 0;
	    }  
	    if(!(window.localStorage.lemonade)) {
	      	window.localStorage.lemonade = 0;
	    }  
	    if(!(window.localStorage.shuckleShiny)) {
	      	window.localStorage.shuckleShiny = 0;
	    }  
	    if(!(window.localStorage.shuckleSpicy)) {
	      	window.localStorage.shuckleSpicy = 0;
	    }  
	    if(!(window.localStorage.shuckleSweet)) {
	      	window.localStorage.shuckleSweet = 0;
	    }  
	    if(!(window.localStorage.shuckleBitter)) {
	      	window.localStorage.shuckleBitter = 0;
	    }  
	    if(!(window.localStorage.shuckleChildren)) {
	      	window.localStorage.shuckleChildren = [];
	    }

	    setDisplayState({...displayState,
                         "showInfo": true,
                         "showBackdrop": true});
	}

    const [pokedollars, setPokedollars] = 
        useState(Number(window.localStorage.pokedollars));

    //Seems redundant but as soon as state changes come into play its as though
    // (generally) neither of the previous two sections exist, only the state.
    window.localStorage.pokedollars = pokedollars; 

	var wordlength = props.wordlength;
  	var validKeys = props.validKeys;
  	var validKeysSet = new Set(validKeys);
  	var pokemonlist = props.pokemonlist;
  	var pokemonset = new Set(pokemonlist);

  	function findFocus(gamespace) 
    {
	    for (var i = 0; i < gamespace.length; i++) {
            if (gamespace[i].state === "empty") {
                for (var k = 0; k < gamespace[i].boxes.length; k++)
                    if (gamespace[i].boxes[k].state === "empty")
                        return [i, k];
                return [i, -1];
            }
	    }
	    return 0;
	}

	function checkAnswer(row, letterStates, setLetterStates)
    {
        var word = row.pokemon;
	    var wordset = word.split('');
	    var is_winner = true;

	    var ls_change = letterStates;

	    for (var i = 0; i < word.length; i++) {
            var letter = row.boxes[i].letter;
            if (letter === word[i]) {
                row.boxes[i].state = "correct";
                ls_change["correctGuess"].add(letter);
                setLetterStates(ls_change);
                for(var k = 0; k < wordset.length; k++) {
                    if (letter === wordset[k]) {
                        wordset.splice(k, 1);
                        break;
                    }
                }
            }
            else
                is_winner = false;
	    }

	    for (var i = 0; i < word.length; i++) {
            if (row.boxes[i].state === "correct")
                continue;

            var letter = row.boxes[i].letter;
            var is_in_word = false;

	        for (var k = 0; k < wordset.length; k++) {
                if (letter === wordset[k]) {
                    is_in_word = true;
                    wordset.splice(k, 1);
                    break;
                }
	        }

            if (is_in_word) {
                row.boxes[i].state = "in_word";
                ls_change["inWord"].add(letter);
	        }
            else if (row.boxes[i].state === "filled") {
                row.boxes[i].state = "incorrect";
                ls_change["notInWord"].add(letter);
	        }
	    }

	    if (is_winner) {
            row.state = "winner";
	        row.winnings += 200;
	    }
        else {
            for (var i=0; i<word.length; i++) {
                if (row.boxes[i].state === "correct")
	    			row.winnings += 20;
                else if(row.boxes[i].state==="in_word")
	    			row.winnings += 5;
	    	}
	    }

	    setLetterStates(ls_change);
	    return row;
	}


	function keyDownHandler(e)
    {
		var input = e.key || e.target.value;

	    const is_valid_key = validKeysSet.has(input);
	    var foc = findFocus(gamespace);
	    var gamechange = gamespace;

	    var guess = "";
	    for (var i = 0; i < wordlength; i++)
            guess = guess+gamechange[foc[0]].boxes[i].letter;
	    var is_pokemon = pokemonset.has(guess);

	    if (foc[1] === -1 && input === "Enter" && is_pokemon) {
	        var rowchange = 
                checkAnswer(gamechange[foc[0]],letterStates,setLetterStates);
            gamechange[foc[0]] = rowchange;

	        if (gamechange[foc[0]].state !== "winner")
                gamechange[foc[0]].state = "filled";
	        gamechange[foc[0]].guess = guess;
	    }
	    else if (input === "Backspace") {
            if (foc[1] === -1) {
                gamechange[foc[0]].boxes[wordlength - 1].state = "empty";
                gamechange[foc[0]].boxes[wordlength - 1].letter = '';
	        }
            else if (foc[1] !== 0) {
                gamechange[foc[0]].boxes[foc[1] - 1].state = "empty";
                gamechange[foc[0]].boxes[foc[1] - 1].letter = '';
            }
	    }
	    else if (foc[1] !== -1 && is_valid_key) {
            gamechange[foc[0]].boxes[foc[1]].letter = input;
            gamechange[foc[0]].boxes[foc[1]].state = "filled"
	    }

	    console.log(gamechange[0].pokemon);
	    dollarHandler(gamechange[foc[0]].winnings)
	    showComplete(gamechange);
        setGamespace([...gamechange]);
    }

	function infoHandler()
    {
        setDisplayState(
            {...displayState, 
             "showInfo": !displayState["showInfo"],
             "showBackdrop": !displayState["showBackdrop"]
            });
  	}

  	function showComplete(gamespace)
    {
        var is_winner = false;
  		for (var i = 0; i < gamespace.length; i++) {
      		if (gamespace[i].state === "winner") {
                is_winner = true;
	        	setDisplayState(
                    {...displayState,
                     "showWinpage": true,
                     "showBackdrop": true
                    });
	        	break;
      		}
    	}

     	if (findFocus(gamespace) === 0 && !is_winner) {
            console.log(gamespace[0].pokemon);
	    	setDisplayState(
                {...displayState,
                 "showLosepage": true,
                 "showBackdrop":true
                });
        }
  	}   

  	function dollarHandler(delta)
    {
        setPokedollars(pokedollars + delta);
  	}

  	function shopHandler()
    {
  		setDisplayState(
            {...displayState,
             "showShop": !displayState["showShop"],
             "showBackdrop": !displayState["showBackdrop"]
            });
  	}

  	function shuckleHandler()
    {
        setDisplayState(
            {...displayState,
             "showShucklePage": !displayState["showShucklePage"],
             "showBackdrop": !displayState["showBackdrop"]
            });
  	}

  	function shinyHandler()
    {
  		setDisplayState(
            {...displayState,
             "showShinyPage": !displayState["showShinyPage"],
             "showBackdrop": !displayState["showBackdrop"]
            });
  	}

	return (
        <div className={classes.GSDiv}>
			{window.localStorage.adoptedShuckle === "true" && 
                 <PoffinStorage keyDownHandler = {keyDownHandler}
                 validKeys = {props.validKeys}/>}
			<header className = "MenuBar">
        		<div style = {{fontSize: "3rem",
                               position: "relative",
                               left: "20px",
                               width: "240px"}}>
                    <img style = {{height:"35px"}} 
                         src = {require("../assets/pokedollarLight.png")}/>
          			{" "}{pokedollars}
        		</div>
        		<div className = "GameTitle">
                    <img height = "35"
                     width = "auto" 
                     src = {require("../assets/LogoLight.png")}/>
        		</div>
        		<div style = {{width: "100px",
                               paddingRight: "10px",
                               alignItems: "center",
                               display: "flex",
                               justifyContent: "space-between"}}>
        			<button className = "shopButton" 
                            style = {{cursor: "pointer",
                                      background: "none",
                                      border: "none"}} 
                            onClick = {shopHandler}>
        				<svg width = "30"
                             height = "30" 
                             xmlns = "http://www.w3.org/2000/svg"
                             fill-rule = "evenodd" 
                             clip-rule = "evenodd">
                            <path 
							d="M 13.75 28.75 l -9.9763 0.0175 v -12.5 l 11.2263 -10 c 3.75 3.335 7.5 6.6487 11.25 9.9825 v 12.5 l -9.9763 0.0175 v -2.5 c 0 -0.0225 0.0137 -0.9 -0.0013 -1.315 c -0.0338 -0.5262 -0.3625 -0.9287 -0.7925 -1.1 c -0.2963 -0.1125 -0.625 -0.1112 -0.9125 0 c -0.43 0.1713 -0.7837 0.5313 -0.8175 1.0562 c -0.0163 0.4387 0 1.3413 0 1.3413 v 2.5 z 
							m 5 -2.5 h 5 l 0.0238 -8.8725 l -8.7737 -7.765 l -8.75 7.79 v 8.8475 h 5 l 0.0238 -1.2325 c 0.0213 -1.7237 1.1113 -3.0262 2.4613 -3.52 c 0.8213 -0.305 1.7563 -0.305 2.5775 0 c 1.3712 0.5012 2.4163 1.7963 2.4375 3.5025 v 1.25 z
							m -4.6738 -10 h 1.8475 c 1.4638 0.0213 1.5812 -1.2325 2.8262 -1.2325 c 0.805 0 1.245 0.655 1.25 1.25 c 0.005 0.595 -0.35 1.0325 -0.7788 1.2463 c 0.41 0.2213 0.775 0.6588 0.7788 1.2537 c 0.0037 0.595 -0.435 1.25 -1.25 1.25 c -1.245 0 -1.3625 -1.2887 -2.8262 -1.2675 h -1.8313 c -1.4638 -0.0213 -1.5975 1.2675 -2.8425 1.2675 c -0.815 0 -1.2537 -0.655 -1.25 -1.25 c 0.0037 -0.595 0.3687 -1.0325 0.7788 -1.2537 c -0.4288 -0.2138 -0.7837 -0.6512 -0.7788 -1.2463 c 0.005 -0.595 0.4462 -1.25 1.25 -1.25 c 1.245 0 1.3625 1.2537 2.8262 1.2325 m 0.9237 -15 l 15 13.3425 l -1.6375 1.8513 l -13.35 -11.8675 l -13.3512 11.8675 l -1.6612 -1.8688 l 15 -13.325 z">		
							</path>
                        </svg>
        			</button>
          			<button className = "infoButton" 
                            style = {{cursor: "pointer",
                                      background: "none",
                                      border: "none",
                                      paddingTop: "4px"}} 
                            onClick = {infoHandler}>
	          			<svg xmlns = "http://www.w3.org/2000/svg"
                             height = "28" 
                             viewBox = "4 4 24 24"
                             width = "28"
                             class = "game-icon"
                             data-testid = "icon-help">
                        { 
                            <path fill = "var(--color-tone-1)"
                                  d = "M14.8333 23H17.1666V20.6667H14.8333V23Z
	          				M15.9999 4.33334C9.55992 4.33334 4.33325 9.56001 4.33325 16C4.33325 22.44 9.55992 27.6667 15.9999 27.6667C22.4399 27.6667 27.6666 22.44 27.6666 16C27.6666 9.56001 22.4399 4.33334 15.9999 4.33334Z
	          				M15.9999 25.3333C10.8549 25.3333 6.66659 21.145 6.66659 16C6.66659 10.855 10.8549 6.66668 15.9999 6.66668C21.1449 6.66668 25.3333 10.855 25.3333 16C25.3333 21.145 21.1449 25.3333 15.9999 25.3333Z
	          				M15.9999 9.00001C13.4216 9.00001 11.3333 11.0883 11.3333 13.6667H13.6666C13.6666 12.3833 14.7166 11.3333 15.9999 11.3333C17.2833 11.3333 18.3333 12.3833 18.3333 13.6667C18.3333 16 14.8333 15.7083 14.8333 19.5H17.1666C17.1666 16.875 20.6666 16.5833 20.6666 13.6667C20.6666 11.0883 18.5783 9.00001 15.9999 9.00001Z">	
	          				</path>
                        }
	          			</svg>
          			</button>
        		</div>
      		</header>
      		<div className = "Spacer"/>
                <GameSpace id = "gamespace"
                           gamespace = {gamespace}
                           wordlength = {props.wordlength}
                           pokemonlist = {props.pokemonlist}/>
                <Keyboard id = "keyboard" 
                          letterStates = {letterStates} 
                          handler = {keyDownHandler}
                          gamespace = {gamespace}
                          setGamespace = {setGamespace} 
                          validKeys = {props.validKeys}/>
                {displayState["showBackdrop"] && <Backdrop/>}
                {displayState["showWinpage"] && 
                     <WinDisplay setDisplayState = {setDisplayState}
                                 gamespace = {gamespace}/>}
                {displayState["showLosepage"] && 
                     <LoseDisplay setDisplayState = {setDisplayState} 
                                  gamespace = {gamespace}/>}
                {displayState["showInfo"] && 
                    <InfoDisplay infoHandler = {infoHandler}/>}
                {displayState["showShop"] && 
                    <ShopDisplay dollarHandler = {dollarHandler} 
                                 shopHandler = {shopHandler}/>}
                {displayState["showShucklePage"] && 
                    <ShuckleDisplay ShuckleHandler = {shuckleHandler}/>}
                {displayState["showShinyPage"] && 
                    <ShinyDisplay ShinyHandler = {shinyHandler}/>}
            </div>
	)
}

export default GSDiv;
