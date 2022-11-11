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

    const [selectedItem, setSelectedItem] = useState('');
    const [itemPos, setItemPos] = useState(['', '', '', '', '']);

    const [itemRealized, setItemRealized] = useState(false); 
    const [itemDerealized, setItemDerealized] = useState('');
    const [isItemVisible, setItemVisibility] = useState(false);

    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        console.log("ITEM SELECTED - " + item);
        const itemCount = localStorage.getItem(item);

        if (itemCount > 0) {
            setSelectedItem(item);
            setItemPos(["relative", 
                        String(mousePos[0]) + "px", 
                        String(mousePos[1]) + "px", 
                        "1"]);
        }

        setItemVisibility(true);
    }

    function deselectItem(e)
    {
        console.log("hello");
        if (e.key === 'Escape' && selectedItem && isItemVisible) {
            setItemVisibility(false);
            setSelectedItem('');
        }
    }

    function realize(item)
    {
        const itemCount = localStorage.getItem(item);
        if (itemCount > 0 && !(itemRealized)) {
            localStorage.setItem(item, Number(itemCount) - 1);
            setItemRealized(true);
        }
    }
    
    function derealize(item)
    {
        const extremis = document.getElementById("draggable_item"); 
        extremis.remove();

        setItemRealized(false);
        setSelectedItem('');
        setItemVisibility(false);
    }

    useEffect(() => {       
        setTimeout(() => {
            if (selectedItem) {
                setItemPos(["absolute",
                            String(mousePos[0]) + "px",
                            String(mousePos[1]) + "px",
                            "0"]);
                // setShuckleDir([mousePos[1], mousePos[0], 1]);
                // setPoffinDerealized(derealize(selectedItem));
            }
            // else
                // setShuckleDir([shuckleDir[0], shuckleDir[1], 0]);
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

            { selectedItem && isItemVisible &&
                <img id = "draggable_item"
                     className = {classes.Poffin}
                     src = {require("../assets/" + selectedItem + ".png")}
                     style = {{cursor: "move",
                               position: itemPos[0],
                               top: itemPos[1],
                               left: itemPos[2],
                               zIndex: itemPos[3]}}
                     onClick = {() => realize(selectedItem)}
                     decoding = "async"/> }
        </div>
    )
}

export default PoffinStorage;
