/*
 * ShuckleMechanics.js
*/

import inventory from './Inventory.js';
import PoffinStorage from './PoffinStorage.js';
import ShuckleCursor from './ShuckleCursor.js';
import {useState, useEffect} from 'react';

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

    const [selectedItem, setItem] = useState('');
    // [0] - absolute/relative ?, 
    // [1] - xPos, [2] - yPos, [3] - zIndex
    const [itemPos, setItemPos] = useState(['', 0, 0, -1]);
    // [0] - xPos, [1] - yPos, [2] - isMoving 
	const [itemLoc, setItemLoc] = useState([0, 0, -1])
    // const [isMoving, setMoving] = useState(-1);
    const [isMoving, setMoving] = useState(false);
    const [realizeItem, setRealizeItem] = useState(false); 
    const [derealizeItem, setDerealizeItem] = useState(-1);

    useEffect(() => {       
        setTimeout(() => {
            if (selectedItem && isMoving) {
                setItemPos(["absolute",
                            mousePos[0] - 32,
                            mousePos[1] - 32,
                            0]);
                setItemLoc([mousePos[0], mousePos[1], 1]);  // poffin moving
                setDerealizeItem(Number(getPoffinId(selectedItem)));
            }
        }, 16);
    });

    function realize(item)
    {
        const itemCount = localStorage.getItem(item);
        if (itemCount > 0 && isMoving) {
            localStorage.setItem(selectedItem, Number(itemCount) - 1);
            setMoving(false);
            setRealizeItem(true);
        }

    }
    
    function derealize()
    {
        setItemLoc([itemLoc[0], itemLoc[1], 0]);  // poffin NOT  moving
    }

    function reset() {
        setItem('');
        setMoving(false);
        setItemLoc([itemLoc[0], itemLoc[1], -1]);
        setDerealizeItem(-1);
        console.log("ITEM INFORMATION RESET");
    }

    function getPoffinId(name)
    {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].props.name === name)
                return inventory[i].props.id;
        }
    }

    return (
        <>
            <PoffinStorage keyDownHandler = {props.keyDownHandler}
                           mousePos = {mousePos}
                           selectedItem = {selectedItem}
                           setItem = {setItem}
                           itemPos = {itemPos} 
                           setItemPos = {setItemPos} 
                           isMoving = {isMoving}
                           setMoving = {setMoving}
                           realize = {realize} />
            <ShuckleCursor keyDownHandler = {props.keyDownHandler}
                           validKeys = {props.validKeys}
                           mousePos = {mousePos}
                           targetPos = {itemLoc}
                           setTargetPos = {setItemLoc}
                           realizeItem = {realizeItem} 
                           derealize = {derealize}
                           derealizeItem = {derealizeItem} 
                           reset = {reset} /> 
        </>
    )
}

export default ShuckleMechanics;
