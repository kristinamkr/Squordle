import classes from "./GameSpace.module.css";
import GameRow from "./GameRow.js";

function GameSpace(props) {
  return (
    <div className={classes.GameSpace}>
      {props.rows.map((row) => (<GameRow
        key = {row.id}
        id = {row.id}
        state = {row.state}
        length = {row.length}
        boxes = {row.boxes}
        />))
      }
    </div>
  )
}

export default GameSpace;