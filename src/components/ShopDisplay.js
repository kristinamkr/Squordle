/*
 * ShopDisplay.js
*/ 

import classes from "./style/ShopDisplay.module.css";
import inventory from './Inventory.js';

import { useState, useEffect } from 'react';

function ShopDisplay(props)
{
	const emotion = { NEUTRAL: 0,
                      HAPPY:   1,
                      SAD:     2,
                      WEEPY:   3};
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
		if (window.localStorage.adoptedShuckle === "false" 
                && window.localStorage.shopState === '6')
			props.shopHandler();
		else if (window.localStorage.adoptedShuckle === "true" 
                && window.localStorage.shopState === '7') {
			shopAdvance();
			props.shopHandler();
		}
        else shopAdvance();
	}

	function shuckleAdopter()
    {
		if (Number(window.localStorage.pokeDollars) >= 1000) {
			window.localStorage.adoptedShuckle = true;
			window.localStorage.shopState = 7;    // # of items ?
			window.localStorage.spicyPoffin = 1;  // free Poffin
			setShopHeader(shopText[Number(window.localStorage.shopState)]);
			dollarHandler(-1000);
		}
	}

	function buy(item)
    {
		if (Number(window.localStorage.pokeDollars) >= item.props.price) {
            const itemCount = localStorage.getItem(item.props.name);
            localStorage.setItem(item.props.name, Number(itemCount) + 1); 
			dollarHandler(-(item.props.price));
		}
	}

	var currentEmotion = emotion.HAPPY;

	if (Number(window.localStorage.shopState) <=6 )
		currentEmotion = Number(window.localStorage.shopState);
	else
		currentEmotion = emotion.HAPPY;

	var shuckleShop = (
		<div className = {classes.display}> <p/>
			<img className = {classes.header}
                 src = {require("../assets/shopHeaderLight.png")}/>
			<div className = {classes.subheader}>
                {shopText[Number(window.localStorage.shopState)]}
            </div>
			<img style = {{width: "80%"}} 
                 src = {require("../assets/213Shuckle" + currentEmotion + ".png")}/>

			<div className = {classes.shuckleFormat}> 
				{window.localStorage.adoptedShuckle === "false" && 
                <div className = {classes.center}>
                    <div className = {classes.noname}> 
                        <img style = {{height: "26px"}} 
                             src = {require("../assets/pokedollarLight.png")}/>
                        {" "} {1000}
                    </div>
                    <button onClick = {shuckleAdopter}>
                        Adopt
                    </button>
                </div> }

				<button onClick = {shopDialogue}>
                    Leave
                </button>
			</div>
        <p/> </div>
    );

	var regularShop = (
		<div className = {classes.display}>
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

					<div className = {classes.buttonWrapper}>
						<button onClick = {props.shopHandler}>
                            Leave
                        </button>
					</div>
				</div>
			</div>
		</div>
    );

    function display(item)
    {
        return (
            <div className = {classes.item}>
                {item}
                <img style = {{height: "26px"}}
                     src = {require("../assets/pokedollarLight.png")}/>
                {" "} {item.props.price}
                <button onClick = {() => buy(item)}> Buy </button>
            </div>
        )
    }

	return (
		<div className = {classes.shopDisplay}>
			{Number(window.localStorage.shopState) <= 7 && shuckleShop}
			{Number(window.localStorage.shopState) > 7 && regularShop}
		</div>
	)
}

export default ShopDisplay;
