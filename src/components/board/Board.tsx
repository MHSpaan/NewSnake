import styles from "./Board.module.css";
import React, { FC, useContext, KeyboardEvent, useState } from "react";
import { BoardStoreContext } from "../../stores/BoardStore";
import { SnakeStoreContext } from "../../stores/SnakeStore";
import { Cell } from "../Cell/Cell";
import { observer } from "mobx-react";
import { useInterval } from "../../hooks/useInterval";

export const Board: FC = observer(() => {
	const boardStore = useContext(BoardStoreContext);
	const snakeStore = useContext(SnakeStoreContext);
	const [delay, setDelay] = useState<number | null>(null);

	useInterval(() => {
		snakeStore.moveSnakeHead();
		boardStore.updateBoard(snakeStore.snakeHead, snakeStore.snakeBody);
	}, delay);

	const changeDirection = (e: KeyboardEvent) => {
		setDelay(100);
		console.log(e.keyCode);
		switch (e.keyCode) {
			case 37:
				if (snakeStore.direction.y !== 1 && snakeStore.lastMove.y !== 1) {
					snakeStore.updateDirection({ x: 0, y: -1 });
				}
				break;
			case 38:
				if (snakeStore.direction.x !== 1 && snakeStore.lastMove.x !== 1) {
					snakeStore.updateDirection({ x: -1, y: 0 });
				}
				break;
			case 39:
				if (snakeStore.direction.y !== -1 && snakeStore.lastMove.y !== -1) {
					snakeStore.updateDirection({ x: 0, y: 1 });
				}
				break;
			case 40:
				if (snakeStore.direction.x !== -1 && snakeStore.lastMove.x !== -1) {
					snakeStore.updateDirection({ x: 1, y: 0 });
				}
				break;
		}
	};

	return (
		<div onKeyDown={changeDirection} className={styles.board} tabIndex={0}>
			{boardStore.board.map((row: Array<string>, rowIndex: number) => (
				<div key={rowIndex} className={styles.row}>
					{row.map((cell: string, cellIndex: number) => (
						<Cell key={cellIndex} cell={cell} />
					))}
				</div>
			))}
		</div>
	);
});
