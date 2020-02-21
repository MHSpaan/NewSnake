import { createContext } from "react";
import { observable, action } from "mobx";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../helpers";
import { Coordinate } from "../types";

class SnakeStore {
	@observable
	direction: Coordinate = { x: 0, y: 0 };

	@observable
	snakeHead: Coordinate = {
		x: Math.floor(BOARD_WIDTH / 2),
		y: Math.floor(BOARD_HEIGHT / 2),
	};

	@observable
	snakeBody: [Coordinate] = [{ x: 0, y: 0 }];

	@action
	moveSnakeHead = () => {
		this.snakeHead.x += this.direction.x;
		this.snakeHead.y += this.direction.y;
		this.updateBody();
	};

	private updateBody: () => void = () => {
		this.snakeBody.pop();
		this.addBodySegment(this.snakeHead);
	};

	@action
	getCandy = (pos: Coordinate) => {
		this.addBodySegment(pos);
	};

	private addBodySegment = (pos: Coordinate) => {
		this.snakeBody.unshift({ x: pos.x, y: pos.y });
	};
}

export const SnakeStoreContext = createContext(new SnakeStore());
