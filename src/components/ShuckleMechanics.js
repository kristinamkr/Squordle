/*
 * ShuckleMechanics.js
*/

import itemsData from './Items.js';
import Inventory from './Inventory.js';
import ShuckleCursor from './ShuckleCursor.js';
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

    function reset() {
        setItem('');
        setRealizeItem(false, -1);
    }

    function getPoffinId(name)
    {
        const i = itemsData.find(i => i.props.name === name);
        return i ? i.props.id : null;
    }

    return (
        <>
            <Inventory
                item = {item}
                itemInfo = {itemInfo} 
                setItemInfo = {setItemInfo}
            />
            <ShuckleCursor 
                mousePos = {mousePos}
            />
        </>
    )
}

export default ShuckleMechanics;
