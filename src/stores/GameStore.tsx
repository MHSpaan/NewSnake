import { createContext } from "react";
import { observable, action } from "mobx";

class GameStore {
	@observable
	gameOver: boolean = false;

	@action
	setGameOver = (value: boolean) => {
		this.gameOver = value;
	};

	@observable
	score: number = 0;

	@action
	increaseScore = () => {
		this.score++;
	};

	@action
	reset = () => {
		this.setGameOver(false);
		this.score = 0;
	};
}

export const GameStoreContext = createContext(new GameStore());
