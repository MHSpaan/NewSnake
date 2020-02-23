import { observable, action } from "mobx";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../helpers";
import { createContext} from "react";
import { Coordinate } from "../types";

class BoardStore {
	@observable
	board: Array<Array<string>> = new Array(BOARD_HEIGHT)
		.fill(0)
		.map(() => new Array(BOARD_WIDTH).fill(0));

	@action
	updateBoard: (snakeHead: Coordinate, snakeBody: Coordinate[]) => void = (snake, snakeBody) => {
		console.log(snake);
		this.board[snake.x][snake.y] = "H";
		snakeBody.map((coordinate) => {
			this.board[coordinate.x][coordinate.y] = "B";
		})
	};
}
export const BoardStoreContext = createContext(new BoardStore());
