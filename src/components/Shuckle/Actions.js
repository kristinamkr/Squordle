/*
 * Actions.js
*/

import focus from './Focus';
import { resolveOnceTimeOut } from '../utils';
// import { useState } from 'react';

const action = { 
    NONPLUSSED: 0, 
    ANGRY:      1,
    BIRTHING:   2,
    SHINY:      3,     // ACTIVE, no animation
    SING:       4,
    HAPPY:      5,
    LAY_EGG:    6};
Object.freeze(action);

const damageList = ["#131313", "#242424", "#303030", "#404040"];

// ACTION FUNCTIONS --------------------------------------------------------
function eat(
    currFocus, 
    realizeItem, 
    shuckle, 
    setShuckle, 
    position, 
    setPosition, 
    reset
) {
    setShuckle({...shuckle, focus: currFocus, action: realizeItem[1]});
    reset(); 
    setPosition({...position, reached: false});
}

function chooseKey(position, setPosition, keys, setKeys) 
{
    if (keys['selected'] !== '')
        return;

    const rand = Math.floor(Math.random() * keys['remaining'].length);
    const keyId = keys['remaining'][rand]; 
    const key = document.getElementById(keyId);
    const keyPosition = key.getBoundingClientRect();

    setKeys({
        ...keys, 
        selected: keyId,
    });

    setPosition({
        ...position, 
        key: [keyPosition.top, keyPosition.left], 
        reached: false
    });
}

function destroy(
    position, 
    setPosition, 
    keys, 
    setKeys, 
    isDestroyingKey, 
    setIsDestroyingKey
) {
    if (isDestroyingKey || keys['selected'] === '')
        return; 

    const key = document.getElementById(keys['selected']);
    const rand = Math.floor(Math.random() * damageList.length);
    key.style.background = damageList[rand];
    key.style.pointerEvents = 'none';
    const nuKeys = keys.remaining.filter(k => k !== keys['selected']);

    setKeys({
        selected: '',
        remaining: nuKeys
    });

    setPosition({
        ...position,
        key: [0, 0],
    }); 

    setIsDestroyingKey(false);
}

function process(shuckle, setShuckle) // position, setPosition)
{
    // setMobileTargetPos([0,0]);
    // setHaltInv(false);
    setShuckle({...shuckle, focus: focus.MOUSE, action: action.NONPLUSSED});
}

function calmDown(
    currFocus, 
    shuckle, 
    setShuckle, 
    position, 
    setPosition, 
    keys, 
    setKeys
) {
    setKeys({...keys, selected: ''});
    setPosition({...position, key: [0, 0], reached: false});
    setShuckle({...shuckle, focus: currFocus, action: action.SING});
}

function becomeSatiated(shuckle, setShuckle, position, setPosition)
{
    setShuckle({...shuckle, focus: focus.MOUSE, action: action.NONPLUSSED});
    setPosition({...position, reached: false});
    // setHaltInv(false);
    // setBusy(false);
}

/*
function createBaby(shuckle, setShuckle)
{
    let babyCount = shuckle['children'];
    setShuckle({...shuckle, children: babyCount + 1});
    return {number: babyCount,
            state:  "shuckleEgg0",
            shiny:  0}
}

function layEgg()
{ 
    const baby = createBaby();
    // const newFamily = shuckleChildren.concat([baby]);

    // updates the game save 
    // (you had a baby! you wanna remember you had a baby right?)
    let tempInfo = JSON.parse(localStorage.shuckleInfo);
    tempInfo["children"] = newFamily;
    localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));

    setBabyPosList([[400,-200]].concat(babyPosList));
    setShuckleChildren(newFamily);

    //brings back onscreen
    // setHaltInv(false);
    // setMobileTargetPos([0,0]);
    setShuckleInfo([focus.MOUSE, action.SING]);
}

function goOffScreen(position, setPosition)
{
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    console.log('wWidth - '+windowWidth+'\nwHeight - '+windowHeight);

    const topLeft = [0, 0];
    const topRight = [windowWidth, 0];
    const bottomLeft = [0, windowHeight];
    const bottomRight = [windowWidth, windowHeight];

    let distW = Math.min
        (position['shuckle'][0], windowWidth - position['shuckle'][0]);
    let distH = Math.min
        (position['shuckle'][1], windowHeight - position['shuckle'][1]);
    let minDist = distW > distH ? 
        [position['shuckle'][0], distH] : [distW, position['shuckle'][1]];

    console.log("HOME = " + minDist);

    setPosition({...position, home: minDist, reached: false}); 
//    setMobileTargetPos([300,-200]);
//    setShuckleInfo([focus.MOBILE, shuckleInfo[1]]);


//    setShuckle([shuckleInfo[0], action.LAY_EGG]);

//    await resolveOnceTimedOut(6000);
/*
    console.log('shuckle leaving...');
    setShuckle({...shuckle, focus: focus.HOME, action: action.LAY_EGG});
    setPosition({
        ...position, 
        reached: false
    });
*/
// }

export default action;
export { eat, process, calmDown, chooseKey, destroy, becomeSatiated };
