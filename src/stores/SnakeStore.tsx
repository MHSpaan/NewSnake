import { createContext } from "react";
import { observable, action } from "mobx";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../helpers";
import { Coordinate } from "../types";

class SnakeStore {
	@observable
	direction: Coordinate = { x: 0, y: 0 };

	@action
	getSnakeHead = (): Coordinate => {
		return {
			x: Math.floor(BOARD_WIDTH / 2),
			y: Math.floor(BOARD_HEIGHT / 2),
		};
	};

	@observable
	snakeHead: Coordinate = this.getSnakeHead();

	@observable
	lastMove: Coordinate = {
		x: 0,
		y: 0,
	};

	@observable
	snakeBody: Coordinate[] = [this.getSnakeHead()];

	@action
	moveSnakeHead = (
		board: Array<Array<string>>,
		spawnCandy: () => void,
		setGameOver: (value: boolean) => void,
		increaseScore: () => void,
	) => {
		if (
			this.snakeHead.x + this.direction.x < 0 ||
			this.snakeHead.x + this.direction.x > BOARD_HEIGHT - 1 ||
			this.snakeHead.y + this.direction.y < 0 ||
			this.snakeHead.y + this.direction.y > BOARD_WIDTH - 1 ||
			board[this.snakeHead.x + this.direction.x][
				this.snakeHead.y + this.direction.y
			] === "B"
		) {
			setGameOver(true);
		} else {
			this.updateBody();

			if (
				board[this.snakeHead.x + this.direction.x][
					this.snakeHead.y + this.direction.y
				] === "C"
			) {
				increaseScore();
				this.getCandy(spawnCandy);
			}
			this.snakeHead.x += this.direction.x;
			this.snakeHead.y += this.direction.y;
			this.lastMove = this.direction;
		}
	};

	@action
	updateDirection = (direction: Coordinate) => {
		this.direction = direction;
	};

	@action
	private updateBody: () => void = () => {
		this.snakeBody.pop();
		this.addBodySegment(this.snakeHead);
	};

	@action
	getCandy = (spawnCandy: () => void) => {
		this.addBodySegment(this.snakeBody[0]);
		spawnCandy();
	};

	@action
	private addBodySegment = (pos: Coordinate) => {
		this.snakeBody.unshift({ x: pos.x, y: pos.y });
	};

	@action
	reset = (): void => {
		this.direction = { x: 0, y: 0 };
		this.snakeHead = this.getSnakeHead();
		this.snakeBody = [this.getSnakeHead()];
	};
}

export const SnakeStoreContext = createContext(new SnakeStore());
