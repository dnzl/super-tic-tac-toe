import { useCallback, useState } from "react";
import { BaseTicTacToe, Mark, OnCellMark, TicTacRow } from "../types";

const initialCell = { mark: null, isDisabled: false };
const intialRow: TicTacRow = [
  { ...initialCell },
  { ...initialCell },
  { ...initialCell },
];
const initialState: BaseTicTacToe = [intialRow, intialRow, intialRow];

const useTicTacToe = () => {
  const [boxState, setBoxState] = useState(initialState);

  const onCellMark = useCallback(
    ({ row, col, mark }: OnCellMark): boolean => {
      const cell = { ...boxState[row][col] };

      if (cell.isDisabled) return false;
      cell.mark = mark;
      cell.isDisabled = true;
      const newState: BaseTicTacToe = [...boxState];
      newState[row] = [...boxState[row]];
      newState[row][col] = { ...cell };
      setBoxState(newState);

      return true;
    },
    [boxState]
  );

  const checkRowForWin = () => {
    let winner: Mark | null = null;
    boxState.forEach((row) => {
      const marks = {
        [Mark.X]: 0,
        [Mark.O]: 0,
      };
      row.forEach((cell) => {
        if (cell.mark) marks[cell.mark]++;
      });
      if (marks[Mark.X] === 3) winner = Mark.X;
      if (marks[Mark.O] === 3) winner = Mark.O;
    });
    return winner;
  };

  const checkColForWin = () => {
    let winner: Mark | null = null;

    for (let col = 0; col < 3; col++) {
      const marks = {
        [Mark.X]: 0,
        [Mark.O]: 0,
      };
      boxState.forEach((row) => {
        if (row[col].mark) marks[row[col].mark as Mark]++;
      });
      if (marks[Mark.X] === 3) winner = Mark.X;
      if (marks[Mark.O] === 3) winner = Mark.O;
    }

    return winner;
  };

  const checkDiagonalLeftToRight = () => {
    let winner: Mark | null = null;
    const marks = {
      [Mark.X]: 0,
      [Mark.O]: 0,
    };

    if (boxState[0][0].mark) marks[boxState[0][0].mark]++;
    if (boxState[1][1].mark) marks[boxState[1][1].mark]++;
    if (boxState[2][2].mark) marks[boxState[2][2].mark]++;

    if (marks[Mark.X] === 3) winner = Mark.X;
    if (marks[Mark.O] === 3) winner = Mark.O;

    return winner;
  };

  const checkDiagonalRightToLeft = () => {
    let winner: Mark | null = null;
    const marks = {
      [Mark.X]: 0,
      [Mark.O]: 0,
    };

    if (boxState[0][2].mark) marks[boxState[0][2].mark]++;
    if (boxState[1][1].mark) marks[boxState[1][1].mark]++;
    if (boxState[2][0].mark) marks[boxState[2][0].mark]++;

    if (marks[Mark.X] === 3) winner = Mark.X;
    if (marks[Mark.O] === 3) winner = Mark.O;

    return winner;
  };

  const checkForWin = (): Mark | null => {
    const rowWin = checkRowForWin();
    if (rowWin) return rowWin;
    const colWin = checkColForWin();
    if (colWin) return colWin;
    const ltr = checkDiagonalLeftToRight();
    if (ltr) return ltr;
    const rtl = checkDiagonalRightToLeft();
    if (rtl) return rtl;
    return null;
  };

  return {
    boxState,
    onCellMark,
    checkForWin,
  };
};
export default useTicTacToe;
