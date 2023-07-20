/*
 * Actions.js
*/

import focus from './Focus';
import { resolveOnceTimeOut } from '../../functions/utils';

const action = { 
    NONPLUSSED: 0, 
    ANGRY:      1,
    LAY_EGG:    2,
    SHINY:      3,     // ACTIVE, no animation
    SING:       4,
    HAPPY:      5,
};
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
    if (shuckle['action'] !== action.ANGRY)
        setShuckle({...shuckle, focus: currFocus, action: realizeItem[1]});
    else
        setShuckle({...shuckle, focus: focus.KEY});



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
*/

function layEgg(shuckle, setShuckle, babyPositions, setBabyPositions)
{
    const baby = {
        number: shuckle['children'].length,
        state: 'shuckleEgg0',
        shiny: 0,
    }; 
    const newFamily = shuckle['children'].concat([baby]);

    // updates the game save 
    // (you had a baby! you wanna remember you had a baby right?)
    let tempInfo = JSON.parse(localStorage.shuckleInfo);
    tempInfo["children"] = newFamily;
    localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));

    setBabyPositions({
        ...babyPositions,
        [baby.number]: [0, 0]
    });
    setShuckle({focus: focus.MOUSE, action: action.SING, children: newFamily});

    // brings back onscreen
    // setHaltInv(false);
    // setMobileTargetPos([0,0]);
    // setShuckle([focus.MOUSE, action.SING]);
}

function updateHatching(shuckle, setShuckle){
    const childrenn = shuckle["children"]; 

    for (let i = 0; i < childrenn.length; i++) {
        const currentState = String(childrenn[i].state);
        if (currentState.startsWith('shuckleEgg')) {
            const newState = 
                parseInt(currentState.replace('shuckleEgg', ''), 10) + 1;
            childrenn[i].state = newState < 3
                ? `shuckleEgg${newState}` : 'shuckle';
            break;
        }
    }

    // updates the game save 
    // (you had a baby! you wanna remember you had a baby right?)
    let tempInfo = JSON.parse(localStorage.shuckleInfo);
    tempInfo["children"] = childrenn;
    localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));

    setShuckle({...shuckle, children: childrenn }); 
}

export default action;
export { 
    eat, 
    process, 
    calmDown, 
    chooseKey, 
    destroy, 
    becomeSatiated, 
    layEgg, 
    updateHatching 
};
