/*
 * ShuckleCursor.js
*/ 

//DONE*update baby shuckle position
//DONE*install baby shuckle localStorage dataType
//DONE*place HTML element for baby shuckles
//DONE*CSS the baby shuckles
//DONE*Eat poffin + offscreen + Lay egg - 1
//DONE*Create egg wobble + wobble+leap for stages of hatching - 2
//Hatch egg (three right guesses) - 2
//DONE*Fix key attacking issues - 3
//Implement baby attack - 4
//All will chase Gold - 7

import classes from "./style/ShuckleCursor.module.css";
import { useState, useReducer, useEffect} from 'react';

function ShuckleCursor(props)
{

    const focus = { MOUSE: 0,
                    ITEM:  1,
                    KEY:   2,
                    STAY:  3,
                    MOBILE: 4};
    Object.freeze(focus);

	const action = { NONPLUSSED: 0, 
                     ANGRY:      1,
                     BIRTHING:   2,
                     SHINY:      3,     // ACTIVE, no animation
                     SING:       4,
                     HAPPY:      5,
                     LAY_EGG:    6};
    Object.freeze(action);


    const haltInv = props.haltInv;
    const setHaltInv = props.setHaltInv;

    const mousePos = props.mousePos;
    const [shuckleChildren, setShuckleChildren] = useState(JSON.parse(window.localStorage.shuckleChildren));
    const [shucklePos, setShucklePos] = useState([0, 0]);

    const babyPosInit = Array(shuckleChildren.length);
    for (var i = 0; i < babyPosInit.length; i++) {
        babyPosInit[i] = [0,0];
    }
    const [babyPosList, setBabyPosList] = useState(babyPosInit);

    // behavioral info: [0] - focus, [1] - action
    const [shuckleInfo, setShuckleInfo] = useState([0,0]);

    const [targetPos, setTargetPos] = useState([0,0]); 
    const [targetReached, setTargetReached] = useState(false);
    const [babyTargetReached, setBabyTargetReached] = useState(Array(shuckleChildren.length));
    const [mobileTargetPos, setMobileTargetPos] = useState([0,0]);

    const [remainingKeys, setRemainingKeys] = 
        useState(["Backspace", "Enter"].concat(props.validKeys));  // null?
    const [selectedKey, setKey] = useState(null);
    const [keyPos, setKeyPos] = useState(null);
    const [busy, setBusy] = useState(true);
    const damageList = ["#131313", "#242424", "#303030", "#404040"];

	function isNear(a, b) 
    {
        return (Math.abs(a[0] - b[0]) < 25 && Math.abs(a[1] - b[1]) < 25);
	}

	function translateSpritePos(targPos, currPos, speed)
    {
		const [targ_x, targ_y] = [targPos[0], targPos[1]];
  		const [curr_x, curr_y] = [currPos[0], currPos[1]];

  		const xDir = Math.max(Math.min(speed * 0.01 * (targ_x - curr_x), 3.5), -3.5);
  		const yDir = Math.max(Math.min(speed * 0.01 * (targ_y - curr_y), 3.5), -3.5);

        return([xDir + curr_x, yDir + curr_y]);
	}

    function createBaby()
    {
        return {number:shuckleChildren.length,
                state:"shuckleEgg0",
                shiny:0}
    }

    // FUNCTION FUNCTION -------------------------------
    function chooseKey() 
    {
        setTargetReached(false);

        const rand = Math.floor(Math.random() * remainingKeys.length);
        const key = document.getElementById(remainingKeys[rand]);
        const keyPosition = key.getBoundingClientRect();
        console.log(keyPosition.top, keyPosition.left);

        setBusy(false);
        setHaltInv(true);
        setKey(key);
        setKeyPos([keyPosition.top, keyPosition.left]);

    }
    // -------------------------------------------------

    // USE EFFECTS -------------------------------------------------------------
    // TARGET TRACKING ----------------------------------------------

        //SHUCKLE
    useEffect(() => {
        setTimeout(() => {
            if (shuckleInfo[0] === focus.MOUSE) {  // MOUSE TRACKING
                let currPos = [mousePos[0], mousePos[1]]; 
                setTargetPos(currPos);
            }

            if (shuckleInfo[0] === focus.MOBILE) {
                let currPos = [mobileTargetPos[0], mobileTargetPos[1]];
                setTargetPos(currPos);
            }

            if (shuckleInfo[0] === focus.KEY && selectedKey !== null) {  // KEY CASE
                let currPos = [keyPos[0], keyPos[1]]
                setTargetPos(currPos);
            }

            if (shuckleInfo[0] === focus.ITEM) {
                let currPos = [props.targetInfo[1],props.targetInfo[2]];
                setTargetPos(currPos);
            }

            let pos = translateSpritePos([targetPos[0] + 15, targetPos[1]], shucklePos, 3);
            setShucklePos([pos[0], pos[1]]);

            if (shuckleInfo[0] !== focus.KEY) {
                setTargetReached(isNear(targetPos, shucklePos) || isNear(mobileTargetPos, shucklePos));
            }
            else {
                setTargetReached(isNear(keyPos, shucklePos));
            }
        }, 16);
    }, [mousePos, targetPos, shucklePos, selectedKey]);

        //BABIES
    useEffect(() => {
        setTimeout(() => {
            let currPosList = [[shucklePos[0], shucklePos[1]]];
            for (var i = 0; i < babyPosList.length; i++) {
                currPosList.push(babyPosList[i]);
            }

            let targPosList = [];
            let targReachedList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (!(isNear(babyPosList[i], currPosList[i]))) {
                    targReachedList.push(0);
                }
                else {
                    targReachedList.push(1);
                }
                targPosList.push(currPosList[i]);
            }

            let newPosList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (targReachedList[i] == 1) {
                    newPosList.push(babyPosList[i]);
                }
                else {
                    let pos = translateSpritePos([targPosList[i][0], targPosList[i][1]-32], babyPosList[i], 6);
                    newPosList.push(pos);
                }
            }

            if(shuckleInfo[1] == action.BIRTHING) {
                resolveOnceTimedOut(7000);
            }
            else {
                setBabyPosList(newPosList);                
            }
            setBabyTargetReached(targReachedList);
        }, 16);
    }, [babyPosList, shucklePos]);

    // TARGET SPECIFIC BEHAVIOR  -------------------------------------


    useEffect(() => {
        // ASYNC FUNCTIONS ---------------------------------
        const eatItem = async () => {
            await resolveOnceTimedOut(5000); 

            let currFocus = focus.MOUSE;

            if (props.realizeItem[1] === 1) {
                console.log("KEY");
                currFocus = focus.KEY;
            }

            // is there a better way to do this (ANGRY CONDITION)
            if (shuckleInfo[1] === action.ANGRY && props.realizeItem[1] !== 3) {
                console.log("RECOVER");
                setKey(null);
                setKeyPos(null);
                setShuckleInfo([currFocus, action.SING]);
            }
            else {// EVERYTHING ELSE
                setShuckleInfo([currFocus, props.realizeItem[1]]);
            }
            props.reset();
            setTargetReached(false);
        };

        console.log(targetReached, shuckleInfo, selectedKey);

        if (targetReached && shuckleInfo[0] === focus.ITEM && shuckleInfo[1] <= 1) {
            if (shuckleInfo[0] === focus.ITEM) {
                console.log("eatItem");
                eatItem();
            }
        }

    }, [targetReached, selectedKey, shuckleInfo[0]]);

    useEffect(() => {
        if (props.realizeItem[0] && selectedKey === null) {  // SET TO ITEM
            console.log("itemcase");
            setShuckleInfo([focus.ITEM, shuckleInfo[1]]);
        }
        if (shuckleInfo[0] === focus.KEY) {    // KEY FOCUS - ANGRY
            if (selectedKey === null && remainingKeys.length > 0) {
                console.log("chooseKey");
                chooseKey();
            };
            if (remainingKeys.length <= 0) {        // EXIT CASE
                console.log("exit");
                setShuckleInfo([focus.MOUSE, 0]);
                setTargetReached(false);
                setHaltInv(false);
                setBusy(false);
            };
        };
    }, [props.realizeItem[0], keyPos]);

    useEffect(() => {
        const destroy = async () =>
        {
            await resolveOnceTimedOut(5000);
            const rand = Math.floor(Math.random() * damageList.length);
            selectedKey.style.background = damageList[rand];
            selectedKey.style.pointerEvents = 'none';
            setRemainingKeys(remainingKeys.filter(k => k !== selectedKey.id));
            setTargetReached(false);
            setKey(null);
            setKeyPos(null);
        };

        if (shuckleInfo[0] === focus.KEY && targetReached && !busy) {    // KEY FOCUS - ANGRY
            setBusy(true);
            console.log("destroy");
            destroy();
        }
    }, [targetReached])

    // EMOTION-BASED BEHAVIORS ---------------------------------------
    useEffect(() => {
        const processEmotion = async () => {
            await resolveOnceTimedOut(3000);
            setMobileTargetPos([0,0]);
            setHaltInv(false);
            setShuckleInfo([focus.MOUSE, action.NONPLUSSED]);
        }

        const offscreen = async () => {
            setMobileTargetPos([300,-200]);
            setShuckleInfo([focus.MOBILE, shuckleInfo[1]]);
            await resolveOnceTimedOut(6000);
            if (shuckleInfo[1] === action.BIRTHING) {
                setShuckleInfo([shuckleInfo[0], action.LAY_EGG]);
            }
            else {
                processEmotion();
            }
        }

        const layEgg = async () => {
            const baby = createBaby();
            const newFamily = shuckleChildren.concat([baby]);
            //updates the game save (you had a baby! you wanna remember you had a baby right?)
            window.localStorage.shuckleChildren = JSON.stringify(newFamily);
            setBabyPosList([[400,-200]].concat(babyPosList));
            setShuckleChildren(newFamily);
            //brings back onscreen
            setHaltInv(false);
            setMobileTargetPos([0,0]);
            setShuckleInfo([focus.MOUSE, action.SING]);
        }

        /*
        const poop = async () => {
            //CREATE JITTERBUG
            setShuckleInfo([focus.JITTER, shuckleInfo[1]]);
            await resolveOnceTimedOut(2500);
            setShuckleInfo([focus.STAY, shuckleInfo[1]]);
            //CREATE POOPSPRITE
            setShuckleInfo([focus.MOUSE, action.SING]);
        }
        */
        /*
        const wander = async () => {
            //CREATE MYOPIABUG
            setShuckleInfo([focus.MYOPIA, shuckleInfo[1]]);
            await resolveOnceTimedOut(2500);
            if (shuckleInfo[1] === action.SICK)
                setShuckleInfo([focus.STAY, action.POOP]);
            else if (shuckleInfo[1] === action.CONFUSED)
                setShuckleInfo([focus.STAY, action.LAY_EGG]);
        }
        */

            //Change the spawn location to the opposite side of the shuckle from the average of the positions of the babies.
            /*if (shuckleChildren > 1) {
                                    
                //Find the average X and Y position of all the babies
                var babyAvgX = 0;
                var babyAvgY = 0;
                for(var i = 0; i<babyPosList.length; i++){
                    babyAvgX += babyPosList[i][0]/babyPosList.length;
                    babyAvgY += babyPosList[i][1]/babyPosList.length;
                }
                //The spawnX and spawnY equations set a location on a circle around Shuckle with a radius of spawnDist
                var spawnDist = 48;
                var spawnX = Math.sqrt(babyAvgX^2*spawnDist^2)/Math.sqrt(babyAvgX^2+babyAvgY);
                var spawnY = Math.sqrt(babyAvgY^2*spawnDist^2)/Math.sqrt(babyAvgX^2+babyAvgY);

                //Flips the spawn location 180 degrees around Shuckle from the first baby
                if (babyPosList[0][0]>0) {
                    spawnX = -spawnX;
                }
                if (babyPosList[0][1]>0) {
                    spawnY = -spawnY;
                }
            }
            else {
                spawnX = -48;
                spawnY = 0;

            }
            setBabyPosList(babyPosList+[shucklePos[0]+16+spawnX, shucklePos[1]+16+spawnY])
            */

        // move ?
        if (shuckleInfo[1] === action.NONPLUSSED) {

        }
        else if (shuckleInfo[1] === action.ANGRY) {

        }
        else if (shuckleInfo[1] === action.HAPPY) {
            processEmotion();
        }
        else if (shuckleInfo[1] === action.SING) {
            processEmotion();
        }
        else if (shuckleInfo[1] === action.CONFUSED) {
            processEmotion();
        }
        else if (shuckleInfo[1] === action.SHINY) {
            window.localStorage.shuckleShiny = "1";
        }
        else if (shuckleInfo[1] === action.SICK) {
            //wander();
        }
        else if (shuckleInfo[1] === action.POOP) {
            //poop();
        }
        else if (shuckleInfo[1] === action.BIRTHING) {
            setHaltInv(true);
            offscreen();
        }
        else if (shuckleInfo[1] === action.LAY_EGG) {
            if(props.realizeItem[0]){
                setShuckleInfo([focus.ITEM, action.NONPLUSSED]);
            } else {
                layEgg();
            }
        }

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

    function animBabies(children, posList)
    {

        //deepCopy and reverse creates the correct render order
        const revChildren = JSON.parse(JSON.stringify(children));

        var sizes = [];
        var sizeOffset = [];
        for(var i = 0; i<posList.length; i++){
            if(posList[i] == undefined){
                posList[i] = [0,0];
            }
            if(revChildren[i].state === "shuckle"){
                sizes = sizes.concat([["48px","48px"]]);
                sizeOffset = sizeOffset.concat([-8]);
            } else {
                sizes = sizes.concat([["32px","32px"]]);
                sizeOffset = sizeOffset.concat([0]);

            }
        }

        revChildren.reverse();

        

        return (
                <>
                    {revChildren.map((child) => (<img className = {classes.shuckle}
                                                      style = {{top: (posList[child.number][0] + sizeOffset[child.number]).toString() + "px",
                                                                left: (posList[child.number][1] + sizeOffset[child.number]).toString() + "px",
                                                                width: sizes[child.number][0],
                                                                height: sizes[child.number][1]}}
                                                      src = {require("../assets/" + child.state + ".gif")}
                                                      key = {child.number}/>))}
                </>
        )
    }

	return (
		<>
            {shuckleChildren.length > 0
                && ( <> { animBabies(shuckleChildren, babyPosList) } </> )}
			{window.localStorage.shuckleShiny === "0" && 
                animate("shuckle", shucklePos, [16, 32]) }
			{window.localStorage.shuckleShiny === "1" && 
                animate("shuckleShiny", shucklePos, [16, 32]) }

			{shuckleInfo[0] === focus.MOUSE && shuckleInfo[1] === action.SING
                && ( <> { animate("sing", shucklePos, [32, 26]) } </> )}
			{shuckleInfo[0] === focus.MOUSE && !(shuckleInfo[1] === action.SING)
                && targetReached 
                && ( <> { animate("love", shucklePos, [26, 26]) } </> )}
            {shuckleInfo[0] === focus.ITEM && targetReached 
                && ( <> { animate("chomp", targetPos , [31, 31]) } </> )}
            {shuckleInfo[0] === focus.KEY && shuckleInfo[1] === action.ANGRY 
                && targetReached 
                && ( <> { animate("slash", targetPos, [0, 0]) } </> )}
			
            {shuckleInfo[1] === action.ANGRY 
                && ( <> { animate("anger", shucklePos, [36, 2]) } </> )}
            {shuckleInfo[1] === action.BIRTHING
                && ( <> { animate("love", shucklePos, [26, 26])} </> )}
		</>
    )
}

export default ShuckleCursor;
