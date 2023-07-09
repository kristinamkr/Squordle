/*
 * ShuckleBaby.js
*/


    const [babyTargetReached, setBabyTargetReached] = 
        useState(Array(shuckleChildren.length));

    const [shuckleChildren, setShuckleChildren] = 
        useState(JSON.parse(localStorage.shuckleInfo)["children"]);

    const babyPosInit = 
        Array.from({ length: shuckleChildren.length }, () => [0, 0]);
    const [babyPosList, setBabyPosList] = useState(babyPosInit);


    function createBaby()
    {
        return {number: shuckleChildren.length,
                state:  "shuckleEgg0",
                shiny:  0}
    }

    //BABIES
    useEffect(() => {
        setTimeout(() => {
            let currPosList = [[shucklePos[0], shucklePos[1]]];
            for (var i = 0; i < babyPosList.length; i++) {
                currPosList.push(babyPosList[i]);
            }

            let targPosList = [];
            let targReachedList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (!(isNear(babyPosList[i], currPosList[i])))
                    targReachedList.push(0);
                else
                    targReachedList.push(1);
                targPosList.push(currPosList[i]);
            }

            let newPosList = [];
            for (var i = 0; i < babyPosList.length; i++) {
                if (targReachedList[i] == 1)
                    newPosList.push(babyPosList[i]);
                else {
                    let pos = translateSpritePos([targPosList[i][0], 
                                                  targPosList[i][1]-32], 
                                                 babyPosList[i], 
                                                 6);
                    newPosList.push(pos);
                }
            }

            if(shuckleInfo[1] == action.BIRTHING)
                resolveOnceTimedOut(7000);
            else
                setBabyPosList(newPosList);                
            setBabyTargetReached(targReachedList);
        }, 16);
    }, [babyPosList, shucklePos]);

        const layEgg = async () => {
            const baby = createBaby();
            const newFamily = shuckleChildren.concat([baby]);

            // updates the game save 
            // (you had a baby! you wanna remember you had a baby right?)
            let tempInfo = JSON.parse(localStorage.shuckleInfo);
            tempInfo["children"] = newFamily;
            localStorage.setItem("shuckleInfo", JSON.stringify(tempInfo));

            setBabyPosList([[400,-200]].concat(babyPosList));
            setShuckleChildren(newFamily);

            //brings back onscreen
            setHaltInv(false);
            setMobileTargetPos([0,0]);
            setShuckleInfo([focus.MOUSE, action.SING]);
        }

    function animBabies(children, posList)
    {
        //deepCopy and reverse creates the correct render order
        const revChildren = JSON.parse(JSON.stringify(children));

        var sizes = [];
        var sizeOffset = [];
        for(var i = 0; i<posList.length; i++){
            if(posList[i] == undefined){
                posList[i] = [0,0];
            }
            if(revChildren[i].state === "shuckle"){
                sizes = sizes.concat([["48px","48px"]]);
                sizeOffset = sizeOffset.concat([-8]);
            } else {
                sizes = sizes.concat([["32px","32px"]]);
                sizeOffset = sizeOffset.concat([0]);

            }
        }

        revChildren.reverse();

        return (
            <>
                { revChildren.map((child) => (<img className = {classes.shuckle}
                      style = {{top: (posList[child.number][0] + 
                                      sizeOffset[child.number]).toString() + "px",
                                left: (posList[child.number][1] + 
                                      sizeOffset[child.number]).toString() + "px",
                                width: sizes[child.number][0],
                                height: sizes[child.number][1]}}
                      src = {require("../assets/" + child.state + ".gif")}
                      key = {child.number}/>))}
            </>
        )
    }

        else if (shuckleInfo[1] === action.BIRTHING) {
            setHaltInv(true);
            offscreen();
        }
        else if (shuckleInfo[1] === action.LAY_EGG) {
            if(props.realizeItem[0]){
                setShuckleInfo([focus.ITEM, action.NONPLUSSED]);
            } else {
                layEgg();
            }
        }

            {shuckleChildren.length > 0
                && ( <> { animBabies(shuckleChildren, babyPosList) } </> )}
