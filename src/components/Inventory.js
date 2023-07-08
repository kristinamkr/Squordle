/*
 * Inventory.js
*/

import classes from "./style/Inventory.module.css";
import items from './Items.js';

import { useState } from 'react'; 

const itemColors = ['#F08030', '#F85888', '#F8D030', '#6890F0'];

function Inventory(props) 
{
    console.log("HELLO INVENTORY");

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

//    const mousePos = props.mousePos;
//    const itemInfo = props.itemInfo; 

//    const haltInv = props.haltInv;

/*
    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        const itemCount = JSON.parse(localStorage.inventory)[`${item}`];
    
    /*
        if (itemCount > 0 && 
            (!haltInv || item === "lemonade")) {  // test
            props.setItemInfo([item,
                              mousePos[0], 
                              mousePos[1],
                              1]);
        }
    }
*/

    function itemPreview(item, bg_color)
    {
        console.log("PREVIEWING ITEM [" + item.props.name + "]");
        return (
            <tr className = {classes.item}>
                <th style = {{background: bg_color}}>
                    {item.props.tag} 
                    <> 
                    {JSON.parse(localStorage.inventory)[`${item.props.name}`]} 
                    </>
                </th>
            </tr> 
        )
    }
/*
                <td className = {classes.draggable}
                    onClick = {selectItem}>
                    {item}
                </td>
*/

    // RENDER ------------------------------------------------------------------
    return (
        <>
            <table className={classes.storage}>
            <tbody>
                <tr className={classes.header}>
                    <th className={classes.leftColumn}> Flavor </th>
                    <th className={classes.header1}> Items </th>
                </tr>
                {items.map((item, index) => 
                    itemPreview(item, itemColors[index]))}
            </tbody>
            </table>

            <button className = {classes.expansionArrow} 
                   onClick = {expandInventory}>
                <img src = {arrowSrc}
                     alt = 'custom arrow for inventory toggle'/>
            </button>
        </>
    );
}

export default Inventory;

/*
            {isExpanded && (


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




            <table className = {classes.storage}>
                <tbody>
                <tr className = {classes.header}>
                    <th className = {classes.leftColumn}> Flavor </th>
                    <th className = {classes.header1}> Items </th>
                </tr>
                { isExpanded && itemPreview(items[0], '#F08030') } 
                { isExpanded && itemPreview(items[1], '#F85888') }
                { isExpanded && itemPreview(items[2], '#F8D030') }
                { isExpanded && itemPreview(items[3], '#6890F0') }
                </tbody>
            </table>

*/
