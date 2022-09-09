import React from "react";
import styles from "./Die.module.css";

function Die(props) {
	return (
		<div
			className={`${styles.dice} ${props.isHeld ? styles.pick : ""}`}
			onClick={props.pickDice}>
			{props.value}
		</div>
	);
}

export default Die;
