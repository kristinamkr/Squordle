/*
 * ShuckleMechanics.js
*/

import PoffinStorage from './PoffinStorage.js';
import ShuckleCursor from './ShuckleCursor.js';
import { useState , useEffect } from 'react';

function ShuckleMechanics(props)
{
	const [shuckleDir, setShuckleDir] = useState([0, 0, -1])

    return (
        <>
            <PoffinStorage keyDownHandler = {props.keyDownHandler}
                            validKeys = {props.validKeys} />
            <ShuckleCursor keyDownHandler = {props.keyDownHandler}
                           validKeys = {props.validKeys}
                           shuckleDir = {shuckleDir} />
        </>
    )
}

export default ShuckleMechanics;
