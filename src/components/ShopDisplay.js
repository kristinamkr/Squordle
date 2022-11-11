/*
 * ShopDisplay.js
*/ 

import classes from "./style/ShopDisplay.module.css";

import { useState, useEffect } from 'react';

function ShopDisplay(props)
{
	var dollarHandler = props.dollarHandler;

	var shopText = ["Would you like to adopt a Shuckle?",
                    "Please adopt him! Look! He's so lonely.",
                    "Please! I'm begging you!",
                    "Okay. I understand. It's not your fault.",
                    "It's just that our clientele has been dwindling and "
                     + "we can't afford to feed our family much longer.",
                    "We love our Shuckle so much, but maybe we can buy " 
                     + "ourselves more time if someone would adopt him.",
                    "If you know anyone who can help, please send them our way.",
                    "Thank you! Please take this poffin as well. " 
                     + "If you come back again, we will have items to sell you.",
                    "Welcome back! Feel free to browse."]

	var emotionDict = {0: "Happy",
                       1: "Sad",
                       2: "Weepy",
                       3: "Neutral",
                       4: "Neutral",
                       5: "Neutral",
                       6: "Neutral"};

	const [shopHeader, setShopHeader] = 
        useState(shopText[Number(window.localStorage.shopState)]);

	function shopAdvance()
    {
		window.localStorage.shopState = Number(window.localStorage.shopState) + 1;
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
        else
			shopAdvance();
	}

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

	var adoptButton = (
		<div style = {{display: "flex", flexDirection:"column"}}>
				<div style = {{alignItems: "center",
                               display: "flex",
                               flexDirection: "row",
                               fontSize: "2rem"}}>
					<img style = {{height:"26px"}} 
                         src={require("../assets/pokedollarLight.png")}/>
                    {" "}{1000}
	          	</div>
			<button onClick = {shuckleAdopter}>
                Adopt
            </button>
		</div>
    )

	function shopItem(price, asset, buyFunc) 
    {
		return (
			<div className = {classes.listRow}>
				{asset}
				<div>
					<div style = {{display: "flex", flexDirection:"column"}}>
						<div style = {{alignItems: "center", 
                                       display: "flex",
                                       flexDirection: "row",
                                        fontSize: "2rem"}}>
							<img style = {{height: "26px"}}
                                 src = {require("../assets/pokedollarLight.png")}/>
				          	{" "}{price}
			          	</div>
                        <button onClick = {buyFunc}>
                            Buy
                        </button>
					</div>
				</div>
			</div>
		)
	} 

	var spicyImage = (
		<div style = {{display:"flex", flexDirection:"column"}}>
			<img style = {{width:"68px"}} 
                 src = {require("../assets/spicyPoffin.png")}/>
		</div>
    );
	var sweetImage = (
		<div style = {{display:"flex", flexDirection:"column"}}>
			<img style = {{width:"68px"}} 
                 src = {require("../assets/sweetPoffin.png")}/>
		</div>
    );
	var bitterImage = (
		<div style = {{display:"flex", flexDirection:"column"}}>
			<img style = {{width:"68px"}} 
                 src = {require("../assets/bitterPoffin.png")}/>
		</div>
    );
	var goldImage = (
		<div style = {{display:"flex", flexDirection:"column"}}>
			<img style={{width:"68px"}} 
                 src={require("../assets/goldPoffin.png")}/>
		</div>
    );
	var lemonadeImage = (
		<div style = {{display:"flex", flexDirection:"column"}}>
			<img style = {{paddingLeft: "6px",
                           paddingRight: "6px",
                           width: "56px",
                           height: "100%"}} 
                 src={require("../assets/lemonade.png")}/>
		</div>
    );

	function spicyBuyer()
    {
		if (Number(window.localStorage.pokeDollars) >= 250){
			window.localStorage.spicyPoffin = 
                Number(window.localStorage.spicyPoffin) + 1
			dollarHandler(-250);
		}
	}

	function sweetBuyer()
    {
		if (Number(window.localStorage.pokeDollars) >= 400){
			window.localStorage.sweetPoffin = 
                Number(window.localStorage.sweetPoffin) + 1
			dollarHandler(-400);
		}
	}
    
	function bitterBuyer() 
    {
		if (Number(window.localStorage.pokeDollars) >= 200){
			window.localStorage.bitterPoffin = 
                Number(window.localStorage.bitterPoffin) + 1
			dollarHandler(-200);
		}
	}

	function goldBuyer() 
    {
		if (Number(window.localStorage.pokeDollars) >= 1000) {
			window.localStorage.goldPoffin 
                = Number(window.localStorage.goldPoffin)+1
			dollarHandler(-1000);
		}
	}

	function lemonadeBuyer()
    {
		if (Number(window.localStorage.pokeDollars) >= 100) {
			window.localStorage.lemonade = 
                Number(window.localStorage.lemonade)+1;
			dollarHandler(-100);
		}
	}

	var currentEmotion = "Happy";

	if (Number(window.localStorage.shopState) <=6 )
		currentEmotion = emotionDict[Number(window.localStorage.shopState)];
	else
		currentEmotion = "Happy";

	var sellingShuckle = (
		<div className = {classes.shuckleDisplay}>
			<p/>
			<img style = {{width: "80%",
                           paddingBottom: "20px",
                           borderBottom: "2px solid #808080"}} 
                 src = {require("../assets/shopHeaderLight.png")}/>
			<div style = {{width:"80%",
                           textAlign: "center",
                           paddingTop: "10px"}}>{
                shopText[Number(window.localStorage.shopState)]}
            </div>
			<img style = {{width: "80%"}} 
                 src = {require("../assets/213Shuckle" + currentEmotion + ".png")}/>
			<div style = {{width:"60%", 
                           alignItems: "flex-end",
                           justifyContent: "space-between",
                           display: "flex",
                           flexDirection:"row"}}>
				{window.localStorage.adoptedShuckle === "false" && adoptButton}
				<button style={{height:"100%"}} onClick={shopDialogue}>
                    Leave
                </button>
			</div>
			<p/>
		</div>
    );

	var regularShop = (
		<div className = {classes.regularDisplay}>
			<p/>
			<img style = {{width:"80%",
                           paddingBottom: "20px",
                           borderBottom: "2px solid #808080"}} 
                 src = {require("../assets/shopHeaderLight.png")}/>
			<div style = {{width: "80%",
                           textAlign: "center",
                           paddingTop: "10px"}}>
                {shopText[Number(window.localStorage.shopState)]}
            </div>
			<div style = {{width: "400px",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "center"}}>
				<div style = {{paddingLeft: "30px",
                               paddingRight: "40px",
                               display: "inherit",
                               flexDirection: "row",
                               justifyContent:"space-between"}}>
					{shopItem(250,spicyImage,spicyBuyer)}
					{shopItem(400,sweetImage,sweetBuyer)}
				</div>
				<div style = {{paddingLeft: "30px",
                               paddingRight: "40px",
                               display: "inherit",
                               flexDirection: "row",
                               justifyContent: "space-between"}}>
					{shopItem(200,bitterImage,bitterBuyer)}
					{shopItem(995,goldImage,goldBuyer)}
				</div>
				<div style = {{paddingLeft: "30px",
                               paddingRight: "40px",
                               display: "inherit",
                               flexDirection:"row",
                                justifyContent:"space-between"}}>
					{shopItem(100,lemonadeImage,lemonadeBuyer)}
					<div style = {{height: "52px",
                                   width: "64px",
                                   paddingTop:"32px"}}>
						<button style = {{height:"100%",width:"100%"}} 
                                onClick = {props.shopHandler}>
                            Leave
                        </button>
					</div>
				</div>
			</div>
			<p/>
		</div>
    );

	return (
		<div className = {classes.shuckleDisplay}>
			{Number(window.localStorage.shopState) <= 7 && sellingShuckle}
			{Number(window.localStorage.shopState) > 7 && regularShop}
		</div>
	)
}

export default ShopDisplay;
