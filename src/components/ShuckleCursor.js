/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState , useEffect } from 'react';

function ShuckleCursor(props)
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
	const [shucklePos, setShucklePos] = useState([0, 0]);
	const [shuckleAction, setShuckleAction] = useState(0);
	const [shuckleTarget, setShuckleTarget] = useState(0);

    const itemEaten = props.derealizeItem; 
	const [targetPos, setTargetPos] = [props.targetPos, props.setTargetPos];
    const [targetReached, setTargetReached] = useState(false);

    const remainingKeys = new Set(props.validKeys);  // add Backspace, Enter
    const damageList = ["#131313", "#242424", "#303030", "#404040"];

    // shuckle coords are flipped for some reason
	function changeShucklePos(mousePos)
    {
		const [mouseX, mouseY] = [mousePos[1], mousePos[0]];
  		const [shuckleX, shuckleY] = [shucklePos[0], shucklePos[1]];

  		const xDir = Math.max(Math.min(0.03 * (mouseX - shuckleX), 3.5), -3.5);
  		const yDir = Math.max(Math.min(0.03 * (mouseY - shuckleY), 3.5), -3.5);

  		setShucklePos([xDir + shuckleX, yDir + shuckleY]);
	}

	function isNearTarget() 
    {
		return (Math.abs(targetPos[0] - shucklePos[1]) < 25 && 
                Math.abs(targetPos[1] - shucklePos[0]) < 25);
	}

    // set focus to key, share key elem coords w/ shuckle
    // wait for shuckle to reach key before destroying it
	async function destroyKeyboard()
    {
        console.log("destruction time!");

        while (remainingKeys.size > 0) {
            if (!(shuckleAction === 1)) break;  
            const keysArr = Array.from(remainingKeys);
            const rand = Math.floor(Math.random() * keysArr.length);

            var key = document.getElementById(keysArr[rand]);
            var keyPos = key.getBoundingClientRect();
            setTargetPos([keyPos.top, keyPos.left, 0]);
            
            await destroy(key);
            remainingKeys.delete(key.id);
        }
        console.log("destruction complete!");
    }

    /*
	const [shuckleDir, setShuckleDir] = [props.shuckleDir, props.setShuckleDir];
	const [shuckleTarget, setShuckleTarget] = useState(0);
    const [targetReached, setTargetReached] = useState(false);
    */

    function destroy(key) {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const rand = Math.floor(Math.random() * damageList.length);
                    key.style.background = damageList[rand];
                    key.style.pointerEvents = 'none';
                    resolve();
                }, 1500); 
        });
    }

	useEffect(() => {
        if (props.realizeItem) {
            props.derealize();
            console.log("just ate poffin # " + itemEaten);

        }
    });

    // --- TARGET LOCKING MECHANISM --------------------------------------------
	useEffect(() => {

        setTimeout(() => {
            let newLoc, newPos;  
            if (shuckleTarget === focus.MOUSE) {
                setTargetReached(isNearTarget());
                if (targetPos[2] === 0)
                    setShuckleTarget(focus.ITEM);
                newLoc = newPos = mousePos;
            }
            else if (shuckleTarget === focus.ITEM) {
                setTargetReached(isNearTarget());
                if (targetReached)
                    setShuckleAction(itemEaten);
                newLoc = props.targetPos;
                newPos = [targetPos[0] + 15, targetPos[1]];
            }

            else if (shuckleTarget === focus.KEY) {
                console.log("TARGET IS KEY");
            }
        
            setTargetPos(newLoc);
            changeShucklePos(newPos);
        }, 16);
    });

    // -------------------------------------------------------------------------

	useEffect(() => {
        if (shuckleAction === 0) {
            console.log("CHILLIN\'");
        }
        else if (shuckleAction === 1) {  // ANGRY
            destroyKeyboard();        
        }
    }, [shuckleAction]);


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

			{shuckleTarget === focus.MOUSE && targetReached && (
				<div>
                    <img className = {classes.love} 
                         style = {{left: String(shucklePos[0]) + "px",
                                   top: String(shucklePos[1]) + "px"}} 
                        src = {require("../assets/shuckleLove.gif")}/>
				</div>
            )}
            {shuckleTarget === focus.ITEM && targetReached && 
             shuckleAction !== action.ANGRY && (
                <div>
                <img className = {classes.chomp}
                     style = {{left: String(targetPos[1] - 31) + "px",
                               top: String(targetPos[0] - 31) + "px"}} 
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
            {shuckleAction === action.ANGRY && targetReached && (
                <div>
                <img className = {classes.slash} 
                     style = {{left: String(targetPos[1] + 2) + "px",
                               top: String(targetPos[0] + 5) + "px"}} 
                     src = {require("../assets/slash.gif")} /> 
                </div>
            )}
		</div>
    )
}

export default ShuckleCursor;
