/*
 * Baby.js
*/

// remove array
// idk
import classes from './style/Baby.module.css';

import { useState, useEffect} from 'react';

function Baby(props)
{
    const [pos, setPos] = useState([0, 0]);

    const [target, setTarget] = useState({
        sibling: [0, 0],
        reached: false
    });

/*
    //BABIES
    useEffect(() => {
        setTimeout(() => {
                // check if Shuckle is near target b4 updating its position
                let isReached = isNear(pos, targetPos);
                translateSprite(updatedTargetPos, position.shuckle, 3);

                setPosition(prevPosition => ({
                  ...prevPosition,
                  shuckle: pos,
                  target: updatedTargetPos,
                  reached: isReached, // Set targetReached to true
                }));
        }, FRAME_DELAY_MS);
    }, [reached, pos]);
*/

    function animate(pos, offset) 
    {
        return (
            <img className = {classes.baby}
                 style = {{top: (pos[0] - offset[0]) + 'px', 
                           left: (pos[1] - offset[1]) + 'px'}}
                 src = {require('../../assets/shuckleEgg0.gif')}/>
        )
    }

    return (
        <>
            animate(pos, [16, 32])}
        </>
    )

/*
    return (
        <>
            { revChildren.map((child) => (<img className = {classes.shuckle}
                  style = {{top: (posList[child.number][0] + 
                                  sizeOffset[child.number]).toString() + "px",
                            left: (posList[child.number][1] + 
                                  sizeOffset[child.number]).toString() + "px",
                            width: sizes[child.number][0],
                            height: sizes[child.number][1]}}
                  src = {require("../assets/" + child.state + ".gif")}
                  key = {child.number}/>))}
        </>
    )
*/
}

export default Baby;

/*
    useEffect(() => {
        setTimeout(() => {
            let currPos = [pos[0], pos[1]];

            let targPosList = [];
            let targReachedList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (!(isNear(babyPosList[i], currPosList[i])))
                    targReachedList.push(0);
                else
                    targReachedList.push(1);
                targPosList.push(currPosList[i]);
            }

            let newPosList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (targReachedList[i] == 1)
                    newPosList.push(babyPosList[i]);
                else {
                    let pos = translateSpritePos([targPosList[i][0], 
                                                  targPosList[i][1]-32], 
                                                 babyPosList[i], 
                                                 6);
                    newPosList.push(pos);
                }
            }

            if(shuckleInfo[1] == action.BIRTHING)
                resolveOnceTimedOut(7000);
            else
                setBabyPosList(newPosList);                
            setBabyTargetReached(targReachedList);
        }, 16);
    }, [babyPosList, shucklePos]);


    function animBabies(children, posList)
    {
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

*/
