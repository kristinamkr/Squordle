/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState , useEffect } from 'react';

function ShuckleCursor(props)
{
	const [shucklePos, setShucklePos] = useState([0, 0]);
	const [nearMouse, setNearMouse] = useState(false);
	const [nearGoal, setNearGoal] = useState(false);
	const [shuckleAction, setShuckleAction] = useState('followMouse');
	const [actFrame, setActFrame] = useState(0);
	const [actNum, setActNum] = useState(0);

    // duplicate?
	const [shuckleDir, setShuckleDir] = useState([0, 0, 0])
	const [mousePos, setMousePos] = useState([0, 0])

	const [angerIcon, setAngerIcon] = useState(0);
	const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace","Enter"].concat(props.validKeys));
	const [enemyKey, setEnemyKey] = useState(0)
	const [justAte, setJustAte] = useState(false);
	const [shuckleThought, setShuckleThought] = useState("");
	const [obfuscation, setObfuscation] = useState(0);

	var biteFrameList = [[4,  44,   "1"], 
                         [10, 38,   "1"], 
                         [16, 32,   "1"], 
                         [16, 32, "0.7"],
                         [16, 32, "0.3"],
                         [16, 32,   "0"]];

	var slashFrameList = [["0",   "1"],
                          ["1",   "1"],
                          ["2",   "1"],
                          ["3",   "1"],
                          ["4",   "1"],
                          ["4", "0.8"],
                          ["4", "0.6"],
                          ["4", "0.4"],
                          ["4", "0.2"],
                          ["4",   "0"]];

	var musicFrameList = [-14, -18];

	var randomJitters = [1, 1, 1, 1, 2, 2, 2];
	var smallJitters = [0.2, 0.2, 0.2, 0.4, 0.4, 0.4];
	var posNegNull = [-1, 0, 1];

	// var derealizePoffin = props.derealizePoffin[0]; // what do
	// var poffinEaten = props.derealizePoffin[1];     // numbered behavior
	var poffinEaten = 0; 

    // what does this do
	function slashAlt()
    {
		if (actNum % 2 === 0)
			return("1");
        return("-1");
	}

	function changeShucklePos(Pos)
    {
		var mouseX = Pos[0];
  		var mouseY = Pos[1];
  		var shuckleX = shucklePos[0];
  		var shuckleY = shucklePos[1];

  		var xdir = Math.max(Math.min(0.03 * (mouseX-shuckleX), 3.5), -3.5);
  		var ydir = Math.max(Math.min(0.03 * (mouseY-shuckleY), 3.5), -3.5);

  		setShucklePos([xdir + shuckleX, ydir + shuckleY]);
	}

	function chooseKey()
    {
		if (remainingKeys.length === 0)
			setShuckleAction("followMouse");

		var keySelection = Math.floor(Math.random() * remainingKeys.length);
		var key = remainingKeys[keySelection];

		var element = document.getElementById(key);
		var position = element.getBoundingClientRect();
		var xPos = position.left;
		var yPos = position.top;

		setShuckleDir([xPos, yPos, 0]);
		setEnemyKey(element);
	}

	function destroyKey()
    {
		var damageList = ["#131313", "#242424", "#303030", "#404040"];
		var damageSelection = Math.floor(Math.random() * damageList.length);
		var damage = damageList[damageSelection];

		enemyKey.style.background = damage;
		enemyKey.style.pointerEvents = "none";
		setRemainingKeys(remainingKeys.filter(key => key !== enemyKey.id));
	}

	function changeMousePos(e)
    {
		setMousePos([e.pageX - 20, e.pageY - 20, 0]);
	}

	function isNearGoal()
    {
		return(Math.abs(shuckleDir[0] - shucklePos[0]) < 25 && 
               Math.abs(shuckleDir[1] - shucklePos[1]) < 25);
	}

	useEffect(() => {
  		document.addEventListener("mousemove", changeMousePos);
  		return () => document.removeEventListener("mousemove", changeMousePos);
    });

	// This renders away the shininess cloud cover
    // if turning shiny is cancelled by juice
	useEffect(() => {
		if (shuckleAction !== "turnShiny" && obfuscation !== 0){
			setTimeout(() => {
				if (obfuscation < 0)
					setObfuscation(0);
				else
					setObfuscation(obfuscation - 0.003);
			}, 16);
		}
	})

	// This useEffect acts on shuckle reagrding movement/proximity
    // behaviors at ~60fps
	useEffect(() => {
		if (props.shuckleDir[2] === 2) {
			setShuckleAction("followPoffin");
			setShuckleThought("");
			setActFrame(0);
		}

		if (shuckleAction === "followMouse") {
			setTimeout(() => {
				setNearGoal(isNearGoal());
				setShuckleDir(mousePos);
				changeShucklePos(mousePos);
				if (props.shuckleDir[2] === 1) {
					setNearGoal(false);
					setShuckleAction("followPoffin");
				}
		    }, 16);
		}
        else if (shuckleAction === "followPoffin") {
			setTimeout(() => {
				setShuckleDir(props.shuckleDir);
				if (shuckleDir[2] === 0 && isNearGoal())
					setNearGoal(true);
				else {
					setNearGoal(false);
					setActNum(0);
				}
				changeShucklePos([shuckleDir[0] + 15, shuckleDir[1]]);
			}, 16);
		}
        else if (shuckleAction === "behaveAngrily") {
			if (!justAte) {
				setTimeout(() => {
					if(isNearGoal())
						setNearGoal(true);
					else {
						setNearGoal(false);
						setActNum(0)
					}
					changeShucklePos(shuckleDir);
				}, 16);
			}
            else {
				/*setTimeout(() => {
					var ra`ndomDirections = [-10,-4,-4,-2,-2,-1,-1,-1,0,0,0,0,1,1,1,2,2,4,4,10];

					var dirSelection = Math.floor(Math.random()*randomDirections.length);
					var xDelta = randomDirections[dirSelection];

					var dirSelection = Math.floor(Math.random()*randomDirections.length);
					var yDelta = randomDirections[dirSelection];

					setShucklePos([shucklePos[0]+xDelta,shucklePos[1]+yDelta])
				}, 64);
				*/
			}
		}
        else if (shuckleAction === "layEgg") {
			setTimeout(() => {

            }, 16);
		}
        else if(shuckleAction === "getSick") {
			setTimeout(() => {

            }, 16);
		}
        else if (shuckleAction === "turnShiny"){
			if (!justAte){
				if (obfuscation > 1.5) {
					window.localStorage.shuckleShiny = "1";
					setObfuscation(1);
				}
                else if (window.localStorage.shuckleShiny === "0") {
					setTimeout(() => {
						var xJitter = randomJitters[
                            Math.floor(Math.random() * randomJitters.length)]
                            * posNegNull[Math.floor(Math.random() * posNegNull.length)];

						var yJitter = randomJitters[
                            Math.floor(Math.random() * randomJitters.length)]
                            * posNegNull[Math.floor(Math.random() * posNegNull.length)];

						setShucklePos([shucklePos[0] + xJitter, shucklePos[1] + yJitter])
						setObfuscation(obfuscation + 0.005)
                    }, 16);
				}
                else if (window.localStorage.shuckleShiny === "1") {
					setTimeout(() => {
						var xJitter = smallJitters[
                            Math.floor(Math.random() * smallJitters.length)]
                            * posNegNull[Math.floor(Math.random() * posNegNull.length)];

						var yJitter = smallJitters[
                            Math.floor(Math.random() * smallJitters.length)]
                            * posNegNull[Math.floor(Math.random() * posNegNull.length)];

						setShucklePos([shucklePos[0] + xJitter, shucklePos[1] + yJitter])
						if (obfuscation <= 0) {
							setObfuscation(0);
							setShuckleThought("");
							setShuckleAction("beHappy");
							setJustAte("true");
						}
						setObfuscation(obfuscation - 0.003)
                    }, 16);
				}
			}
		}
    });

	//This useEffect acts on shuckle regarding goal based behaviors
	useEffect(() => {
		if (shuckleAction === "followPoffin"){
			setTimeout(() => {
				if (actNum === 5) {
					// derealizePoffin(); ? ? ?
					setActNum(0);
					setNearGoal(false);
					setShuckleAction("followMouse")

					if (poffinEaten === 0)					
						setShuckleAction("followMouse");
					else if (poffinEaten === 1) {
						chooseKey()
						setShuckleAction("behaveAngrily");
						setNearGoal(false);
						setJustAte(true);
					}
					else if (poffinEaten === 2)				
						setShuckleAction("layEgg");
					else if (poffinEaten === 3)				
						setShuckleAction("getSick");
					else if (poffinEaten === 4) {
						if (window.localStorage.shuckleShiny === "0") {
							setShuckleAction("turnShiny");
							setShuckleThought("confused");
						}
                        else
							setShuckleAction("beNonplussed");
						setJustAte(true);
					}
					else if (poffinEaten === 5) {
						setShuckleAction("beHappy")
						setJustAte(true);
					}
				}
                else {
					if (actFrame === 5) {
						setActNum(actNum + 1);
						setActFrame(0);
					}
                    else
						setActFrame(actFrame+1);
				}
            }, 200);
		}
		else if (shuckleAction === "behaveAngrily") {
			setTimeout(() => {
				if (angerIcon === 1)
					setAngerIcon(0);
				else
					setAngerIcon(angerIcon + 1);
            }, 1000);

			setTimeout(() => {
				if (actNum === 7) {
					destroyKey();
					setActNum(0);
					setNearGoal(false);
					setTimeout(() => {
						chooseKey()
                    }, 500);
				}
                else {
					if (actFrame === 9) {
						setActNum(actNum+1);
						setActFrame(0);
					}
                    else
						setActFrame(actFrame + 1);
				}
            }, 100);
		}
		else if (shuckleAction === "beHappy") {
			setTimeout(() => {
				setActFrame((actFrame + 1) % 2);
				if (!justAte) {
					setActFrame(0);
					setShuckleAction("followMouse");
				}	
            }, 500);
		}
		else if (shuckleAction === "turnShiny") {
			if (shuckleThought === "confused") {
				setTimeout(() => {
					setActFrame((actFrame + 1) % 2);
					if (!justAte) {
						setActFrame(0);
						setShuckleThought("surprised");
					}	
                }, 500);
			}
		}
		else if (shuckleAction === "beNonplussed") {
			setTimeout(() => {
				setActFrame((actFrame + 1) % 2);
				if(!justAte) {
					setActFrame(0);
					setShuckleAction("followMouse");
				}	
            }, 500);
		}
    });

	//This useEffect turns "justAte" on and off after 2500ms
	useEffect(() => {
		if (justAte)
			setTimeout(() => {
				setJustAte(false);
			}, 2500);
    });

	return (
		<div>
			{shuckleAction === "followMouse" && nearGoal && (
				<div>
                    <img className = "heart" 
                         style = {{position: "absolute",
                                   left: String(shucklePos[0]) + "px",
                                   top: String(shucklePos[1]) + "px"}} 
                         src = {require("../assets/shuckleLove.gif")}/>
                    <img className = "heart" 
                         style = {{position:"absolute",
                                   left: String(shucklePos[0] + 28) + "px",
                                   top: String(shucklePos[1]-6)+"px"}} 
                         src = {require("../assets/shuckleLove.gif")}/>
                    <img className = "heart" 
                         style = {{position: "absolute",
                                   left: String(shucklePos[0] + 13) + "px",
                                   top: String(shucklePos[1] - 10) + "px"}} 
                         src = {require("../assets/shuckleLove.gif")}/>
				</div>
            )}
			{shuckleAction === "behaveAngrily" && (
				<div>
				<img className = "wordBubble" 
                     style = {{width: "32px",
                               height: "32px",
                               position: "absolute",
                               left: String(shucklePos[0] + 18) + "px",
                               top: String(shucklePos[1] - 18) + "px"}} 
                     src = {require("../assets/wordBubble.png")}/>
				{angerIcon === 0 && 
                    <img className = "angerIcon" 
                         style = {{width: "18px",
                                   height: "18px",
                                   position: "absolute",
                                   left: String(shucklePos[0] + 25) + "px",
                                   top: String(shucklePos[1] - 14) + "px"}} 
                         src = {require("../assets/angerIcon.png")}/>}
				{angerIcon===1 && 
                    <img className = "hotspringsIcon" 
                         style = {{width: "18px",
                                   height: "18px",
                                   position: "absolute",
                                   left: String(shucklePos[0] + 25) + "px",
                                   top: String(shucklePos[1] - 14) + "px"}} 
                         src = {require("../assets/fireIcon.png")}/>}
				</div>
            )}
			{shuckleAction === "behaveAngrily" && nearGoal && (
				<div>
				<img className="slash" 
                     style = {{opacity: slashFrameList[actFrame][1],
                               width: "36px",
                               height: "36px",
                               transform: "scaleX(" + slashAlt() + ")",
                               zIndex: "2",
                               position: "absolute",
                               left: String(shuckleDir[0] + 2) + "px",
                               top: String(shuckleDir[1] + 5) + "px"}} 
                     src = {require("../assets/slash" + 
                                slashFrameList[actFrame][0]+".png")}/>
				</div>
            )}
			{shuckleAction === "followPoffin" && nearGoal && (
				<div>
				<img className = "bite" 
                     style = {{opacity: biteFrameList[actFrame][2],
                               zIndex: "2", 
                               position: "absolute",
                               left: String(shuckleDir[0])+"px",
                               top: String(shuckleDir[1] + 
                                    biteFrameList[actFrame][0]) + "px"}}
                     src = {require("../assets/bite.png")}/>
				<img className = {classes.underbite} 
                     style = {{opacity: biteFrameList[actFrame][2],
                               zIndex: "2",
                               position: "absolute",
                               left: String(shuckleDir[0]) + "px",
                               top: String(shuckleDir[1] + 
                                    biteFrameList[actFrame][1]) + "px"}}
                     src = {require("../assets/bite.png")}/>
				</div>
            )}
			{shuckleAction === "beHappy" && (
				<div>
				<img className = "musicNote" 
                     style = {{position: "absolute",
                               left: String(shucklePos[0] + 24) + "px",
                               top: String(shucklePos[1] + 
                                    musicFrameList[actFrame]) + "px"}} 
                     src = {require("../assets/singleNote.png")}/>
				<img className = "musicNote" 
                     style = {{position: "absolute",
                               left: String(shucklePos[0] + 5) + "px",
                               top: String(shucklePos[1] + 
                                    musicFrameList[actFrame]) + "px"}} 
                     src = {require("../assets/eighthNotes.png")}/>
				</div>
            )}
			{shuckleAction === "beNonplussed" && (
				<div>
				<img className = "musicNote" 
                     style = {{position: "absolute",
                               left: String(shucklePos[0] + 24) + "px",
                               top: String(shucklePos[1] + 
                                    musicFrameList[actFrame]) + "px"}} 
                     src = {require("../assets/singleNote.png")}/>
				<img className = "musicNote" 
                     style = {{position: "absolute",
                               left: String(shucklePos[0] + 5) + "px",
                               top: String(shucklePos[1] + 
                                    musicFrameList[actFrame]) + "px"}} 
                     src = {require("../assets/eighthNotes.png")}/>
				</div>
            )}
			{shuckleThought === "confused" && (
				<div>
				<img className = "questionMark" 
                     style = {{position: "absolute",
                               left: String(shucklePos[0] + 24) + "px",
                               top: String(shucklePos[1] + 
                                  musicFrameList[actFrame]) + "px"}} 
                     src = {require("../assets/questionMark.png")}/>
				</div>
            )}
			{shuckleThought === "surprised" && (
				<div>
				<img className = "exclamationPoint" 
                     style = {{position: "absolute",
                               left: String(shucklePos[0] + 24) + "px",
                               top: String(shucklePos[1] + 
                                    musicFrameList[actFrame]) + "px"}}
                               src={require("../assets/exclamationPoint.png")}/>
				</div>
            )}
			{obfuscation !== 0 && (
				<div>
				<img className = "cloudCover" 
                     style = {{width: "64px",
                               height: "64px",
                               zIndex: "1",
                               opacity: String(obfuscation),
                               position: "absolute",
                               left: String(shucklePos[0] - 10) + "px",
                               top: String(shucklePos[1] - 5) + "px"}} 
                     src = {require("../assets/cloudCover.png")}/>
				</div>
            )}
			{window.localStorage.shuckleShiny === "0" && 
                <img className = "shuckle" 
                     style = {{position: "absolute",
                               left: shucklePos[0] + "px",
                               top: shucklePos[1] + "px"}} 
                     src = {require("../assets/shuckle.gif")}/> }
			{window.localStorage.shuckleShiny === "1" && 
                <img className = "shuckle" 
                     style = {{position: "absolute",
                               left: shucklePos[0] + "px",
                               top: shucklePos[1] + "px"}} 
                     src = {require("../assets/shuckleShiny.gif")}/> }
		</div>
    )
}

export default ShuckleCursor;
