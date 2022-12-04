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
	const [shuckleTarget, setShuckleTarget] = useState(0);
	const [shuckleAction, setShuckleAction] = useState(0);

    const itemDerealized = props.derealizeItem;
	const [targetPos, setTargetPos] = [props.targetPos, props.setTargetPos];
    const [targetReached, setTargetReached] = useState(false);

    const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));
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
	useEffect(() => { 
        if (props.realizeItem) props.derealize();

        const eatItem = async () => {
            await resolveOnceEaten();
            props.reset();  // disappear selectedItem
        };
        
        setTimeout(() => {
            setTargetReached(isNearTarget());

            if (targetReached && shuckleTarget === focus.ITEM) {
                console.log("TARGET REACHED");
                eatItem(); 
            }
            if (shuckleTarget === focus.KEY) {
                if (targetReached)
                    console.log("THED");
            }
            let newLoc = targetPos;
            let newPos = [targetPos[0] + 15, targetPos[1]];

            if (shuckleTarget === focus.MOUSE) {
                if (targetPos[2] === 0)
                    setShuckleTarget(focus.ITEM);
                newLoc = newPos = mousePos;
            }

            setTargetPos(newLoc);
            changeShucklePos(newPos);
        }, 16);
    });

    useEffect(() => {
        let key;
        const destroyy = async () => {
            await destroy(key);
            console.log("i hate this");
        };

        if (shuckleAction === 1) {
            key = chooseKey();
            console.log(key + " <- key");    
            // destroyy();
        }
    }, [shuckleAction, remainingKeys]);

    function chooseKey() {
        const rand = Math.floor(Math.random() * remainingKeys.length);

        const keyy = document.getElementById(remainingKeys[rand]);
        const keyyPos = keyy.getBoundingClientRect();

        setTargetPos([keyyPos.top, keyyPos.left, 0]);
        return keyy;
    }

    // PROMISES ----------------------------------------------------------------
    function resolveOnceEaten() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    function destroy(key) {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const rand = Math.floor(Math.random() * damageList.length);
                    key.style.background = damageList[rand];
                    key.style.pointerEvents = 'none';
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

			{shuckleTarget === focus.MOUSE && targetReached && (
				<> { animate("love", shucklePos, [0, 0]) } </>
            )}
            {shuckleTarget === focus.ITEM && targetReached && 
             shuckleAction !== action.ANGRY && (
                <> { animate("chomp", targetPos, [31, 31]) } </>
            )}
			{shuckleAction === action.ANGRY && (
				<> { animate("anger", shucklePos, [0, 0]) } </>
            )}
            {shuckleAction === action.ANGRY && targetReached && (
                <> { animate("slash", targetPos, [0, 0]) } </>
            )}
		</>
    )
}

export default ShuckleCursor;
