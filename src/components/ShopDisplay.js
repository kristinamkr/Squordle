import classes from "./style/ShopDisplay.module.css";
import itemData from './ItemData';
import Item from './Item';

import { ReactComponent as ExitIcon } from "../assets/exitIcon.svg";
import { useContext, useState } from 'react';
import { GameContext } from '../Squordle.js';

function ShopDisplay(props)
{
    const { 
        dollarHandler,
    } = useContext(GameContext); 

	const emote = {
        HAPPY:   0,
        SAD:     1,
        WEEPY:   2,
        NEUTRAL: 3
    };
    Object.freeze(emote);

	const shuckleText = [
        "Would you like to adopt our Shuckle?",
        "Please adopt him! Look! He's so sad.",
        "Please! I'm begging you!",
        "Okay. I understand. It's not your fault.",
        "It's just that our clientele has been dwindling and "
         + "we can't afford to feed our family much longer.",
        "We love our Shuckle so much, but maybe we can buy " 
         + "ourselves more time if someone would adopt him.",
        "If you know anyone who can help, "
         + "please send them our way.",
        "Thank you! Please take this spicy poffin as a gift. "
    ];

    const shopText = [
        "Welcome to Hop & Pip's! We're currently low on stock...",
        "Welcome back! We can't thank you enough for adopting our Shuckle!"
    ];

	const [counter, setCounter] = useState(Number(localStorage.shopState));
    const [shopDisplay, setShopDisplay] = useState(false); // 0 - shuckle, 1 - shop
    const [shuckleAdoption, setShuckleAdoption] = 
        useState(JSON.parse(localStorage.shuckleInfo)['adopted']);

	function advanceDialogue()
    {
		localStorage.shopState = Number(localStorage.shopState) + 1;
		setCounter(Number(localStorage.shopState));
	}

	function shopDialogue()
    {
       if (!(JSON.parse(localStorage.shuckleInfo)["adopted"])) {
            if (Number(localStorage.shopState) < 6) 
                advanceDialogue(); 
            else if (Number(localStorage.shopState) === 6)
                props.shopHandler();
        }
        else if (JSON.parse(localStorage.shuckleInfo)["adopted"]) {
            if (Number(localStorage.shopState) === 7) {
                advanceDialogue();
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
    function toggleShopDisplay()
    {
        setShopDisplay(!shopDisplay);
    }

	function shuckleShop() 
    {
        return (
            <div className = {classes.shuckleDisplay}> 
                <button className={classes.shuckleTabActive}/>
                <button className={classes.shopTabInactive}
                        onClick= {toggleShopDisplay}/> 
                <img className = {classes.header}
                     src = {require("../assets/shopHeaderLight.png")}/>
                <div className = {classes.subheader}>
                    {shuckleText[Number(localStorage.shopState)]}
                </div>
                <img className = {classes.shucklePic}
                     src = {require("../assets/213Shuckle" + 
                                shuckleEmotion() + ".png")}/>

                {!(JSON.parse(localStorage.shuckleInfo)["adopted"]) &&
                    <div style = {{display: "flex",
                                   width: "248px",
                                   justifyContent:"space-between"}}>
                        <div>
                            <div className = {classes.sellInfo}> 
                                <img src = 
                                    {require("../assets/pokedollarLight.png")}/>
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
                <div className = 
                    {item.props.name === "lemonade" && classes.lemonade || null}>
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
                { !shuckleAdoption && 
                <>
                <button className={classes.shopTabActive}/>
                <button className={classes.shuckleTabInactive}
                        onClick= {toggleShopDisplay}/> 
                </>

                }
                <img className = {classes.header}
                     src = {require("../assets/shopHeaderLight.png")}/>
                <div className = {classes.subheader}>
                    {!shuckleAdoption && shopText[0]}
                    {shuckleAdoption && shopText[1]}
                </div>

                <div className = {classes.menu}> 
                    {shuckleAdoption && <>
                        <div className = {classes.rowDisplay}> 
                            {display(<Item {...itemData[0]} />)}
                            {display(<Item {...itemData[1]} />)}
                        </div>
                        <div className = {classes.rowDisplay}> 
                            {display(<Item {...itemData[2]} />)}
                            {display(<Item {...itemData[3]} />)}
                        </div>
                    </>}
                    {!shuckleAdoption && <>
                        <div className = {classes.rowDisplay}> 
                            {display(<Item {...itemData[5]} />)}
                            {display(<Item {...itemData[5]} />)}
                        </div>
                        <div className = {classes.rowDisplay}> 
                            {display(<Item {...itemData[5]} />)}
                            {display(<Item {...itemData[5]} />)}
                        </div>
                    </>}
                    <div className = {classes.rowDisplay}>
                        {!(JSON.parse(localStorage.inventory)["ticket"]) &&
                            display(<Item {...itemData[4]} />)
                        }
                        {JSON.parse(localStorage.inventory)["ticket"] &&
                            display(<Item {...itemData[5]} />)
                        }
                        <div className = {classes.icon} 
                             style = {{marginLeft: "80px"}}>
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
        { (shopDisplay == 0 || shuckleAdoption) && 
            regularShop() }
        { shopDisplay == 1 && !shuckleAdoption &&
            shuckleShop() }
		</>
	)
}

export default ShopDisplay;
