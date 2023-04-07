/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState, useReducer, useEffect} from 'react';

function ShuckleCursor(props)
{

    const focus = { MOUSE: 0,
                    ITEM:  1};
    Object.freeze(focus);

	const action = { NONPLUSSED: 0, 
                     ANGRY:      1,
                     HAPPY:      2,
                     SING:       3,
                     CONFUSED:   4,     // UNIMPLEMENTED
                     SURPRISED:  5,     // UNIMPLEMENTED
                     SHINY:      6,     // UNIMPLEMENTED
                     SICK:       7,     // UNIMPLEMENTED
                     LAY_EGG:    8 };   // UNIMPLEMENTED
    Object.freeze(action);

    const mousePos = props.mousePos;
    const [shucklePos, setShucklePos] = useState([0, 0]);

    // behavioral info: [0] - focus, [1] - action
    const [shuckleInfo, setShuckleInfo] = useState([0, 0]);

    const [targetPos, setTargetPos] = useState([0, 0]); 
    const [targetReached, setTargetReached] = useState(false);

    const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));  // null?
    const [selectedKey, setKey] = useState(null);
    const damageList = ["#131313", "#242424", "#303030", "#404040"];

	function isNear(a, b) 
    {
        return (Math.abs(a[0] - b[0]) < 25 && Math.abs(a[1] - b[1]) < 25);
	}

	function changeShucklePos(mousePos)
    {
		const [mouse_x, mouse_y] = [mousePos[0], mousePos[1]];
  		const [shuckle_x, shuckle_y] = [shucklePos[0], shucklePos[1]];

  		const xDir = Math.max(Math.min(0.03 * (mouse_x - shuckle_x), 3.5), -3.5);
  		const yDir = Math.max(Math.min(0.03 * (mouse_y - shuckle_y), 3.5), -3.5);

        return([xDir + shuckle_x, yDir + shuckle_y]);
	}

    // USE EFFECTS -------------------------------------------------------------
    // TARGET TRACKING ----------------------------------------------
    useEffect(() => {
        setTimeout(() => {
            if (shuckleInfo[0] === focus.MOUSE) {   // MOUSE TRACKING
                let currPos = [mousePos[0], mousePos[1]]; 
                if (!(isNear(currPos, targetPos))) 
                    setTargetPos(currPos);
            }

            if (props.realizeItem[0]) {             // SET TO ITEM
                setShuckleInfo([focus.ITEM, shuckleInfo[1]]);
            }

            if (!targetReached) {
                let pos = changeShucklePos([targetPos[0] + 15, targetPos[1]]);
                setShucklePos([pos[0], pos[1]]);
            }

            setTargetReached(isNear(targetPos, shucklePos));
        }, 16);
    }, [shucklePos, mousePos]);

    // TARGET SPECIFIC BEHAVIOR  -------------------------------------
    useEffect(() => {
        // ASYNC FUNCTIONS ---------------------------------
        const eatItem = async () => {
            await resolveOnceTimedOut(5000); 

            let currFocus = focus.MOUSE;
            setShuckleInfo([currFocus, props.realizeItem[1]]);
            console.log("ATE ITEM - " + props.realizeItem[1]);

            props.reset(); 
        };

        const destroy = async () => {
            await resolveOnceDestroyed();
            setKey(null);
        };

        if (targetReached) {
            if (shuckleInfo[0] === focus.ITEM) 
                eatItem();
        }
    }, [shuckleInfo, targetReached]);

    // EMOTION-BASED BEHAVIORS ---------------------------------------
    useEffect(() => {
        const processEmotion = async () => {
            await resolveOnceTimedOut(2500);
            setShuckleInfo([focus.MOUSE, action.NONPLUSSED]);
        }

        processEmotion();
        if (shuckleInfo[1] === action.SHINY)
            window.localStorage.shuckleShiny = "1";
    }, [shuckleInfo[1]]);

    // PROMISES ----------------------------------------------------------------
    function resolveOnceTimedOut(ms) 
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    function resolveOnceDestroyed() 
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const rand = Math.floor(Math.random() * damageList.length);
                selectedKey.style.background = damageList[rand];
                selectedKey.style.pointerEvents = 'none';
                setRemainingKeys(remainingKeys.filter(k => k !== selectedKey.id));
                resolve();
            }, 5000); 
        });
    }

    // RENDER ------------------------------------------------------------------
    function animate(name, pos, offset) 
    {
        return (
            <img className = {classes[name]}
                 style = {{top: (pos[0] - offset[0]) + "px", 
                           left: (pos[1] - offset[1]) + "px"}}
                 src = {require("../assets/" + name + ".gif")}/>
        )
    }

/*
			{window.localStorage.shuckleShiny === "1" && 
                animate("shuckleShiny", shucklePos, [25, 10]) }
*/

	return (
		<>
			{window.localStorage.shuckleShiny === "0" && 
                animate("shuckle", shucklePos, [25, 10]) }

			{shuckleInfo[0] === focus.MOUSE && shuckleInfo[1] === action.SING
                && ( <> { animate("sing", shucklePos, [40, 5]) } </> )}
			{shuckleInfo[0] === focus.MOUSE && !(shuckleInfo[1] === action.SING)
                && targetReached 
                && ( <> { animate("love", shucklePos, [35, 5]) } </> )}
            {shuckleInfo[0] === focus.ITEM && targetReached 
                && ( <> { animate("chomp", targetPos , [31, 31]) } </> )}
			{shuckleInfo[1] === action.ANGRY 
                && ( <> { animate("anger", shucklePos, [45, -20]) } </> )}
            {shuckleInfo[0] === focus.KEY && shuckleInfo[1] === action.ANGRY 
                && targetReached 
                && ( <> { animate("slash", targetPos, [0, 0]) } </> )}
		</>
    )
}

export default ShuckleCursor;
