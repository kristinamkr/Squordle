/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState , useEffect } from 'react';

function ShuckleCursor(props)
{
    //  MOUSE EVENTS -----------------------------------------------------------
	const [mousePos, setMousePos] = useState([0, 0])

	function changeMousePos(e)
    {
		setMousePos([e.pageX - 20, e.pageY - 20, 0]);
	}

	useEffect(() => {
  		document.addEventListener("mousemove", changeMousePos);
  		return () => document.removeEventListener("mousemove", changeMousePos);
    });
    // -------------------------------------------------------------------------

    const focus = { MOUSE: 0,
                    ITEM:  1,
                    KEY:   2};
    Object.freeze(focus);

	const action = { NONPLUSSED: 0, 
                     HAPPY:      2,
                     ANGRY:      1,
                     CONFUSED:   3,
                     SURPRISED:  4,
                     SICK:       5,
                     SHINY:      6,
                     LAY_EGG:    7};
    Object.freeze(action);

	const [shuckleDir, setShuckleDir] = useState([0, 0, 0])
	const [shucklePos, setShucklePos] = useState([0, 0]);

	const [shuckleTarget, setShuckleTarget] = useState([0, false]);
	const [shuckleAction, setShuckleAction] = useState(0);

	// const [angerIcon, setAngerIcon] = useState(0);
	const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));
	const [enemyKey, setEnemyKey] = useState(0)

    const [itemEaten, setItemEaten] = useState(-1);  // numbered behavior
	const [obfuscation, setObfuscation] = useState(0);

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

	function isNearTarget()
    {
		return (Math.abs(shuckleDir[0] - shucklePos[0]) < 25 && 
                Math.abs(shuckleDir[1] - shucklePos[1]) < 25);
	}

	function chooseKey()
    {
		if (remainingKeys.length === 0)  // base case
			setShuckleAction(0);

		var keySelection = Math.floor(Math.random() * remainingKeys.length);
		var key = remainingKeys[keySelection];

		var element = document.getElementById(key);
		var position = element.getBoundingClientRect();

		setShuckleDir([position.left, position.top, 0]);
		setEnemyKey(document.getElementById(key));
	}

	function destroyKey()
    {
		var damageList = ["#131313", "#242424", "#303030", "#404040"];
		var damageSelection = Math.floor(Math.random() * damageList.length);
		var damage = damageList[damageSelection];

		// enemyKey.style.background = damage;
		// enemyKey.style.pointerEvents = "none";
		setRemainingKeys(remainingKeys.filter(key => key !== enemyKey.id));
	}

    // --- TARGET LOCKING MECHANISM --------------------------------------------
	useEffect(() => {
        if (props.itemRealized) {
            (props.derealizeItem[0])();
            setItemEaten(props.derealizeItem[1]);  // numbered behavior
            //setJustAte(true);
        }

		if (shuckleTarget[0] === focus.MOUSE &&
            shuckleAction !== action.ANGRY) {
			setTimeout(() => {
                setShuckleTarget([shuckleTarget[0], isNearTarget()]);
				setShuckleDir(mousePos);
				changeShucklePos(mousePos);

				if (props.shuckleDir[2] === 0) {  // if poffin NOT moving
					setShuckleTarget([focus.ITEM, false]);
                }
		    }, 16);  // controls shuckle speed (frightening)
		}

        else if (shuckleTarget[0] === focus.ITEM &&
                 shuckleAction !== action.ANGRY) {
			setTimeout(() => {
				setShuckleDir(props.shuckleDir);
				changeShucklePos([shuckleDir[0] + 15, shuckleDir[1]]);
                if (isNearTarget())
                    setShuckleTarget([shuckleTarget[0], true]);
			}, 16);
		}
    });

	//This useEffect acts on shuckle regarding goal based behaviors
	useEffect(() => {
        if (itemEaten != -1 && shuckleTarget[1]) {
            setTimeout(() => {
                setShuckleAction(itemEaten); 

                if (shuckleAction === 0) { // ANGRY
                    chooseKey();
                    destroyKey();
                } 
            }, 2500);
            setItemEaten(-1);
        }
    }, [itemEaten, shuckleTarget[1]]);

    // RENDER ------------------------------------------------------------------
	return (
		<div>
			{window.localStorage.shuckleShiny === "0" && 
                <img className = {classes.Shuckle} 
                     style = {{left: shucklePos[0] + "px",
                               top: shucklePos[1] + "px"}} 
                     src = {require("../assets/shuckle.gif")}/> }

			{window.localStorage.shuckleShiny === "1" && 
                <img className = {classes.Shuckle} 
                     style = {{left: shucklePos[0] + "px",
                               top: shucklePos[1] + "px"}} 
                     src = {require("../assets/shuckleShiny.gif")}/> }

			{shuckleTarget[0] === focus.MOUSE && shuckleTarget[1] && (
				<div>
                    <img className = {classes.love} 
                         style = {{left: String(shucklePos[0]) + "px",
                                   top: String(shucklePos[1]) + "px"}} 
                        src = {require("../assets/shuckleLove.gif")}/>
				</div>
            )}

            {shuckleTarget[0] === focus.ITEM && shuckleTarget[1] && 
             shuckleAction !== action.ANGRY && (
                <div>
                <img className = {classes.chomp}
                     style = {{left: String(shuckleDir[0]) + "px",
                               top: String(shuckleDir[1]) + "px"}} 
                     src = {require("../assets/chomp.gif")}/>
                </div>
            )}

			{shuckleAction === action.ANGRY && (
				<div>
				<img className = {classes.angry} 
                     style = {{left: String(shucklePos[0] + 18) + "px",
                               top: String(shucklePos[1] - 18) + "px"}} 
                     src = {require("../assets/anger.gif")}/>
				</div>
            )}

            {shuckleAction === action.ANGRY && shuckleTarget[1] && (
                <div>
                <img className = {classes.slash} 
                     style = {{left: String(shuckleDir[0] + 2) + "px",
                               top: String(shuckleDir[1] + 5) + "px"}} 
                     src = {require("../assets/slash.gif")} /> 
                </div>
            )}

			{obfuscation !== 0 && (
				<div>
				<img className = {classes.cloudCover} 
                     style = {{opacity: String(obfuscation),
                               left: String(shucklePos[0] - 10) + "px",
                               top: String(shucklePos[1] - 5) + "px"}} 
                     src = {require("../assets/cloudCover.png")}/>
				</div>
            )}
		</div>
    )
}

export default ShuckleCursor;
