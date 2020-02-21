import { observable, action } from "mobx";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../helpers";
import { createContext } from "react";

class BoardStore {
	@observable
	board: Array<Array<string>> = new Array(BOARD_HEIGHT)
		.fill(0)
		.map((a: []) => new Array(BOARD_WIDTH).fill(0));

	@action
	updateBoard: (snake: Array<Array<string>>) => void = snake => {
		this.board = snake;
	};
}
export const BoardStoreContext = createContext(new BoardStore());
