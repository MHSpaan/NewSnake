import React, { FC, useContext } from "react";
import styles from "./Information.module.css";
import { GameStoreContext } from "../../../stores/GameStore";
import { observer } from "mobx-react";
import { BOARD_WIDTH } from "../../../helpers";
import { SnakeStoreContext } from "../../../stores/SnakeStore";
import { BoardStoreContext } from "../../../stores/BoardStore";

interface InformationProps {}

export const Information: FC<InformationProps> = observer(() => {
  const gameStore = useContext(GameStoreContext);
  const snakeStore = useContext(SnakeStoreContext);
  const boardStore = useContext(BoardStoreContext);

  const restart = () => {
    snakeStore.reset();
    boardStore.reset();
    gameStore.reset();
  };

  return (
    <div
      style={{ width: `${BOARD_WIDTH * 20}px` }}
      className={styles.information}
    >
      <div className={styles.score}>
        {gameStore.gameOver ? "Game Over" : `Score: ${gameStore.score}`}
      </div>
      <div
        className={styles.score}
        onClick={restart}
        hidden={!gameStore.gameOver}
      >
        Restart
      </div>
    </div>
  );
});
