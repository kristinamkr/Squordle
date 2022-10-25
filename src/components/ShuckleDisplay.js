/*
 * ShuckleDisplay.js
*/ 

import classes from "./style/ShuckleDisplay.module.css";

function ShuckleDisplay(props)
{
	return (
		<div className = {classes.ShuckleDisplay}>
			<p/>
			<img style = {{width:"80%"}} 
                 src = {require("../assets/howtoplayLight.png")}/>

			<div className = {classes.listRow}>
                <img style = {{width: "14px",
                               height: "100%",
                               paddingRight: "10px"}} 
                     src = {require("../assets/BulletPointLight.png")}/>
                You have six tries to guess the name of the Pokémon.
			</div>

			<div className = {classes.listRow}>
                <img style = {{width: "14px",
                               height: "100%",
                               paddingRight: "10px"}} 
                               src = {require("../assets/BulletPointLight.png")}/>
                Each guess must be a real Pokémon. Hit enter to submit your guess.
			</div>

			<div className = {classes.listRow}>
                <img style = {{width: "14px",
                               height: "100%",
                               paddingRight: "10px"}} 
                     src = {require("../assets/BulletPointLight.png")}/>
                Green letters are in the correct spot, yellow letters are in the wrong spot, and gray letters are not in the name.
			</div>

			<div className = {classes.listRow} 
                 style={{paddingBottom:"20px"}}>
                <img style = {{width: "14px",
                               height: "100%",
                               paddingRight: "10px"}} 
                     src = {require("../assets/BulletPointLight.png")}/>
                Win 5 Pokédollars for each yellow letter, 20 for each green letter, and 200 for correct guesses!
			</div>
			<button onClick = {props.ShuckleHandler}>
                Close
            </button>
			<p/>
		</div>
	);
}

export default ShuckleDisplay;
