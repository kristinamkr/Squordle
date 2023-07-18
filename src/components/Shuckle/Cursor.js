/*
 * Cursor.js
*/ 

import classes from "./style/Cursor.module.css";

import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../Squordle';

import { isNear, translateSprite, resolveOnceTimedOut } from '../../functions/utils';
import ShuckleAnimations from './Animations';

import focus from './Focus';
import action, { 
    eat,
    process, 
    calmDown, 
    chooseKey, 
    destroy, 
    becomeSatiated, 
    layEgg,
    updateHatching,
} from './Actions';

const FRAME_DELAY_MS = 16;

function Cursor(props)
{
    const { isGameOver } = useContext(GameContext); 

    const { mousePos, itemPos, realizeItem, reset } = props;

    const [shuckle, setShuckle] = useState({ 
        focus: 0, 
        action: 0, 
        children: JSON.parse(localStorage.shuckleInfo)['children'],
    });

    const [position, setPosition] = useState({
        shuckle: [0, 0],
        home: [0, 0],
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

    const babyPosInit = 
        Array.from({ length: shuckle['children'].length }, () => [0, 0]);
    const [babyPositions, setBabyPositions] = useState(babyPosInit);

    const [babyTargetReached, setBabyTargetReached] = 
        useState(Array(shuckle['children'].length));

    const getTargetPosition = (
        focusType, 
        mousePos, 
        keyPos,
        itemPos,
        homePos,
    ) => {
        switch(focusType) {
            case focus.MOUSE:
                return mousePos;
            case focus.ITEM:
                return itemPos;
            case focus.KEY:
                return keyPos;
            case focus.HOME:
                return homePos;
            default:
                return null;
        }
    }

    // USE EFFECTS -------------------------------------------------------------
    useEffect(() => {
        if (isGameOver[1] === 'win')
            updateHatching(shuckle, setShuckle);
    }, [isGameOver[1]]); 


    
    // SHUCKLE FOCUS
    useEffect(() => {
        if (realizeItem[0] && keys.selected === '')  // set to item 
            setShuckle({
                ...shuckle, 
                focus: focus.ITEM, 
                action: shuckle['action']
            });

        if (shuckle['focus'] === focus.KEY && keys.selected === '') {  // angry 
            if (keys['remaining'].length <= 0)
                becomeSatiated(shuckle, setShuckle, position, setPosition);
            else
                chooseKey(position, setPosition, keys, setKeys);
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
                position.home,
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
                  reached: isReached,
                }));
            }
        }); 
    }, [position.reached, position.target, position.shuckle, shuckle]);

    // BABY MOVEMENTS (IF APPLICABLE)
    useEffect(() => {
        if (babyPositions.length === 0) return;

        requestAnimationFrame(() => {
            let babyPositionsList = Object.values(babyPositions);
            let currPositions = [position['shuckle'], ...babyPositionsList];
            let newPositions = [];
            let targetsReached = [];

            for (let i = 0; i < currPositions.length; i++) {
                const isReached = isNear(babyPositions[i], currPositions[i]);
                targetsReached.push(isReached ? 1 : 0);
                const pos = isReached 
                    ? babyPositions[i] 
                    : translateSprite(
                        [currPositions[i][0], currPositions[i][1] - 32],
                        babyPositions[i],
                        6
                      );
                newPositions.push(pos);
            }

            setBabyPositions(newPositions);
            setBabyTargetReached(targetsReached);
        }); 
    }, [babyPositions, position['shuckle']]);

    useEffect(() => {
        const eatItem = async () => {
            await resolveOnceTimedOut(5000); 

            let currFocus = focus.MOUSE;
            if (realizeItem[1] === 1)
                currFocus = focus.KEY;
            /*
            else if (realizeItem[1] === 2)
                currFocus = focus.HOME;
            */

            eat(currFocus,
                realizeItem, 
                shuckle, 
                setShuckle, 
                position,
                setPosition,
                reset
            );
    
            // lemonade case
            if (shuckle['action'] === action.ANGRY && realizeItem[1] === 4) {
                calmDown(
                    currFocus, 
                    shuckle, 
                    setShuckle, 
                    position, 
                    setPosition, 
                    keys, 
                    setKeys
                );
            }
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
    }, [position.reached, keys.selected, shuckle]);

    // EMOTION PROCESSING 
    useEffect(() => {
        const processEmotion = async () => {
            await resolveOnceTimedOut(3000);
            process(shuckle, setShuckle);
        }

        switch (shuckle['action']) {
            case action.LAY_EGG:
                layEgg(shuckle, setShuckle, babyPositions, setBabyPositions);
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
            babyPositions={babyPositions}
        />
    );
}

export default Cursor;
