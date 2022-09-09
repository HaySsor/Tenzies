import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Die from "./components/Die/Die";
import Button from "./components/Button/Button";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
	const [dice, setDice] = useState(rollNewDice());
	const [numberOfRoll, setNumberOfRoll] = useState(0);
	const [endGame, setEndGame] = useState(false);

	useEffect(() => {
		const equalValue = dice.every(item => item.value === dice[0].value);
		const Held = dice.every(item => item.isHeld === true);
		Held && equalValue ? setEndGame(true) : "";
	}, [dice]);

	function rollNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}
	function generateNewDie() {
		return {
			id: nanoid(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	function hendleDice(id) {
		setDice(old =>
			old.map(item => {
				return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
			})
		);
	}

	const diceElement = dice.map(item => {
		return (
			<Die
				key={item.id}
				value={item.value}
				isHeld={item.isHeld}
				pickDice={() => hendleDice(item.id)}
			/>
		);
	});

	const rollDice = () => {
		setNumberOfRoll(old => old + 1);
		setDice(old =>
			old.map(item => {
				return item.isHeld === true ? item : generateNewDie();
			})
		);
	};
	function startNewGame() {
		setDice(rollNewDice());
		setEndGame(false);
	}
	function renderWinMessage() {
		if (numberOfRoll < 15) {
			return <p>Wow that wast Amazing !</p>;
		} else {
			return <p>Good job!</p>;
		}
	}

	return (
		<main className={styles.app}>
			{endGame && <Confetti />}
			<div className={styles.box}>
				<h1 className={styles.title}>Tenzies</h1>
				<p className={styles.instructions}>
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
				<div className={styles.contener}>{diceElement}</div>
				<p className={styles.result}>Numbero of roll: {numberOfRoll}</p>
				{endGame ? renderWinMessage() : null}
				<Button roll={rollDice} endGame={endGame} newGame={startNewGame} />
			</div>
		</main>
	);
}

export default App;
