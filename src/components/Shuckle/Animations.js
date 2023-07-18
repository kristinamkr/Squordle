/*
 * Animations.js
*/

import classes from './style/Animations.module.css';
import action from './Actions';

import { useState } from 'react';

function Animations(props)
{
    const { 
        focus, 
        shuckle, 
        shucklePos, 
        targetPos, 
        targetReached,
        babyPositions, 
    } = props;

    function animate(name, pos, offset) 
    {
        return (
            <img className = {classes[name]}
                 style = {{top: (pos[0] - offset[0]) + 'px', 
                           left: (pos[1] - offset[1]) + 'px'}}
                 src = {require('../../assets/' + name + '.gif')}/>
        )
    }

    function animateChildren()
    {
        if (babyPositions.length === 0) return;

        return (
            <>{ shuckle['children'].map((child) => (
                <img className = {classes.shuckle}
                    style = {{
                        top: babyPositions[child.number][0] + "px",
                        left: babyPositions[child.number][1] + "px" 
                    }}
                    src = {require("../../assets/" + child.state + ".gif")}
                    key = {child.number}
                />
            )) }</>
        )
    }

    return (
        <>
            {!JSON.parse(localStorage.shuckleInfo)['shiny'] && 
                animate('shuckle', shucklePos, [16, 32])}
            {JSON.parse(localStorage.shuckleInfo)['shiny'] && 
                animate('shuckleShiny', shucklePos, [16, 32])}

            {shuckle['focus'] === focus.MOUSE && shuckle['action'] === action.SING
                && animate("sing", shucklePos, [32, 26])}
            {shuckle['focus'] === focus.MOUSE && !(shuckle['action'] === action.SING)
                && targetReached 
                && animate('love', shucklePos, [26, 26])}
            {shuckle['focus'] === focus.ITEM && targetReached 
                && animate('chomp', targetPos , [31, 31])}
            {shuckle['focus'] === focus.KEY && shuckle['action'] === action.ANGRY 
                && targetReached 
                && animate('slash', targetPos, [0, 0])}
            
            {shuckle['action'] === action.ANGRY 
                && animate('anger', shucklePos, [36, 2])}
            {shuckle['action'] === action.BIRTHING
                && animate('love', shucklePos, [26, 26])}

            {shuckle['children'].length > 0
                && ( <> { animateChildren() } </> )}
        </>
    )
}

export default Animations;
