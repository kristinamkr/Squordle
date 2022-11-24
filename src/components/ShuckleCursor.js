/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState , useEffect } from 'react';

function ShuckleCursor(props)  // offset = - 20
{
    const focus = { MOUSE: 0,
                    ITEM:  1,
                    KEY:   2};
    Object.freeze(focus);

	const action = { NONPLUSSED: 0, 
                     ANGRY:      1,
                     HAPPY:      2,
                     CONFUSED:   3,
                     SURPRISED:  4,
                     SICK:       5,
                     SHINY:      6,
                     LAY_EGG:    7};
    Object.freeze(action);

    const mousePos = props.mousePos;
	const [shuckleDir, setShuckleDir] = [props.shuckleDir, props.setShuckleDir];
	const [shucklePos, setShucklePos] = useState([0, 0]);

    const itemEaten = props.derealizeItem; 
    // [0] - focus, [1] - targetReached
	const [shuckleTarget, setShuckleTarget] = useState([0, false]);
	const [shuckleAction, setShuckleAction] = useState(0);

	const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));
	const [enemyKey, setEnemyKey] = useState(0)

	function changeShucklePos(Pos)
    {
		const [mouseX, mouseY] = [Pos[1], Pos[0]];  // idk why flipped
  		const [shuckleX, shuckleY] = [shucklePos[0], shucklePos[1]];

  		const xdir = Math.max(Math.min(0.03 * (mouseX - shuckleX), 3.5), -3.5);
  		const ydir = Math.max(Math.min(0.03 * (mouseY - shuckleY), 3.5), -3.5);

  		setShucklePos([xdir + shuckleX, ydir + shuckleY]);
	}

	function isNearTarget()  // idk why flipped pt 2
    {
		return (Math.abs(shuckleDir[0] - shucklePos[1]) < 25 && 
                Math.abs(shuckleDir[1] - shucklePos[0]) < 25);
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
		setEnemyKey(element);
	}

	function destroyKey()
    {
		var damageList = ["#131313", "#242424", "#303030", "#404040"];
		var damageSelection = Math.floor(Math.random() * damageList.length);
		var damage = damageList[damageSelection];

		enemyKey.style.background = damage;
		enemyKey.style.pointerEvents = 'none';
		setRemainingKeys(remainingKeys.filter(key => key !== enemyKey.id));
	}

	useEffect(() => {
        if (props.realizeItem) {
            props.derealize();
            console.log("just ate poffin # " + itemEaten);
        }
    });

    // --- TARGET LOCKING MECHANISM --------------------------------------------
	useEffect(() => {
		if (shuckleTarget[0] === focus.MOUSE &&
            shuckleAction !== action.ANGRY) {
			setTimeout(() => {
                setShuckleTarget([shuckleTarget[0], isNearTarget()]);
				if (shuckleDir[2] === 0) {  // if poffin NOT moving
					setShuckleTarget([focus.ITEM, false]);
                }
				setShuckleDir(mousePos);
				changeShucklePos(mousePos);
		    }, 16);  // controls shuckle speed (frightening)
		}

        else if (shuckleTarget[0] === focus.ITEM &&
                 shuckleAction !== action.ANGRY) {
			setTimeout(() => {
                if (isNearTarget())
                    setShuckleTarget([shuckleTarget[0], true]);
				setShuckleDir(props.shuckleDir);
				changeShucklePos([shuckleDir[0] + 15, shuckleDir[1]]);
			}, 16);
		}
    });
    // -------------------------------------------------------------------------

    // can be further encapsulated
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
                     style = {{left: String(shuckleDir[1] - 31) + "px",
                               top: String(shuckleDir[0] - 31) + "px"}} 
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
		</div>
    )
}

export default ShuckleCursor;
