/*
 * Inventory.js
*/

import classes from "./style/Inventory.module.css";
import items from './Items.js';

import { useState } from 'react'; // useEffect} from 'react';

function Inventory(props) 
{
    // INVENTORY ---------------------------------------------------------------
    let pokeLink = "https://cdn3.iconfinder.com/data/icons/faticons/32/";
    const [arrowSrc, setArrowSrc] = 
        useState(pokeLink + "arrow-down-01-512.png")

    const [isExpanded, setIsExpanded] = useState(false);

    function expandInventory()
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

    const haltInv = props.haltInv;

    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        const itemCount = JSON.parse(localStorage.inventory)[`${item}`];
    
        console.log("ITEMINFO[0]?  - " + itemInfo[0]);

        if (itemCount > 0 && 
            (!haltInv || item === "lemonade")) {  // test
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
                    <div> 
                    {JSON.parse(localStorage.inventory)[`${item.props.name}`]} 
                    </div>
                </th>
                <td className = {classes.draggable}
                    onClick = {selectItem}>
                    {item}
                </td>
            </tr> 
        )
    }

    // for region implementation, use map function to iterate component renders
    // RENDER ------------------------------------------------------------------
    return (
        <div className = {classes.storageWrapper}>
            <table className = {classes.storage}>
                <tbody>
                <tr className = {classes.header}>
                    <th className = {classes.leftColumn}> Flavor </th>
                    <th className = {classes.header1}> Items </th>
                </tr>
                { isExpanded && itemPreview(items[0], "#F08030") } 
                { isExpanded && itemPreview(items[1], "#F85888") }
                { isExpanded && itemPreview(items[2], "#F8D030") }
                { isExpanded && itemPreview(items[3], "#6890F0") }
                </tbody>
            </table>

            <button className = {classes.expansionArrow} 
                   onClick = {expandInventory}>
                <img src = {arrowSrc}
                     alt = "custom arrow for inventory toggle"/>
            </button>

            { !(itemInfo[0] === '') &&
                <div className = {classes.draggable}>
                    <img id = "draggable_item"
                         src = {require("../assets/" + itemInfo[0] + ".png")}
                         alt = "item for dragging"
                         style = {{cursor: "move",
                                   position: "absolute",
                                   top: String(itemInfo[1]) - 32 + "px",
                                   left: String(itemInfo[2]) - 32 + "px",
                                   zIndex: String(itemInfo[3])}}
                         onClick = {() => props.realize(itemInfo[0])}
                         decoding = "async"/>
                </div> }
        </div>
    );
}

export default Inventory;
