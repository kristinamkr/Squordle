/*
 * PoffinStorage.js
*/

import classes from "./style/PoffinStorage.module.css";
import {useState, useEffect} from 'react';
import ShuckleCursor from './ShuckleCursor.js';

function PoffinStorage(props)
{
	const [is_expanded, setIs_expanded] = useState(false);

	const [arrowSrc, setArrowSrc] = 
        useState("https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-512.png")

	const [poffinRealized, setPoffinRealized] = 
        useState({spicyRealized:    false,
                  sweetRealized:    false,
                  bitterRealized:   false,
                  goldRealized:     false,
                  lemonadeRealized: false})

	const [poffinPos, setPoffinPos] = 
        useState({spicyPos:    ["relative",   "-307px",   "-324px", "1"],
                  sweetPos:    ["relative",   "-303px",   "-324px", "1"],
                  bitterPos:   ["relative", "-299.5px",   "-324px", "1"],
                  goldPos:     ["relative",   "-296px",   "-324px", "1"],
                  lemonadePos: ["relative",   "-293px",   "-324px", "1"]});

	const [poffinMoving, setPoffinMoving] = 
        useState({spicyMoving:    false,
                  sweetMoving:    false,
                  bitterMoving:   false,
                  goldMoving:     false,
                  lemonadeMoving: false})
	
	// first item is X pos of poffin, second item is Y pos of poffin, 
    // third item in the array is either 1 or 0 and references "poffinMoving"
	const [shuckleDir, setShuckleDir] = useState([0, 0, 0])
	const [mousePos, setMousePos] = useState([0, 0]);

	//first item is which derealizePoffin function to use, 
    // second is the reference to poffin so shuckle knows which 
    // behavior to perform.
	const [derealizePoffin, setDerealizePoffin] = useState([null, 0])

	function changeMousePos(e)
    {
		setMousePos([e.pageY - 32, e.pageX - 32])
	}

	useEffect(() => {
            document.addEventListener("mousemove", changeMousePos);
            return () => document.removeEventListener("mousemove", changeMousePos);
    });

	function expandPoffins()
    {
		if (!is_expanded)
			setArrowSrc("https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png");
		else
			setArrowSrc("https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-down-01-512.png");
		setIs_expanded(!is_expanded);
	}

    /*
    function realizePoffin(poffin)
    {
        if (window.localStorage.
    }
    */

	function realizeSpicy()
    {
		if (window.localStorage.spicyPoffin > 0 && 
                !poffinRealized.spicyRealized) {
			window.localStorage.spicyPoffin = Number(window.localStorage.spicyPoffin) - 1;
			setPoffinRealized({...poffinRealized, spicyRealized: true});
			if(poffinPos.spicyPos[3] === "1")
				expandPoffins();
		}
		setPoffinMoving({...poffinMoving, 
                         spicyMoving: !poffinMoving.spicyMoving});
	}

	function derealizeSpicy()
    {
		setPoffinRealized({...poffinRealized, spicyRealized: false});
		setPoffinPos({...poffinPos, 
                      spicyPos: ["relative", "-307px", "-324px", "1"]});
	}

	function realizeSweet()
    {
		if (window.localStorage.sweetPoffin > 0 && 
                !poffinRealized.sweetRealized) {
			window.localStorage.sweetPoffin = Number(window.localStorage.sweetPoffin) - 1;
			setPoffinRealized({...poffinRealized, sweetRealized: true});
			if(poffinPos.sweetPos[3] === "1")
				expandPoffins();
		}
		setPoffinMoving({...poffinMoving,
                         sweetMoving: !poffinMoving.sweetMoving});
	}

	function derealizeSweet()
    {
		setPoffinRealized({...poffinRealized, sweetRealized: false});
		setPoffinPos({...poffinPos,
                      sweetPos: ["relative", "-303px", "-324px", "1"]});
	}

	function realizeBitter()
    {
		if (window.localStorage.bitterPoffin > 0 && 
                !poffinRealized.bitterRealized) {
			window.localStorage.bitterPoffin = Number(window.localStorage.bitterPoffin) - 1;
			setPoffinRealized({...poffinRealized, bitterRealized: true});
			if (poffinPos.bitterPos[3] === "1")
				expandPoffins();
		}
		setPoffinMoving({...poffinMoving,
                         bitterMoving: !poffinMoving.bitterMoving});
	}

	function derealizeBitter()
    {
		setPoffinRealized({...poffinRealized, bitterRealized: false});
		setPoffinPos({...poffinPos, 
                      bitterPos: ["relative", "-299.5px", "-324px", "1"]});
	}

	function realizeGold()
    {
		if (window.localStorage.goldPoffin > 0 && 
                !poffinRealized.goldRealized) {
			window.localStorage.goldPoffin = Number(window.localStorage.goldPoffin) - 1;
			setPoffinRealized({...poffinRealized, goldRealized: true});	
			if (poffinPos.goldPos[3] === "1") 
				expandPoffins();
		}
		setPoffinMoving({...poffinMoving, 
                         goldMoving: !poffinMoving.goldMoving})
	}

	function derealizeGold()
    {
		setPoffinRealized({...poffinRealized, goldRealized: false});
		setPoffinPos({...poffinPos, goldPos: ["relative", "-296px", "-324px", "1"]});
	}

	function realizeLemonade()
    {
		if (window.localStorage.lemonade > 0 && 
                !poffinRealized.lemonadeRealized) {
			window.localStorage.lemonade = Number(window.localStorage.lemonade) - 1;
			setPoffinRealized({...poffinRealized, lemonadeRealized: true});	
			if (poffinPos.lemonadePos[3] === "1")
				expandPoffins();
		}
		setPoffinMoving({...poffinMoving,
                         lemonadeMoving: !poffinMoving.lemonadeMoving})
	}

	function derealizeLemonade()
    {
		setPoffinRealized({...poffinRealized, lemonadeRealized: false});
		setPoffinPos({...poffinPos, 
                      lemonadePos: ["relative", "-293px", "-324px", "1"]});
	}

	useEffect(() => {		
		setTimeout(() => {
			if (poffinRealized.spicyRealized && poffinMoving.spicyMoving) {
				setPoffinPos({...poffinPos,
                              spicyPos: ["absolute",
                                          String(mousePos[0]) + "px",
                                          String(mousePos[1]) + "px",
                                          "0"]});
				setShuckleDir([mousePos[1], mousePos[0], 1]);
				setDerealizePoffin([derealizeSpicy, 1]);
			}
			else if (poffinRealized.sweetRealized && poffinMoving.sweetMoving) {
				setPoffinPos({...poffinPos,
                              sweetPos: ["absolute",
                                         String(mousePos[0]) + "px",
                                         String(mousePos[1]) + "px",
                                         "0"]});
				setShuckleDir([mousePos[1], mousePos[0], 1]);
				setDerealizePoffin([derealizeSweet, 2]);
			}
			else if (poffinRealized.bitterRealized && poffinMoving.bitterMoving) {
				setPoffinPos({...poffinPos,
                              bitterPos: ["absolute",
                                          String(mousePos[0]) + "px",
                                          String(mousePos[1]) + "px",
                                          "0"]});
				setShuckleDir([mousePos[1], mousePos[0], 1]);
				setDerealizePoffin([derealizeBitter, 3]);
			}
			else if (poffinRealized.goldRealized && poffinMoving.goldMoving) {
				setPoffinPos({...poffinPos,
                              goldPos: ["absolute",
                                        String(mousePos[0]) + "px",
                                        String(mousePos[1]) + "px",
                                        "0"]});
				setShuckleDir([mousePos[1], mousePos[0], 1]);
				setDerealizePoffin([derealizeGold,4]);
			}
            else if (poffinRealized.lemonadeRealized && poffinMoving.lemonadeMoving) {
				setPoffinPos({...poffinPos,
                              lemonadePos: ["absolute",
                                            String(mousePos[0]) + "px",
                                            String(mousePos[1]) + "px",
                                            "0"]});
				setShuckleDir([mousePos[1], mousePos[0], 2])
				setDerealizePoffin([derealizeLemonade, 5]);
			}
            else
				setShuckleDir([shuckleDir[0], shuckleDir[1], 0])
			}, 16);
        });


	return (
		<div style = {{width: "0px", height: "0px"}}>
			<ShuckleCursor keyDownHandler = {props.keyDownHandler} 
                           validKeys = {props.validKeys} 
                           shuckleDir = {shuckleDir} 
                           derealizePoffin = {derealizePoffin}/>
			<table className = {classes.PoffinStorage} 
                   style = {{width: "125.08px", 
                             positionMargin: "auto", 
                             textAlign: "center", 
                             background: "#e090a8", 
                             border: "3px solid #925E6D", 
                             borderRadius: "10px"}}>
				<tbody>
                <tr>
					<th style = {{background: "#EBB7C6", 
                                  borderTopLeftRadius: "5px"}}>
                        Flavor
					</th>
					<th style = {{background: "#EBB7C6", 
                                  width: "66px", 
                                  borderTopRightRadius: "5px"}}>
                        Items
					</th>
				</tr>
				{ is_expanded && <tr style = {{background:"#fff"}}>
                    <th style = {{background:"#F08030"}}>
                        Spicy
                    <div>
                        {window.localStorage.spicyPoffin}
                    </div>
                    </th>
                    <td>
                        <img style = {{cursor: "move"}} 
                             src = {require("../assets/Spicy-Sour_Poffin.png")}
                             decoding = "async" 
                             width="64" 
                             height="64"/>
                    </td>
                    </tr>
				}
                { is_expanded && <tr style = {{background: "#fff"}}>
                    <th style = {{background:"#F85888"}}>
                        Sweet
                    <div>
                        {window.localStorage.sweetPoffin}
                    </div>
                    </th>
                    <td>
                        <img style = {{cursor: "move"}} 
                             src = {require("../assets/Sweet-Sour_Poffin.png")}
                             decoding = "async" 
                             width = "64" 
                             height = "64"/>
                    </td>
					</tr>
				}
                { is_expanded && <tr style = {{background: "#fff"}}>
                    <th style = {{background: "#78C850"}}>
                        Bitter
                    <div>
                        {window.localStorage.bitterPoffin}
                    </div>
                    </th>
                    <td>
                        <img style = {{cursor: "move"}} 
                             src = {require("../assets/Bitter-Sour_Poffin.png")} 
                             decoding = "async" 
                             width="64" 
                             height="64"/>
                    </td>
					</tr>
				}
                { is_expanded && <tr style = {{background: "#fff"}}>
                    <th style = {{background: "#F8D030", 
                                  borderBottomLeftRadius: "5px"}}>
                        Gold
                    <div>
                        {window.localStorage.goldPoffin}
                    </div>
                    </th>
                    <td style = {{borderBottomRightRadius: "5px"}}>
                        <img style = {{cursor: "move"}} 
                             src = {require("../assets/Mild_Poffin.png")} 
                             decoding = "async" 
                             width = "64" 
                             height = "64"/>
                    </td>
                    </tr>
				}
                { is_expanded && <tr style = {{background: "#fff"}}>
                    <th style = {{background: "#6890F0", borderBottomLeftRadius: "5px"}}>
                        Juice
                    <div>
                        {window.localStorage.lemonade}
                    </div>
                    </th>
                    <td style = {{borderBottomRightRadius: "5px"}}>
                        <img style = {{cursor: "move"}} 
                             src = {require("../assets/Lemonade.png")} 
                             decoding = "async" 
                             width = "64" 
                             height = "64"/>
                    </td>
					</tr>
				}
				</tbody>
			</table>
			<button style = {{background: "none", border: "none"}} 
                    className = {classes.expansionArrow} 
                    onClick = {expandPoffins}>
				<img style = {{width: "40px", height: "40px"}} 
                     src = {arrowSrc}>
                </img>
			</button>
			{(is_expanded || poffinRealized.spicyRealized) &&
                 <img id = "spicyPoffin" 
                      style = {{cursor: "move", 
                                position: poffinPos.spicyPos[0], 
                                top: poffinPos.spicyPos[1], 
                                left: poffinPos.spicyPos[2], 
                                zIndex: poffinPos.spicyPos[3]}} 
                      onClick = {realizeSpicy} 
                      src = {require("../assets/Spicy-Sour_Poffin.png")} 
                      decoding = "async" 
                      width = "64" 
                      height="64"/>
            }
            {(is_expanded && poffinRealized.spicyRealized) && 
                <img id = "spicyPoffin" 
                     style = {{cursor: "move", 
                               position: "relative", 
                               opacity: "0", 
                               top: "-307", 
                               left: "-324px", 
                               zIndex: "0"}} 
                     src = {require("../assets/Spicy-Sour_Poffin.png")} 
                     decoding = "async" 
                     width = "64" 
                     height = "64"/>
            }
			{(is_expanded || poffinRealized.sweetRealized) && 
                <img id = "sweetPoffin" 
                     style = {{cursor:"move", 
                               position: poffinPos.sweetPos[0], 
                               top: poffinPos.sweetPos[1], 
                               left: poffinPos.sweetPos[2], 
                               zIndex: poffinPos.sweetPos[3]}} 
                     onClick = {realizeSweet} 
                     src = {require("../assets/Sweet-Sour_Poffin.png")} 
                     decoding = "async" 
                     width = "64" 
                     height = "64"/>
            }
            {(is_expanded && poffinRealized.sweetRealized) &&
                 <img id = "sweetPoffin" 
                      style = {{cursor: "move", 
                                position: "relative", 
                                opacity: "0", 
                                top: "-303", 
                                left: "-324px", 
                                zIndex: "0"}} 
                      src = {require("../assets/Sweet-Sour_Poffin.png")} 
                      decoding = "async" 
                      width = "64" 
                      height = "64"/>
            }
			{(is_expanded || poffinRealized.bitterRealized) && 
                <img id = "bitterPoffin" 
                     style = {{cursor: "move", 
                               position: poffinPos.bitterPos[0], 
                               top: poffinPos.bitterPos[1], 
                               left: poffinPos.bitterPos[2], 
                               zIndex: poffinPos.bitterPos[3]}} 
                     onClick = {realizeBitter} 
                     src = {require("../assets/Bitter-Sour_Poffin.png")} 
                     decoding = "async" 
                     width = "64" 
                     height = "64"/>
            }
            {(is_expanded && poffinRealized.bitterRealized) && 
                <img id = "bitterPoffin" 
                     style = {{cursor: "move", 
                               position: "relative", 
                               opacity: "0", 
                               top: "-299.5", 
                               left: "-324px", 
                               zIndex: "0"}} 
                     src = {require("../assets/Bitter-Sour_Poffin.png")} 
                     decoding = "async" 
                     width = "64" 
                     height = "64"/>
            }
			{(is_expanded || poffinRealized.goldRealized) && 
                <img id = "goldPoffin" 
                     style = {{cursor: "move", 
                               position: poffinPos.goldPos[0], 
                               top: poffinPos.goldPos[1], 
                               left: poffinPos.goldPos[2], 
                               zIndex: poffinPos.goldPos[3]}} 
                     onClick = {realizeGold} 
                     src = {require("../assets/Mild_Poffin.png")} 
                     decoding = "async" 
                     width = "64" 
                     height = "64"/>
            }
	        {(is_expanded && poffinRealized.goldRealized) &&
                 <img id = "goldPoffin" 
                      style = {{cursor: "move", 
                                position: "relative", 
                                opacity: "0", 
                                top: "-296", 
                                left: "-324px", 
                                zIndex:"0"}} 
                      src = {require("../assets/Mild_Poffin.png")} 
                      decoding = "async" 
                      width = "64" 
                      height = "64"/>
            }
			{(is_expanded || poffinRealized.lemonadeRealized) && 
                <img id = "lemonade" 
                     style = {{cursor: "move", 
                               position: poffinPos.lemonadePos[0], 
                               top: poffinPos.lemonadePos[1], 
                               left: poffinPos.lemonadePos[2], 
                               zIndex: poffinPos.lemonadePos[3]}} 
                     onClick = {realizeLemonade} 
                     src = {require("../assets/Lemonade.png")} 
                     decoding = "async" 
                     width = "64" 
                     height = "64"/>
            }
            {(is_expanded && poffinRealized.lemonadeRealized) && 
                <img id = "lemonade" 
                     style = {{cursor: "move", 
                               position: "relative", 
                               opacity: "0", 
                               top: "-293", 
                               left: "-324px", 
                               zIndex: "0"}} 
                     src = {require("../assets/Lemonade.png")} 
                     decoding="async" 
                     width="64" 
                     height="64"/>
            }
		</div>
	)
}

export default PoffinStorage;
