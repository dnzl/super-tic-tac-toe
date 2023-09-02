import { useState } from "react";
import { BaseTicTacToe, Mark, OnCellClick, RowCol } from "./types";

const initialState: BaseTicTacToe[] = [
  { row: 0, col: 0, mark: null, isDisabled: false },
  { row: 0, col: 1, mark: null, isDisabled: false },
  { row: 0, col: 2, mark: null, isDisabled: false },

  { row: 1, col: 0, mark: null, isDisabled: false },
  { row: 1, col: 1, mark: null, isDisabled: false },
  { row: 1, col: 2, mark: null, isDisabled: false },

  { row: 2, col: 0, mark: null, isDisabled: false },
  { row: 2, col: 1, mark: null, isDisabled: false },
  { row: 2, col: 2, mark: null, isDisabled: false },
];

const useTicTacToe = () => {
  const [boxState, setGameState] = useState(initialState);
  const onCellClick = ({ row, col, mark }: OnCellClick): boolean => {
    let success = false;
    const newState = boxState.map((cell) => {
      if (cell.row === row && cell.col === col) {
        if (!cell || cell.isDisabled) return cell;
        success = true;
        return { ...cell, mark, isDisabled: true };
      }
      return cell;
    });
    setGameState([...newState]);
    return success;
  };
  return {
    boxState,
    onCellClick,
  };
};
export default useTicTacToe;
