/*
 * PoffinStorage.js
*/

import classes from "./style/PoffinStorage.module.css";
import inventory from './Inventory.js';

import {useState, useEffect} from 'react';

function PoffinStorage(props)
{
    // MOUSE EVENTS ------------------------------------------------------------
    const [mousePos, setMousePos] = useState([0, 0]);

    function changeMousePos(e) 
    {
        setMousePos([e.pageY - 32, e.pageX - 32]);
    }

    useEffect(() => {
        document.addEventListener("mousemove", changeMousePos);
        return () => document.removeEventListener("mousemove", changeMousePos);
    });

    // INVENTORY ---------------------------------------------------------------
    let pokeLink = "https://cdn3.iconfinder.com/data/icons/faticons/32/";
    const [arrowSrc, setArrowSrc] = 
        useState(pokeLink + "arrow-down-01-512.png")

    const [isExpanded, setIsExpanded] = useState(false);

    function expandPoffins()
    {
        if (!isExpanded)
            setArrowSrc(pokeLink + "arrow-up-01-512.png");
        else
            setArrowSrc(pokeLink + "arrow-down-01-512.png");
        setIsExpanded(!isExpanded);
    }
    // -------------------------------------------------------------------------

    // [0] - itemName, [1] - itemVisibility
    const [selectedItem, setSelectedItem] = useState(['', false]);
    // [0] - absolute/relative ?, [1] - xPos, [2] - yPos, 
    // [3] - zIndex, [4] - isMoving?
    const [itemPos, setItemPos] = useState(['', 0, 0, 0, false]);

    const [realizeItem, setRealizeItem] = useState(false); 
    const [derealizeItem, setDerealizeItem] = useState([null, -1]);

    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        console.log("ITEM SELECTED - " + item);
        const itemCount = localStorage.getItem(item);

        if (itemCount > 0) {
            setSelectedItem([item, true]);
            setItemPos(["absolute", 
                        mousePos[0], 
                        mousePos[1], 
                        1,
                        true]);
        }
    }

    function deselectItem(e)
    {
        console.log("hello");
        if (e.key === 'Escape' && selectedItem[1])  // check [0] ?
            setSelectedItem(['', false]);
    }

    function realize(item)
    {
        console.log("clicked whilst selected");
        const itemCount = localStorage.getItem(item);
        if (itemCount > 0 && !(realizeItem)) {
            localStorage.setItem(item, Number(itemCount) - 1);
            // derealize(item);
            setItemPos([itemPos[0], itemPos[1], itemPos[2], itemPos[3], false]);
            setRealizeItem(true);

        }
    }
    
    function derealize()
    {
        console.log("MOVING - " + itemPos[4]);
        // setShuckleDir([shuckleDir[0], shuckleDir[1], 0]);  // poffin NOT  moving
        setRealizeItem(false);
        // setSelectedItem('');
        // setItemVisibility(false);
    }

    function getPoffinId(name)
    {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].props.name === name)
                return inventory[i].props.id;
        }
    }
    
    useEffect(() => {       
        setTimeout(() => {
            if (selectedItem && itemPos[4]) {
                setItemPos(["absolute",
                            mousePos[0],
                            mousePos[1],
                            0,
                            true]);
                // setShuckleDir([mousePos[1], mousePos[0], 1]);  // poffin moving
                setDerealizeItem([derealize, 
                                  Number(getPoffinId(selectedItem))]);
            }
        }, 16);
    });

    function itemPreview(item, bg_color)
    {
        return (
            <tr className = {classes.item}>
                <th style = {{background: bg_color}}>
                    {item.props.tag} 
                    <div> {localStorage.getItem(item.props.name)} </div>
                </th>
                <td onClick = {selectItem}>
                    {item}
                </td>
            </tr> 
        )
    }

    // RENDER ------------------------------------------------------------------
    return (
        <div style = {{width: "0px", height: "0px"}}>
            <table className = {classes.PoffinStorage}>
                <tbody>
                <tr className = {classes.header}>
                    <th> Flavor </th>
                    <th style = {{width: "66px"}}> Items </th>
                </tr>
                { isExpanded && itemPreview(inventory[0], "#F08030") } 
                { isExpanded && itemPreview(inventory[1], "#F85888") }
                { isExpanded && itemPreview(inventory[2], "#78C850") }
                { isExpanded && itemPreview(inventory[3], "#F8D030") }
                { isExpanded && itemPreview(inventory[4], "#6890F0") }
                </tbody>
            </table>

            <button style = {{background: "none", border: "none"}} 
                    className = {classes.expansionArrow} 
                    onClick = {expandPoffins}>
                <img style = {{width: "40px", height: "40px"}} 
                     src = {arrowSrc}>
                </img>
            </button>

            { selectedItem[0] && selectedItem[1] &&
                <img id = "draggable_item"
                     className = {classes.Poffin}
                     src = {require("../assets/" + selectedItem[0] + ".png")}
                     style = {{cursor: "move",
                               position: itemPos[0],
                               top: String(itemPos[1]) + "px",
                               left: String(itemPos[2]) + "px",
                               zIndex: String(itemPos[3])}}
                     onClick = {() => realize(selectedItem)}
                     decoding = "async"/> }
        </div>
    )
}

export default PoffinStorage;
