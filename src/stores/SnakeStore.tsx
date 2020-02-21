import { createContext } from "react";
import { observable, action } from "mobx";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../helpers";

class SnakeStore {
	@observable
	direction: { x: number; y: number } = { x: 0, y: 0 };

	@observable
	snakeHead: { x: number; y: number } = {
		x: Math.floor(BOARD_WIDTH / 2),
		y: Math.floor(BOARD_HEIGHT / 2),
	};

	@observable
	snakeBody: [{ x: number; y: number }] = [{ x: 0, y: 0 }];

	@action
	moveSnakeHead: () => void = () => {
		this.snakeHead.x += this.direction.x;
		this.snakeHead.y += this.direction.y;
		this.updateBody();
	};

	private updateBody: () => void = () => {
		this.snakeBody.pop();
		this.addBodySegment(this.snakeHead);
	};

	@action
	getCandy: (pos: { x: number; y: number }) => void = pos => {
		this.addBodySegment(pos);
	};

	private addBodySegment: (pos: { x: number; y: number }) => void = pos => {
		this.snakeBody.unshift({ x: pos.x, y: pos.y });
	};
}

export const SnakeStoreContext = createContext(new SnakeStore());
