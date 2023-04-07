/*
 * ShuckleMechanics.js
*/

import items from './Items.js';
import Inventory from './Inventory.js';
import ShuckleCursor from './ShuckleCursor.js';
import { useState, useReducer, useEffect} from 'react';

function ShuckleMechanics(props)
{
    // MOUSE EVENTS ------------------------------------------------------------
    const [mousePos, setMousePos] = useState([0, 0]);

    const changeMousePos = (e) => { 
        setMousePos([e.pageY, e.pageX]);
    };

    useEffect(() => {
        document.addEventListener("mousemove", changeMousePos);
        return () => document.removeEventListener("mousemove", changeMousePos);
    });
    // -------------------------------------------------------------------------

    // [0] - itemName, [1] - xPos, [2] - yPos, [3] - isMoving?
    const [itemInfo, setItemInfo] = useState(['', 0, 0, -1]);

    // [0] - itemRealized?, [1] - realizedItemNum
    const [realizeItem, setRealizeItem] = useState([false, -1]); 

    useEffect(() => {       
        setTimeout(() => {
            if (itemInfo[0] && !(realizeItem[0])) {
                setItemInfo([itemInfo[0], 
                            mousePos[0],    
                            mousePos[1], 
                            1]);  // poffin moving
            }
        }, 16);
    }, [itemInfo]);

    function realize(item)
    {
        const itemCount = localStorage.getItem(item);
        if (itemCount > 0) {
            localStorage.setItem(itemInfo[0], Number(itemCount) - 1);
            setRealizeItem([true, Number(getPoffinId(itemInfo[0]))]);
            derealize();
        }
    }
    
    function derealize()
    {
        setItemInfo([itemInfo[0], 
                     itemInfo[1], 
                     itemInfo[2], 
                     0]); 
    }

    function reset() {
        setItemInfo(['', ...itemInfo]); 
        setRealizeItem(false, -1);
    }

    function getPoffinId(name)
    {
        for (let i = 0; i < items.length; i++) {
            if (items[i].props.name === name) {
                console.log("item id - " + items[i].props.id); 
                return items[i].props.id;
            }
        }
    }

    return (
        <>
            <Inventory mousePos = {mousePos}
                           itemInfo = {itemInfo} 
                           setItemInfo = {setItemInfo}
                           realize = {realize} />
            <ShuckleCursor keyDownHandler = {props.keyDownHandler}
                           validKeys = {props.validKeys}
                           mousePos = {mousePos}
                           targetInfo = {itemInfo}
                           realizeItem = {realizeItem}
                           reset = {reset} />
        </>
    )
}

export default ShuckleMechanics;
