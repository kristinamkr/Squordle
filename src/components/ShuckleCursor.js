/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";

import action from './ShuckleActions.js';
import useTowardItem from './useTowardItem.js';

import { useState, useEffect, useCallback } from 'react';

const FRAME_DELAY_MS = 16;

function ShuckleCursor(props)
{
    const focus = { MOUSE: 0,
                    ITEM:  1,
                    KEY:   2,
                    STAY:  3,
                    MOBILE: 4};
    Object.freeze(focus);

    const mousePos = props.mousePos;
    // const targetInfo = props.targetInfo;
    const realizeItem = props.realizeItem;
    const reset = props.reset;

    // behavioral info: [0] - focus, [1] - action
    const [shuckleInfo, setShuckleInfo] = useState([0,0]);
    const [shucklePos, setShucklePos] = useState([0, 0]);

    const [targetPos, setTargetPos] = useState([0,0]); 
    const [mobileTargetPos, setMobileTargetPos] = useState([0,0]);
    const [targetReached, setTargetReached] = useState(false);

    const [selectedKey, setKey] = useState(null);
    const [keyPos, setKeyPos] = useState(null);
    const [remainingKeys, setRemainingKeys] = useState(["Backspace", "Enter"]
        .concat("qwertyuiopasdfghjklzxcvbnm".split(''))); 
    const damageList = ["#131313", "#242424", "#303030", "#404040"];

    const isNear = useCallback((a, b) => { 
        const distance = (a, b) => Math.abs(a - b);
        return a && (distance(a[0], b[0]) < 25 && distance(a[1], b[1]) < 25);
    }, []);

//        targetInfo
//            case focus.ITEM:
//                return [targetInfo[1], targetInfo[2]];

    const getTargetPosition = (
        focusType, 
        mousePos, 
        mobileTargetPos, 
        keyPos
    ) => {
        switch(focusType) {
            case focus.MOUSE:
                return mousePos;
            case focus.MOBILE:
                return mobileTargetPos;
            case focus.KEY:
                return keyPos;
            default:
                return null;
        }
    }

	function translateSpritePos(tPos, currPos, speed)
    {
		const [t_x, t_y] = [tPos[0], tPos[1]];
  		const [curr_x, curr_y] = [currPos[0], currPos[1]];

  		const xDir = Math.max
            (Math.min(speed * 0.01 * (t_x - curr_x), 3.5), -3.5);
  		const yDir = Math.max
            (Math.min(speed * 0.01 * (t_y - curr_y), 3.5), -3.5);

        return([xDir + curr_x, yDir + curr_y]);
	}

    useEffect(() => {
        if (targetReached && 
            shuckleInfo[0] === focus.MOUSE && !(isNear(shucklePos, mousePos))) {
            setTargetReached(false);
        }
    }, [mousePos]);
    

    // USE EFFECTS -------------------------------------------------------------
    useEffect(() => {
        if (!targetReached) {
        setTimeout(() => {
            const currentFocusType = shuckleInfo[0];
            const currPos = getTargetPosition(
                currentFocusType, 
                mousePos, 
                mobileTargetPos, 
                keyPos // , 
                // targetInfo
            );

            // console.log("TARGET INFO - " + targetInfo[0] + " ? " + targetInfo[1]);

            if (currPos)
                setTargetPos(currPos);

            setShucklePos(prevPos => {
                const pos = translateSpritePos(
                    [currPos[0] + 15, currPos[1]], prevPos, 3);
                return [pos[0], pos[1]];
            });

            if (currentFocusType === focus.MOUSE)
                setTargetReached(isNear(targetPos, shucklePos));
/*
            setTargetReached(prevPos => {
                const checkPosition = currentFocusType === 
                    focus.KEY ? keyPos : mobileTargetPos;
                return isNear(currPos, prevPos) || 
                    isNear(checkPosition, prevPos);
            });
*/
        }, FRAME_DELAY_MS);
        }
    }, [targetReached, targetPos, shucklePos]); // mousePos, shucklePos]);

    // PROMISES ----------------------------------------------------------------
    function resolveOnceTimedOut(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms)); 
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

	return (
		<>
			{!(JSON.parse(localStorage.shuckleInfo)["shiny"]) && 
                animate("shuckle", shucklePos, [16, 32])}
			{JSON.parse(localStorage.shuckleInfo)["shiny"] && 
                animate("shuckleShiny", shucklePos, [16, 32])}

			{shuckleInfo[0] === focus.MOUSE && shuckleInfo[1] === action.SING
                && animate("sing", shucklePos, [32, 26])}
			{shuckleInfo[0] === focus.MOUSE && !(shuckleInfo[1] === action.SING)
                && targetReached 
                && animate("love", shucklePos, [26, 26])}
            {shuckleInfo[0] === focus.ITEM && targetReached 
                && animate("chomp", targetPos , [31, 31])}
            {shuckleInfo[0] === focus.KEY && shuckleInfo[1] === action.ANGRY 
                && targetReached 
                && animate("slash", targetPos, [0, 0])}
			
            {shuckleInfo[1] === action.ANGRY 
                && animate("anger", shucklePos, [36, 2])}
            {shuckleInfo[1] === action.BIRTHING
                && animate("love", shucklePos, [26, 26])}
		</>
    )
}

export default ShuckleCursor;
