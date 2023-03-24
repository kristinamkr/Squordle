/*
 * PoffinStorage.js
*/

import classes from "./style/PoffinStorage.module.css";
import inventory from './Inventory.js';

import { useState, useEffect} from 'react';

function PoffinStorage(props) 
{
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

    const mousePos = props.mousePos;
    const itemInfo = props.itemInfo; 

    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        const itemCount = localStorage.getItem(item);

        if (itemCount > 0 && itemInfo[0] === '') {  // test
            props.setItemInfo([item,
                              mousePos[0], 
                              mousePos[1],
                              1]);
        }
    }

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

    // for region implementation, use map function to iterate component renders
    // RENDER ------------------------------------------------------------------
    return (
        <div className = {classes.storageWrapper}>
            <table className = {classes.poffinStorage}>
                <tbody>
                <tr className = {classes.header}>
                    <th> Flavor </th>
                    <th> Items </th>
                </tr>
                { isExpanded && itemPreview(inventory[0], "#F08030") } 
                { isExpanded && itemPreview(inventory[1], "#F85888") }
                { isExpanded && itemPreview(inventory[2], "#78C850") }
                { isExpanded && itemPreview(inventory[3], "#F8D030") }
                { isExpanded && itemPreview(inventory[4], "#6890F0") }
                </tbody>
            </table>

            <button className = {classes.expansionArrow} 
                   onClick = {expandPoffins}>
                <img src = {arrowSrc}/>
            </button>

            { !(itemInfo[0] === '') &&
                <img id = "draggable_item"
                     className = {classes.poffin}
                     src = {require("../assets/" + itemInfo[0] + ".png")}
                     style = {{cursor: "move",
                               position: "absolute",
                               top: String(itemInfo[1]) - 32 + "px",
                               left: String(itemInfo[2]) - 32 + "px",
                               zIndex: String(itemInfo[3])}}
                     onClick = {() => props.realize(itemInfo[0])}
                     decoding = "async"/> }
        </div>
    );
}

export default PoffinStorage;
