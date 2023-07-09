/*
 * useTowardItem.js
*/

import { useState, useEffect } from 'react';

export default function useTowardItem(
    realizeItem, 
    shuckleInfo, 
    setShuckleInfo, 
    focus
) {
    useEffect(() => {
        if (realizeItem[0] && shuckleInfo[1] <= 1)
            setShuckleInfo([focus.ITEM, shuckleInfo[1]]);
    }, [realizeItem[0], shuckleInfo, setShuckleInfo, focus]);
}
