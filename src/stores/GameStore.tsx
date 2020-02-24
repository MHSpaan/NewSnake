import { createContext } from "react";
import { observable, action } from "mobx";

class GameStore {
  @observable
  gameOver: boolean = false;

  @action
  setGameOver = (value: boolean) => {
    this.gameOver = value;
    this.delay = null;
  };

  @observable
  delay: number | null = null;

  @action
  setDelay = () => {
    this.delay = 200 - this.level * 10;
  };

  @observable
  score: number = 0;

  @observable
  level: number = 0;

  @action
  increaseScore = () => {
    this.score++;
    if (this.score === 5) {
      this.score = 0;
      this.level++;
    }
  };

  @action
  reset = () => {
    this.setGameOver(false);
    this.score = 0;
  };
}

export const GameStoreContext = createContext(new GameStore());
