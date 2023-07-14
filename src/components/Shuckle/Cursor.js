/*
 * Cursor.js
*/ 

import classes from "./style/Cursor.module.css";
import { useState, useEffect, useCallback } from 'react';

import { isNear, translateSprite, resolveOnceTimedOut } from '../utils';
import ShuckleAnimations from './Animations';

import focus from './Focus';
import action, { 
    eat,
    process, 
    calmDown, 
    chooseKey, 
    destroy, 
    becomeSatiated, 
    // createBaby
    goOffScreen,
} from './Actions';

const FRAME_DELAY_MS = 16;

function Cursor(props)
{
    const { mousePos, itemPos, realizeItem, reset } = props;

    const [shuckle, setShuckle] = useState({ 
        focus: 0, 
        action: 0, 
        children: 0
    });

    const [homePos, setHomePos] = useState([0, 0]);

// mobile: [0, 0],
    const [position, setPosition] = useState({
        shuckle: [0, 0],
        target: [0, 0],
        key: [0, 0],
        reached: false
    });

    const [keys, setKeys] = useState({
        selected: '',
        remaining: ['Backspace', 'Enter']
            .concat('qwertyuiopasdfghjklzxcvbnm'.split(''))
    });
    const [isDestroyingKey, setIsDestroyingKey] = useState(false);

/*
    const [shuckleChildren, setShuckleChildren] = 
        useState(JSON.parse(localStorage.shuckleInfo)["children"]);
*/

    const getTargetPosition = (
        focusType, 
        mousePos, 
        keyPos,
        itemPos,
    ) => {
        switch(focusType) {
            case focus.MOUSE:
                return mousePos;
            case focus.ITEM:
                return itemPos;
            case focus.KEY:
                return keyPos;
            default:
                return null;
        }
    }

/*
            case focus.MOBILE:
                return mobileTargetPos;
*/


    // USE EFFECTS -------------------------------------------------------------
    // SHUCKLE FOCUS
    useEffect(() => {
        if (realizeItem[0] && keys.selected === '') // !)busy)  // set to item 
            setShuckle({
                ...shuckle, 
                focus: focus.ITEM, 
                action: shuckle['action']
            });


        if (shuckle['focus'] === focus.KEY && keys.selected === '') { // !busy) {  // angry 
            if (keys['remaining'].length <= 0)
                becomeSatiated(shuckle, setShuckle, position, setPosition);
            else {
                chooseKey(position, setPosition, keys, setKeys);
            }
        }
    }, [realizeItem[0], keys.selected]); 

    // SHUCKLE MOVEMENT 
    useEffect(() => {
        requestAnimationFrame(() => {
            const currentFocusType = shuckle['focus'];
            const currPos = getTargetPosition(
                currentFocusType, 
                mousePos, 
                position.key, 
                itemPos,
            );

            if (currPos) {
                let updatedTargetPos = currPos;
                
                // check if Shuckle is near target b4 updating its position
                let isReached = isNear(updatedTargetPos, position.shuckle);
                let pos = translateSprite(updatedTargetPos, position.shuckle, 3);

                setPosition(prevPosition => ({
                  ...prevPosition,
                  shuckle: pos,
                  target: updatedTargetPos,
                  reached: isReached, // Set targetReached to true
                }));
            }
        }); 
    }, [position.reached, position.target, position.shuckle, shuckle]);

    useEffect(() => {
        const eatItem = async () => {
            await resolveOnceTimedOut(5000); 

            let currFocus = focus.MOUSE;
            if (realizeItem[1] === 1)
                currFocus = focus.KEY;

            eat(currFocus,
                realizeItem, 
                shuckle, 
                setShuckle, 
                position,
                setPosition,
                reset
            );
    
            // lemonade case
            if (shuckle['action'] === action.ANGRY && realizeItem[1] === 4)
                calmDown(
                    currFocus, 
                    shuckle, 
                    setShuckle, 
                    position, 
                    setPosition, 
                    keys, 
                    setKeys
                );
        };

        const destroyKey = async () =>
        {
            setIsDestroyingKey(true);
            await resolveOnceTimedOut(5000);
            destroy(
                position, 
                setPosition, 
                keys, 
                setKeys, 
                isDestroyingKey, 
                setIsDestroyingKey
            );

        };

        if (shuckle['focus'] === focus.ITEM) {
            if (position['reached'])
                eatItem();
        }
        else if (shuckle['focus'] === focus.KEY) {
            if (position['reached'] && keys['selected'] !== '' && 
                !isDestroyingKey)
                destroyKey();
        }
    }, [position.reached, keys.selected, shuckle]); //, busy]);

    // EMOTION PROCESSING 
    useEffect(() => {
        const processEmotion = async () => {
            await resolveOnceTimedOut(3000);
            process(shuckle, setShuckle);
        }

        switch (shuckle['action']) {
            case action.HAPPY:
            case action.SING:
            case action.CONFUSED:
                processEmotion();
                break;
            case action.SHINY:
                let tempInfo = JSON.parse(localStorage.shuckleInfo);
                tempInfo['shiny'] = true;
                localStorage.setItem('shuckleInfo', JSON.stringify(tempInfo));
                break;
            case action.ANGRY:
            case action.NONPLUSSED:
            default:
                break;
        }
    }, [shuckle['action']]);

    // RENDER ------------------------------------------------------------------
	return (
        <ShuckleAnimations
            focus={focus}
            shuckle={shuckle}
            shucklePos={position['shuckle']}
            targetPos={position['target']}
            targetReached={position['reached']}
        />
    );
}

export default Cursor;

/*
    useEffect(() => {
        console.log('hello');

        let isReached = isNear(position['shuckle'], mousePos);
        console.log('isReached (???) - ' + isReached);

        if (shuckle['focus'] === focus.MOUSE && 
            !(isNear(position['shuckle'], mousePos))) {
                console.log('anyone there?');

                setPosition(prevPosition => ({
                  ...prevPosition,
                  targetReached: false, // Set targetReached to true
                }));
        }
    }, [mousePos, position['key'], shuckle]);


            case action.BIRTHING:
                goOffScreen(shuckle, setShuckle, position, setPosition);

function createBaby()
{
    return {number: shuckleChildren.length,
            state:  "shuckleEgg0",
            shiny:  0}
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

*/
