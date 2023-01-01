/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState, useReducer, useEffect} from 'react';

function ShuckleCursor(props)
{
    const focus = { MOUSE: 0,
                    ITEM:  1,
                    KEY:   2 };
    Object.freeze(focus);

	const action = { NONPLUSSED: 0, 
                     ANGRY:      1,
                     HAPPY:      2,
                     CONFUSED:   3,
                     SURPRISED:  4,
                     SICK:       5,
                     SHINY:      6,
                     LAY_EGG:    7 };
    Object.freeze(action);

    const mousePos = props.mousePos;
    const [shucklePos, setShucklePos] = useState([0, 0]);

    // behavioral info: [0] - focus, [1] - action
    const [shuckleInfo, setShuckleInfo] = useState([0, 0]);
   
    // store targetPos info in a queue? also need to then track shuckleInfo
    // s.t. shuckle 'remembers' how to feel abt target
    // [0] - xPos, [1] - yPos.. could possibly be combined
    const [targetPos, setTargetPos] = useState([0, 0]); 
    const [targetReached, setTargetReached] = useState(false);

    // im thinking needs to remain a useState for sake of render updates
    const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));
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
            let currPos;
            if (shuckleInfo[0] === focus.MOUSE) {   // MOUSE TRACKING
                currPos = [mousePos[0], mousePos[1]]; 
                if (!(isNear(currPos, targetPos))) 
                    setTargetPos(currPos);
            }
            
            if (props.realizeItem[0]) {             // SET TO ITEM
                currPos = [props.targetInfo[1], props.targetInfo[2]];
                setShuckleInfo([focus.ITEM, shuckleInfo[1]]);
            }

            if (!targetReached) {
                let pos = changeShucklePos([targetPos[0] + 15, targetPos[1]]);
                setShucklePos([pos[0], pos[1]]);
            }
            setTargetReached(isNear(targetPos, shucklePos));
        }, 16);
    }, [mousePos, targetPos, shucklePos, targetReached]);

    // SHUCKLE BEHAVIOR MANAGER  ------------------------------------
    useEffect(() => {
        let currBehavior = [shuckleInfo[0], shuckleInfo[1]];

        // ASYNC FUNCTIONS ---------------------------------
        const eatItem = async () => {
            await resolveOnceEaten();
            props.reset();  // disappear item 

            if (props.realizeItem[1] === 1) 
                currBehavior = [focus.KEY, props.realizeItem[1]];

            setShuckleInfo([currBehavior[0], currBehavior[1]]);
        };

        const destroy = async () => {
            await resolveOnceDestroyed();
            setKey(null);
        };
        // -------------------------------------------------

        if (targetReached) {
            console.log("--- TARGET REACHED ---\n\tfocus = " + shuckleInfo[0] + 
                "\n\taction = " + shuckleInfo[1]);

            if (shuckleInfo[0] === focus.ITEM)
                eatItem();
            else if (shuckleInfo[0] === focus.KEY) {  // KEY FOCUS
                if (selectedKey === null && remainingKeys.length > 0)
                    chooseKey();
                if (!(selectedKey === null))
                    destroy();
                // EXIT CONDITION
                if (remainingKeys.length <= 0 || shuckleInfo[0] === 6)
                    setShuckleInfo([focus.MOUSE, 0]);
            }
            if (shuckleInfo[1] === 6)
                console.log("yummy lemonade :)");
        }
    }, [shuckleInfo, targetReached, remainingKeys]);

    function chooseKey() {
        setTargetReached(false);

        const rand = Math.floor(Math.random() * remainingKeys.length);
        const key = document.getElementById(remainingKeys[rand]);
        const keyPos = key.getBoundingClientRect();

        setKey(key);
        setTargetPos([keyPos.top, keyPos.left]);
    }

    // PROMISES ----------------------------------------------------------------
    function resolveOnceEaten() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    function resolveOnceDestroyed() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const rand = Math.floor(Math.random() * damageList.length);
                selectedKey.style.background = damageList[rand];
                selectedKey.style.pointerEvents = 'none';
                setRemainingKeys(remainingKeys.filter(k => k !== selectedKey.id));
                resolve();
            }, 1000); 
        });
    }

    // RENDER ------------------------------------------------------------------
    function animate(name, pos, offset) {
        return (
            <img className = {classes[name]}
                 style = {{top: (pos[0] - offset[0]) + "px", 
                           left: (pos[1] - offset[1]) + "px"}}
                 src = {require("../assets/" + name + ".gif")}/>
        )
    }

	return (
		<>
			{window.localStorage.shuckleShiny === "0" && 
                animate("shuckle", shucklePos, [0, 0]) }
			{window.localStorage.shuckleShiny === "1" && 
                animate("shuckleShiny", shucklePos, [0, 0]) }
			{shuckleInfo[0] === focus.MOUSE && targetReached && (
				<> { animate("love", shucklePos, [0, 0]) } </>
            )}
            {shuckleInfo[0] === focus.ITEM && targetReached && (
                <> { animate("chomp", targetPos , [31, 31]) } </>
            )}
			{shuckleInfo[1] === action.ANGRY && (
				<> { animate("anger", shucklePos, [0, 0]) } </>
            )}
            {shuckleInfo[0] === focus.KEY && shuckleInfo[1] === action.ANGRY && 
                targetReached && (
                <> { animate("slash", targetPos, [0, 0]) } </>
            )}
		</>
    )
}

export default ShuckleCursor;
