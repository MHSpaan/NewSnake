import styles from "./Cell.module.css";
import React, { FC } from "react";

interface CellProps {
	cell: string;
}

export const Cell: FC<CellProps> = ({ cell }) => {
	return (
		<div
			className={`${styles.cell} ${
				cell === "C"
					? styles.cellCandy
					: cell === "H"
					? styles.cellSnakeHead
					: cell === "B"
					? styles.cellSnakeBody
					: styles.cellEmpty
			}`}
		></div>
	);
};
