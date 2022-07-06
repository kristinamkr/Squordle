import classes from "./GameRow.module.css";
import GuessBox from "./GuessBox.js";

function GameRow(props) {
	return (
		<div className={classes.GameRow} style={{gridTemplateColumns:"1fr ".repeat(props.length)}}>
			{props.boxes.map((box) => (<GuessBox
				key={box.id}
				id={box.id} 
				delay={box.delay}
				state={box.state}
				letter={box.letter}
				/>))
			}
		</div>
	)
}

export default GameRow;