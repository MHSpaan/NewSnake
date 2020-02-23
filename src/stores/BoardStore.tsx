import { observable, action } from "mobx";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../helpers";
import { createContext, useEffect, useContext } from "react";
import { Coordinate } from "../types";

class BoardStore {
	@observable
	board: Array<Array<string>> = new Array(BOARD_HEIGHT)
		.fill(0)
		.map(() => new Array(BOARD_WIDTH).fill(0));

	@action
	updateBoard: (snake: Coordinate) => void = snake => {
		console.log(snake);
		this.board[snake.y][snake.x] = "H";
	};
}
export const BoardStoreContext = createContext(new BoardStore());
