/*
 * PoffinStorage.js
*/

import {useState, useEffect} from 'react';
import classes from "./style/PoffinStorage.module.css";
import Poffin from './Poffin.js';
import ShuckleCursor from './ShuckleCursor.js';

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
	const [itemPos, setItemPos] = 
            useState(['', '', '', '', '']);

    // MOVE TO SHUCKLE --------------------------------------------------------- 
	const [poffinRealized, setPoffinRealized] = useState(false); 
	// const [poffinMoving, setPoffinMoving] = useState(false);

    //first item is which derealizePoffin function to use, 
    // second is the reference to poffin so shuckle knows which 
    // behavior to perform.
	const [poffinDerealized, setPoffinDerealized] = useState('');

	// first item is X pos of poffin, second item is Y pos of poffin, 
    // third item in the array is either 1 or 0 and references "poffinMoving"
	const [shuckleDir, setShuckleDir] = useState([0, 0, 0]);

    function selectItem(e)
    {
        var nodes = Array.prototype.slice.call(e.currentTarget.children);
        const item = nodes[0].name;
        const itemCount = localStorage.getItem(item);

        if (itemCount > 0) {
            setSelectedItem(item);
            setItemPos(["relative", 
                        String(mousePos[0]) + "px", 
                        String(mousePos[1]) + "px", 
                        "1"]);
        }
    }

    function deselectItem(e)
    {
          
    }

    function realize(item)
    {
        const itemCount = localStorage.getItem(item);
        if (itemCount > 0 &&
                !poffinRealized) {
            localStorage.setItem(item, itemCount - 1);
            setPoffinRealized(true);
            if (itemPos[3] === '1')
               expandPoffins();
        }
    }
    
    function derealize(item)
    {
        console.log("wtf");
		setPoffinRealized(false);
        const extremis = document.getElementById("draggable_item"); 
        extremis.remove();
    }

	useEffect(() => {		
		setTimeout(() => {
            if (selectedItem && poffinRealized) {
                setItemPos(["absolute",
                            String(mousePos[0]) + "px",
                            String(mousePos[1]) + "px",
                            "0"]);
				setShuckleDir([mousePos[1], mousePos[0], 1]);
				setPoffinDerealized(derealize(selectedItem));
            }
            else
				setShuckleDir([shuckleDir[0], shuckleDir[1], 0]);
        }, 16);
    });

	return (
		<div style = {{width: "0px", height: "0px"}}>
			<ShuckleCursor keyDownHandler = {props.keyDownHandler} 
                           validKeys = {props.validKeys} 
                           shuckleDir = {shuckleDir} 
                           derealizePoffin = {poffinDerealized}/>

			<table className = {classes.PoffinStorage}>

			    <tbody>

                <tr className = {classes.header}>
					<th> Flavor </th>
					<th style = {{width: "66px"}}> Items </th>
				</tr>

                { isExpanded && <tr className = {classes.item}>
                    <th style = {{background: "#F08030"}}>
                        Spicy
                        <div> {window.localStorage.spicyPoffin} </div>
                    </th>
                    <td onClick = {selectItem}>
                        <Poffin item = "spicyPoffin"/> 
                    </td>
                </tr> } 

                { isExpanded && <tr className = {classes.item}>
                    <th style = {{background:"#F85888"}}>
                        Sweet
                        <div> {window.localStorage.sweetPoffin} </div>
                    </th>
                    <td name = "sweetPoffin" 
                        onClick = {selectItem}>
                        <Poffin item = "sweetPoffin"/> 
                    </td>
                </tr> }

                { isExpanded && <tr className = {classes.item}>
                    <th style = {{background: "#78C850"}}>
                        Bitter
                        <div> {window.localStorage.bitterPoffin} </div>
                    </th>
                    <td name = "bitterPoffin" 
                        onClick = {selectItem}>
                        <Poffin item = "bitterPoffin"/>
                    </td>
                </tr> }

                { isExpanded && <tr className = {classes.item}>
                    <th style = {{background: "#F8D030"}}> 
                        Gold
                        <div> {window.localStorage.goldPoffin} </div>
                    </th>
                    <td name = "goldPoffin" 
                        onClick = {selectItem}>
                        <Poffin item = "goldPoffin"/> 
                    </td>
                </tr> }

                { isExpanded && <tr className = {classes.item}>
                    <th style = {{background: "#6890F0"}}> 
                        Juice
                        <div> {window.localStorage.lemonade} </div>
                    </th>
                    <td name = "lemonade" 
                        onClick = {selectItem}>
                        <Poffin item = "lemonade"/> 
                    </td>
                </tr> }
				</tbody>
			</table>

			<button style = {{background: "none", border: "none"}} 
                    className = {classes.expansionArrow} 
                    onClick = {expandPoffins}>
				<img style = {{width: "40px", height: "40px"}} 
                     src = {arrowSrc}>
                </img>
			</button>

            { selectedItem && !poffinRealized &&
                <img id = "draggable_item"
                     className = {classes.Poffin}
                     src = {require("../assets/" + selectedItem + ".png")}
                     style = {{cursor: "move",
                               position: itemPos[0],
                               top: itemPos[1],
                               left: itemPos[2],
                               zIndex: itemPos[3]}}
                     onClick = {realize(selectedItem)}
                     decoding = "async"/>
            }
		</div>
	)
}

export default PoffinStorage;
