/*
 * InfoDisplay.js
 * making waves
*/ 

import classes from "./style/InfoDisplay.module.css";

function InfoDisplay(props)
{
	return (
		<div className = {classes.InfoDisplay}>
			<p/>
			<img style = {{width:"80%"}} 
                 src = {require("../assets/howtoplayLight.png")}/>
			<div className = {classes.listRow}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}/>
                You have six tries to guess the name of the Pokémon.
			</div>

			<div className = {classes.listRow}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}/>
                Each guess must be a real Pokémon. 
                Hit enter to submit your guess.
			</div>

			<div className = {classes.listRow}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}/>
                Green letters are in the correct spot,
                yellow letters are in the wrong spot, 
                and gray letters are not in the name.
			</div>

			<div className = {classes.listRow}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}/>
                Win 5 Pokédollars for each yellow letter, 
                20 for each green letter, 
                and 200 for correct guesses!
			</div>

			<div className = {classes.listRow} style={{paddingBottom: "20px"}}>
                <img className = {classes.pokeBullet} 
                     src = {require("../assets/BulletPointLight.png")}/>
                This project was made by&nbsp; 
                <a style = {{display:"inline-block"}} 
                   href="https://www.github.com/3ddiehead">3ddiehead</a>
			</div>

			<button onClick = {props.infoHandler}>
                Close
            </button>
			<p/>
		</div>
    );
}

export default InfoDisplay;
