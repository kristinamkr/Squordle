/*
 * utils.js
*/

function isNear(a, b)
{
    if (!a || !b)
        return false;

    const distance = (aVal, bVal) => Math.abs(aVal - bVal);
    return distance(a[0], b[0]) < 25 && distance(a[1], b[1]) < 25;
}

function translateSprite(tPos, currPos, speed)
{
    if (!currPos) return tPos;

    const [t_x, t_y] = [tPos[0], tPos[1]];
    const [curr_x, curr_y] = [currPos[0], currPos[1]];

    const xDir = Math.max
        (Math.min(speed * 0.01 * (t_x - curr_x), 3.5), -3.5);
    const yDir = Math.max
        (Math.min(speed * 0.01 * (t_y - curr_y), 3.5), -3.5);

    return([xDir + curr_x, yDir + curr_y]);
}

function resolveOnceTimedOut(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms)); 
}

export { isNear, translateSprite, resolveOnceTimedOut };
