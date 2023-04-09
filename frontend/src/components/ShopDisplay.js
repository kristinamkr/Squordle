/*
 * ShopDisplay.js
*/ 

import classes from "./style/ShopDisplay.module.css";
import items from './Items.js';

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";
import { useState, useEffect } from 'react';

function ShopDisplay(props)
{
	const emote = {HAPPY:   0,
                   SAD:     1,
                   WEEPY:   2,
                   NEUTRAL: 3};
    Object.freeze(emote);

	var shopText = ["Would you like to adopt a Shuckle?",
                    "Please adopt him! Look! He's so lonely.",
                    "Please! I'm begging you!",
                    "Okay. I understand. It's not your fault.",
                    "It's just that our clientele has been dwindling and "
                     + "we can't afford to feed our family much longer.",
                    "We love our Shuckle so much, but maybe we can buy " 
                     + "ourselves more time if someone would adopt him.",
                    "If you know anyone who can help, "
                     + "please send them our way.",
                    "Thank you! Please take this poffin as well. " 
                     + "If you come back again, "
                     + "we will have items to sell you.",
                    "Welcome back! Feel free to browse."]

	const dollarHandler = props.dollarHandler;

	const [shopHeader, setShopHeader] = 
        useState(shopText[Number(window.localStorage.shopState)]);
    console.log("shopdisplay dollar - " + window.localStorage.shopState);

	function shopAdvance()
    {
		window.localStorage.shopState = Number(window.localStorage.shopState) + 1;
		setShopHeader(shopText[Number(window.localStorage.shopState)]);
	}

	function shopDialogue()
    {
		if (window.localStorage.adoptedShuckle === "false" && 
            window.localStorage.shopState === '6')
            props.shopHandler();
		else if (window.localStorage.adoptedShuckle === "true" && 
                 window.localStorage.shopState === '7') {
			shopAdvance();
			props.shopHandler();
		}
        else shopAdvance();
	}

	function shuckleAdopter()
    {
        console.log("shuckle adopter?");
		if (Number(window.localStorage.pokeDollars) >= 1000) {
			window.localStorage.adoptedShuckle = true;
			window.localStorage.shopState = 7; 
			window.localStorage.spicyPoffin = 1; 
			setShopHeader(shopText[Number(window.localStorage.shopState)]);
			dollarHandler(-1000);
		}
	}

    // to scared to really question why this is like this
    let currEmote;
    if (Number(window.localStorage.shopState) <= 3)
            currEmote = Number(window.localStorage.shopState);
    else currEmote = emote.NEUTRAL; 

    if (window.localStorage.adoptedShuckle === "true")
            currEmote = emote.HAPPY;
    // -------------------------------------------------------------------------

	function shuckleShop() 
    {
        return (
            <div className = {classes.shuckleDisplay}> 
                <img className = {classes.header}
                     src = {require("../assets/shopHeaderLight.png")}/>
                <div className = {classes.subheader}>
                    {shopText[Number(window.localStorage.shopState)]}
                </div>
                <img className = {classes.shucklePic}
                     src = {require("../assets/213Shuckle" + currEmote + ".png")}/>

                {window.localStorage.adoptedShuckle === "false" &&
                    <div style = {{display:"flex",width:"248px",justifyContent:"space-between"}}>
                        <div>
                            <div className = {classes.sellInfo}> 
                                <img src = {require("../assets/pokedollarLight.png")}/>
                                <p> {" "} {1000} </p>
                            </div>
                            <button onClick = {shuckleAdopter}>
                                Adopt
                            </button>
                        </div>
                        <div className = {classes.icon}>
                            <button onClick = {shopDialogue}>
                                <ExitIcon className = {classes.exitIcon}/>
                            </button>
                        </div>
                    </div>
                }
                {window.localStorage.adoptedShuckle === "true" &&
                    <div className = {classes.icon}>
                        <button onClick = {shopDialogue}>
                            <ExitIcon className = {classes.exitIcon}/>
                        </button>
                    </div>

                }
            </div>
        )
    }

    function display(item)
    {
        return (
            <div className = {classes.item}>
                <div className = {item.props.name=="lemonade" && classes.lemonade || null}>
                    {item}
                </div>
                <div className = {classes.attempt}>
                    <div className = {classes.priceInfo}>
                        <img src = {require("../assets/pokedollarLight.png")}/>
                        <p> {" "} {item.props.price} </p> 
                    </div> 
                    <button onClick = {() => buy(item)}> Buy </button>
                </div>
            </div>
        )
    }

	function buy(item)
    {
		if (Number(window.localStorage.pokeDollars) >= item.props.price) {
            const itemCount = localStorage.getItem(item.props.name);
            localStorage.setItem(item.props.name, Number(itemCount) + 1); 
			dollarHandler(-(item.props.price));
		}
	}

	function regularShop()
    {
        return (
            <div className = {classes.shopDisplay}>
                <img className = {classes.header}
                     src = {require("../assets/shopHeaderLight.png")}/>
                <div className = {classes.subheader}>
                    {shopText[Number(window.localStorage.shopState)]}
                </div>

                <div className = {classes.menu}> 
                    <div className = {classes.rowDisplay}> 
                        {display(items[0])}
                        {display(items[1])}
                    </div>
                    <div className = {classes.rowDisplay}> 
                        {display(items[2])}
                        {display(items[3])}
                    </div>
                    <div className = {classes.rowDisplay}>
                        {window.localStorage.ticket0 === "0" &&
                            display(items[4])
                        }
                        {window.localStorage.ticket0 === "1" &&
                            display(items[5])
                        }
                        <div className = {classes.icon} style={{marginLeft:"60px"}}>
                            <button onClick = {props.shopHandler}>
                                <ExitIcon className = {classes.exitIcon}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

	return (
		<>
			{Number(window.localStorage.shopState) <= 7 && shuckleShop()}
			{Number(window.localStorage.shopState) > 7 && regularShop()}
		</>
	)
}

export default ShopDisplay;
