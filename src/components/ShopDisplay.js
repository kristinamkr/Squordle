/*
 * ShopDisplay.js
*/ 

import classes from "./style/ShopDisplay.module.css";
import inventory from './Inventory.js';

import { useState, useEffect } from 'react';

function ShopDisplay(props)
{
	const emotion = {HAPPY:   0,
                     SAD:     1,
                     WEEPY:   2,
                     NEUTRAL: 3};
    Object.freeze(emotion);

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

	const [shopHeader, setShopHeader] = 
        useState(shopText[Number(window.localStorage.shopState)]);

	var dollarHandler = props.dollarHandler;

	function shopAdvance()
    {
		window.localStorage.shopState = 
            Number(window.localStorage.shopState) + 1;
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

    // i dont know what i did here
	let emote = emotion.HAPPY;
	if (Number(window.localStorage.shopState) <= 3)
		emote = Number(window.localStorage.shopState);
	else 
        emote = emotion.NEUTRAL;

	function shuckleAdopter()
    {
		if (Number(window.localStorage.pokeDollars) >= 1000) {
			window.localStorage.adoptedShuckle = true;
			window.localStorage.shopState = 7; 
			window.localStorage.spicyPoffin = 1; 
			setShopHeader(shopText[Number(window.localStorage.shopState)]);
			dollarHandler(-1000);
		}
	}

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
                     src = {require("../assets/213Shuckle" + emote + ".png")}/>

                {window.localStorage.adoptedShuckle === "false" &&
                    <div className = {classes.something}>
                        <div className = {classes.sellInfo}> 
                            <img src = {require("../assets/pokedollarLight.png")}/>
                            <p> {" "} {1000} </p>
                        </div>
                        <div className = {classes.adopt}>
                            <button onClick = {shuckleAdopter}>
                                Adopt
                            </button> 
                        </div>
                    </div>
                }

                <button onClick = {shopDialogue}>
                    Leave
                </button>

            </div>
        )
    }

    function display(item)
    {
        return (
            <div className = {classes.item}>
                {item}
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
                        {display(inventory[0])}
                        {display(inventory[1])}
                    </div>
                    <div className = {classes.rowDisplay}> 
                        {display(inventory[2])}
                        {display(inventory[3])}
                    </div>
                    <div className = {classes.rowDisplay}>
                        {display(inventory[4])}
                    <button className = {classes.leave}
                            onClick = {props.shopHandler}>
                        Leave
                    </button>
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
