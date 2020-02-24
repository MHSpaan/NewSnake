import React, { FC } from "react";
import { Board } from "../board/Board";
import { Information } from "./Information/Information";
import styles from "./Game.module.css";

interface GameProps {}

export const Game: FC<GameProps> = () => {
	return (
		<div className={styles.game}>
			<Information />
			<Board />
		</div>
	);
};
