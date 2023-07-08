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

    const [haltInv, setHaltInv] = useState(false);

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
        let tempInv = JSON.parse(localStorage.inventory);
        const itemCount = tempInv[`${item}`];
        if (itemCount > 0) {
            tempInv[`${item}`] = itemCount - 1;
            localStorage.setItem("inventory", JSON.stringify(tempInv));
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
                return items[i].props.id;
            }
        }
    }

    return (
        <>
            <Inventory
                itemInfo = {itemInfo} 
                setItemInfo = {setItemInfo}
                haltInv = {haltInv}
                setHaltInv = {setHaltInv}
                realize = {realize} 
            />
            <ShuckleCursor keyDownHandler = {props.keyDownHandler}
                mousePos = {mousePos}
                targetInfo = {itemInfo}
                realizeItem = {realizeItem}
                haltInv = {haltInv}
                setHaltInv = {setHaltInv}
                reset = {reset} 
            />
        </>
    )
}

export default ShuckleMechanics;
