/*
 * Inventory.js
*/

import classes from "./style/Inventory.module.css";
import itemsData from './Items.js';

import { useState } from 'react'; 

function Item(props) 
{
    const itemInfo = props;

    var itemClass = itemInfo['name'] === 'lemonade' ? 
        classes.lemonade : classes.item;

    return (
        <tr>
        <td>
            <img name = {itemInfo['name']}
                className = {itemClass}
                src = {require('../assets/' + itemInfo['name'] + '.png')}
                alt = 'item png for inventory display'
                decoding = 'async' 
            />
        </td>
        </tr>
    );
}

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

    function itemPreview(item, bg_color)
    {
        let inventory = JSON.parse(localStorage.inventory);
        let itemCount = inventory && inventory[item.props.name] ? 
            inventory[item.props.name] : 0;

        return (
            <tr className = {classes.item}>
                <th style = {{background: bg_color}}>
                    {item.props.tag} 
                    <div> 
                    {itemCount}
                    </div>
                </th>
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
                { isExpanded && itemPreview(itemsData[0], "#F08030") } 
                { isExpanded && itemPreview(itemsData[1], "#F85888") }
                { isExpanded && itemPreview(itemsData[2], "#F8D030") }
                { isExpanded && itemPreview(itemsData[3], "#6890F0") }
            </tbody>
            </table>

            <button className = {classes.expansionArrow} 
                   onClick = {expandInventory}>
                <img src = {arrowSrc}
                     alt = 'custom arrow for inventory toggle'/>
            </button>
        </div>
    );
}

export default Inventory;
