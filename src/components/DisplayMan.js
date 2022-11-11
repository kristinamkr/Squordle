import Backdrop from "./Backdrop.js";
import WinDisplay from "./WinDisplay.js";
import LoseDisplay from "./LoseDisplay.js";
import InfoDisplay from "./InfoDisplay.js";   
import ShopDisplay from "./ShopDisplay.js";

import classes from "./style/DisplayMan.module.css";

function DisplayMan(props)
{
    var displayState = props.displayState
    var setDisplayState = props.setDisplayState
    var gameSpace = props.gameSpace
    var infoHandler = props.infoHandler
    var dollarHandler = props.dollarHandler
    var shopHandler = props.shopHandler
    var pokeAnswer = props.pokeAnswer;

    return (
        <div className = {classes.DisplayMan}>
            {displayState["showBackdrop"] && <Backdrop/>}
            {displayState["showWinPage"] && 
                <WinDisplay setDisplayState = {setDisplayState}
                    gameSpace = {gameSpace}
                    pokeAnswer = {pokeAnswer} />}
            {displayState["showLosePage"] && 
                <LoseDisplay setDisplayState = {setDisplayState} 
                    gameSpace = {gameSpace}/>}
            {displayState["showInfo"] && 
                <InfoDisplay infoHandler = {infoHandler}/>}
            {displayState["showShop"] && 
                <ShopDisplay dollarHandler = {dollarHandler} 
                    shopHandler = {shopHandler}/>}
        </div>
    )
}

export default DisplayMan;
