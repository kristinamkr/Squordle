/*
 * ShuckleMechanics.js
*/

import itemsData from './ItemData.js';
import Inventory from './Inventory.js';
import Cursor from './Shuckle/Cursor.js';

import { useState, useEffect} from 'react';

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

    const [item, setItem] = useState('');
    // [0] - itemName, [1] - xPos, [2] - yPos, [3] - isMoving?
    const [itemInfo, setItemInfo] = useState([0, 0, -1]);
    // [0] - itemRealized?, [1] - realizedItemNum
    const [realizeItem, setRealizeItem] = useState([false, -1]); 

    useEffect(() => {
        setTimeout(() => {
            if (item && !(realizeItem[0])) {
                setItemInfo([mousePos[0], mousePos[1], 1]);
                // console.log('item info set!');
                // console.log('realizeItem[0] - ' + realizeItem[0]);
            }
        }, 16);
    }, [item, itemInfo]);

    function realize(item)
    {
        let tempInv = JSON.parse(localStorage.inventory);
        const itemCount = tempInv[`${item}`];
        if (itemCount > 0) {
            tempInv[`${item}`] = itemCount - 1;
            localStorage.setItem("inventory", JSON.stringify(tempInv));
            setRealizeItem([true, Number(getPoffinId(item))]);
            derealize();
        }
    }
    
    function derealize()
    {
        setItemInfo([itemInfo[0], itemInfo[1], 0]); 
    }

    function reset() {
        setItem('');
        setRealizeItem(false, -1);
    }

    function getPoffinId(name)
    {
        const i = itemsData.find(i => i.name === name);
        return i ? i.id : null;
    }

    return (
        <>
            <Inventory
                mousePos = {mousePos}
                item = {item}
                setItem = {setItem}
                itemInfo = {itemInfo} 
                setItemInfo = {setItemInfo}
                realize = {realize}
            />
            <Cursor 
                mousePos = {mousePos}
                itemPos = {itemInfo}
                realizeItem = {realizeItem}
                reset = {reset}
            />
        </>
    )
}

export default ShuckleMechanics;
