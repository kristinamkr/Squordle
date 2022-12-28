/*
 * ShuckleCursor.js
*/ 

import classes from "./style/ShuckleCursor.module.css";
import { useState , useEffect } from 'react';

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
	const [shuckleFocus, setShuckleFocus] = useState(0);
	const [shuckleAction, setShuckleAction] = useState(0);

    const [targetPos, setTargetPos] = useState([mousePos[0], mousePos[1]]);
    const itemDerealized = props.derealizeItem;
    const [targetReached, setTargetReached] = useState(false);

    const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));
    const [selectKey, setKey] = useState(null);
    const damageList = ["#131313", "#242424", "#303030", "#404040"];

	function isNearTarget() 
    {
		return (Math.abs(targetPos[0] - shucklePos[0]) < 25 && 
                Math.abs(targetPos[1] - shucklePos[1]) < 25);
	}

	function changeShucklePos(mousePos)
    {
		const [mouse_x, mouse_y] = [mousePos[0], mousePos[1]];
  		const [shuckle_x, shuckle_y] = [shucklePos[0], shucklePos[1]];

  		const xDir = Math.max(Math.min(0.03 * (mouse_x - shuckle_x), 3.5), -3.5);
  		const yDir = Math.max(Math.min(0.03 * (mouse_y - shuckle_y), 3.5), -3.5);

        setShucklePos([xDir + shuckle_x, yDir + shuckle_y]);
	}

    // USE EFFECTS -------------------------------------------------------------
    // necessary for properly updating shuckle's new interest
	useEffect(() => { 
        if (props.realizeItem) props.derealize();

        setTimeout(() => {
            if (shuckleFocus === focus.MOUSE)
                setTargetPos([mousePos[0], mousePos[1]]);

            if (shuckleFocus === focus.KEY) {
                if (selectKey === null && remainingKeys.length > 0)
                    chooseKey();
            }

            if (!(shuckleFocus === focus.ITEM)) {
                if (props.targetPos[2] === 0) {
                    setShuckleFocus(focus.ITEM);
                    setTargetPos(props.targetPos);
                }
            }
             
            setTargetReached(isNearTarget());
            changeShucklePos([targetPos[0] + 15, targetPos[1]]);
        }, 16);
    }, [shucklePos]);

    useEffect(() => {
        const eatItem = async () => {
            await resolveOnceEaten();
            props.reset();  // disappear item 
            setShuckleAction(props.derealizeItem);

            if (props.derealizeItem === 1)
                setShuckleFocus(focus.KEY);
            setTargetReached(false);
        };

        const destroy = async () => {
            await resolveOnceDestroyed(); 
        };

        if (targetReached) {
            if (shuckleFocus === focus.ITEM)
                eatItem();
            if (shuckleFocus === focus.KEY) {
                if (!(selectKey === null))
                     destroy();
            }
        }
    }, [targetReached]);

    function chooseKey() {
        const rand = Math.floor(Math.random() * remainingKeys.length);

        const key = document.getElementById(remainingKeys[rand]);
        const keyPos = key.getBoundingClientRect();

        setTargetPos([keyPos.top, keyPos.left]); // zero ? ? ?
        setKey(key);
    }

    // PROMISES ----------------------------------------------------------------
    function resolveOnceEaten() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 5000);
        });
    }

    function resolveOnceDestroyed() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const rand = Math.floor(Math.random() * damageList.length);
                selectKey.style.background = damageList[rand];
                selectKey.style.pointerEvents = 'none';
                setRemainingKeys(remainingKeys.filter(k => k !== selectKey.id));

                resolve();
            }, 5000); 
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

			{shuckleFocus === focus.MOUSE && targetReached && (
				<> { animate("love", shucklePos, [0, 0]) } </>
            )}
            {shuckleFocus === focus.ITEM && targetReached && (
                <> { animate("chomp", targetPos, [31, 31]) } </>
            )}
			{shuckleAction === action.ANGRY && (
				<> { animate("anger", shucklePos, [0, 0]) } </>
            )}
            {shuckleFocus === focus.KEY && shuckleAction === action.ANGRY && targetReached && (
                <> { animate("slash", targetPos, [0, 0]) } </>
            )}
		</>
    )
}

export default ShuckleCursor;
