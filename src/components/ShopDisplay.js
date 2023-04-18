import classes from "./style/ShopDisplay.module.css";
import items from './Items.js';

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";
import { useState } from 'react'; // useEffect } from 'react';

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
	const [counter, setCounter] = useState(Number(localStorage.shopState));

	function shopAdvance()
    {
		localStorage.shopState = Number(localStorage.shopState) + 1;
		setCounter(Number(localStorage.shopState));
	}

	function shopDialogue()
    {
       if (!(JSON.parse(localStorage.shuckleInfo)["adopted"])) {
            if (Number(localStorage.shopState) < 6) 
                shopAdvance(); 
            else if (Number(localStorage.shopState) === 6)
                props.shopHandler();
        }
        else if (JSON.parse(localStorage.shuckleInfo)["adopted"]) {
            if (Number(localStorage.shopState) === 7) {
                shopAdvance();
                props.shopHandler();
            }
        }
    }

	function shuckleAdopter()
    {
        let tempInfo = JSON.parse(localStorage.shuckleInfo);
        tempInfo["adopted"] = true;
        let tempItems = JSON.parse(localStorage.inventory);
        tempItems["spicyPoffin"] = 1;

		if (Number(localStorage.pokeDollars) >= 1000) {
			localStorage.shopState = 7; 
			localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));
            localStorage.setItem("inventory", JSON.stringify(tempItems));
			dollarHandler(-1000);
		}
	}

    function shuckleEmotion()
    {
        if (JSON.parse(localStorage.shuckleInfo)["adopted"])
            return emote.HAPPY;
    
        if (Number(localStorage.shopState) <= 3)
            return Number(localStorage.shopState);
        return emote.NEUTRAL; 
    }
    // -------------------------------------------------------------------------

	function shuckleShop() 
    {
        return (
            <div className = {classes.shuckleDisplay}> 
                <img className = {classes.header}
                     src = {require("../assets/shopHeaderLight.png")}/>
                <div className = {classes.subheader}>
                    {shopText[Number(localStorage.shopState)]}
                </div>
                <img className = {classes.shucklePic}
                     src = {require("../assets/213Shuckle" + shuckleEmotion() + ".png")}/>

                {!(JSON.parse(localStorage.shuckleInfo)["adopted"]) &&
                    <div style = {{display: "flex",
                                   width: "248px",
                                   justifyContent:"space-between"}}>
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
                {JSON.parse(localStorage.shuckleInfo)["adopted"] &&
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
                <div className = {item.props.name === "lemonade" && classes.lemonade || null}>
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
		if (Number(localStorage.pokeDollars) >= item.props.price) {
            let tempItems = JSON.parse(localStorage.inventory);
            if (item.props.name === "ticket")
                tempItems[`${item.props.name}`] = true;
            else
                tempItems[`${item.props.name}`] = tempItems[`${item.props.name}`] + 1;
            localStorage.setItem("inventory", JSON.stringify(tempItems)); 
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
                    {shopText[Number(localStorage.shopState)]}
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
                        {!(JSON.parse(localStorage.inventory)["ticket"]) &&
                            display(items[4])
                        }
                        {JSON.parse(localStorage.inventory)["ticket"] &&
                            display(items[5])
                        }
                        <div className = {classes.icon} 
                             style = {{marginLeft: "60px"}}>
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
			{Number(localStorage.shopState) <= 7 && shuckleShop()}
			{Number(localStorage.shopState) > 7 && regularShop()}
		</>
	)
}

export default ShopDisplay;
