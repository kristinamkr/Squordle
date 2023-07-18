/*
 * Inventory.js
*/

import classes from "./style/Inventory.module.css";
import itemData from './ItemData';
import Item from './Item';

import { useState } from 'react'; 

function Inventory(props) 
{
    // INVENTORY ---------------------------------------------------------------
    let pokeLink = "https://cdn3.iconfinder.com/data/icons/faticons/32/";
    const [arrowSrc, setArrowSrc] = 
        useState(pokeLink + "arrow-down-01-512.png")

    const [isExpanded, setIsExpanded] = useState(false);
    const itemColors = ['#F08030', '#F85888', '#F8D030', '#6890F0'];

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
    const item = props.item;
    const itemInfo = props.itemInfo;

    function selectItem(item)
    {
        const itemCount = JSON.parse(localStorage.inventory)[`${item}`];
    
        if (itemCount > 0 ) {  // test
            props.setItem(item);
            props.setItemInfo([mousePos[0], mousePos[1], 1]);
        }
    }

    function itemPreview(item, bg_color)
    {
        let inventory = JSON.parse(localStorage.inventory);
        let itemCount = inventory && inventory[item.props.name] ? 
            inventory[item.props.name] : 0;

        return (
            <tr className = {classes.item}
                key = {item.props.id}>
                <td style = {{background: bg_color}}>
                    {item.props.tag} 
                    <div>{itemCount}</div>
                </td>
                <td className = {classes.draggable}
                    onClick = {() => selectItem(item.props.name)}>
                    {item}
                </td>
            </tr> 
        )
    }

    // RENDER ------------------------------------------------------------------
    return (
        <div className = {classes.storageWrapper}>
            <table className={classes.storage}>
            <thead>
                <tr className={classes.header}>
                    <th className={classes.leftColumn}> Flavor </th>
                    <th className={classes.header1}> Items </th>
                </tr>
            </thead>
            <tbody>
                {isExpanded && 
                    itemData
                        .slice(0, itemData.length - 2)
                        .map((item, index) => 
                            itemPreview(<Item {...item} />, itemColors[index]))}
            </tbody>
            </table>
            <button className = {classes.expansionArrow} 
                   onClick = {expandInventory}>
                <img src = {arrowSrc}
                     alt = 'custom arrow for inventory toggle'/>
            </button>

            { !(item === '') &&
                <div className = {classes.draggable}>
                    <img 
                        id = "draggable_item"
                        src = {require("../assets/" + item + ".png")}
                        alt = "item for dragging"
                        style = {{
                            cursor: "move",
                            position: "absolute",
                            top: String(itemInfo[0]) - 32 + "px",
                            left: String(itemInfo[1]) - 32 + "px",
                            zIndex: String(itemInfo[2])}}
                        onClick = {() => props.realize(item)}
                        decoding = "async"/>
                </div> }
        </div>
    );
}

export default Inventory;
