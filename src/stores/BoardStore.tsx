import { observable, action } from "mobx";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../helpers";
import { createContext } from "react";
import { Coordinate } from "../types";

class BoardStore {
  @action
  createBoard = () => {
    return new Array(BOARD_HEIGHT)
      .fill("0")
      .map(() => new Array(BOARD_WIDTH).fill("0"));
  };

  @observable
  board: Array<Array<string>> = this.createBoard();

  @action
  updateBoard: (snakeHead: Coordinate, snakeBody: Coordinate[]) => void = (
    snakeHead,
    snakeBody,
  ) => {
    this.board.map((row: Array<string>, rowIndex: number) =>
      row.map((cell: string, columnIndex: number) => {
        if (cell !== "0" && cell !== "C") {
          return (this.board[rowIndex][columnIndex] = "0");
        } else {
          return (this.board[rowIndex][columnIndex] = cell);
        }
      }),
    );
    this.board[this.candy.x][this.candy.y] = "C";
    snakeBody.map(coordinate => (this.board[coordinate.x][coordinate.y] = "B"));
    this.board[snakeHead.x][snakeHead.y] = "H";
  };

  @action
  spawnCandy = (): void => {
    let candy = this.randomCandy();

    while (this.board[candy.x][candy.y] !== "0") {
      candy = this.randomCandy();
    }

    this.candy = candy;
  };

  @action
  private randomCandy = (): Coordinate => {
    return {
      x: Math.floor(Math.random() * BOARD_HEIGHT),
      y: Math.floor(Math.random() * BOARD_WIDTH),
    };
  };

  @observable
  candy: Coordinate = this.randomCandy();

  @action
  reset = (): void => {
    this.board = this.createBoard();
  };
}
export const BoardStoreContext = createContext(new BoardStore());
