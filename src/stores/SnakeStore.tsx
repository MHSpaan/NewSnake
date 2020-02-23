import { createContext, useContext } from "react";
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
	lastMove: Coordinate = {
		x: 0,
		y: 0
	}

	@observable
	snakeBody: [Coordinate] = [{ x: 0, y: 0 }];

	@action
	moveSnakeHead = () => {
		this.snakeHead.x += this.direction.x;
		this.snakeHead.y += this.direction.y;
		this.lastMove = this.direction;
		this.updateBody();
	};

	@action
	updateDirection = (direction: Coordinate) => {
		this.direction = direction;
	}

	@action
	private updateBody: () => void = () => {
		this.snakeBody.pop();
		this.addBodySegment(this.snakeHead);
	};

	@action
	getCandy = (pos: Coordinate) => {
		this.addBodySegment(pos);
	};

	@action
	private addBodySegment = (pos: Coordinate) => {
		this.snakeBody.unshift({ x: pos.x, y: pos.y });
	};
}

export const SnakeStoreContext = createContext(new SnakeStore());
