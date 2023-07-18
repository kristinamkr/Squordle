/*
 * Item.js
*/

import classes from "./style/Item.module.css";

function Item(props) 
{
    const itemInfo = props;

    var itemClass = itemInfo['name'] === 'lemonade' ? 
        classes.lemonade : classes.item;

    return (
        <img name = {itemInfo['name']}
            className = {itemClass}
            src = {require('../assets/' + itemInfo['name'] + '.png')}
            alt = 'item png for inventory display'
            decoding = 'async' 
        />
    );
}

export default Item;
