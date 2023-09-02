import styled from "styled-components";
import ParentBox from "./TicTacToe";
import { Mark, RowCol } from "../types";
import useTicTacToe from "../hooks/useTicTacToe";
import { useCallback, useEffect, useState } from "react";

const Container = styled.div`
  border: blue solid 1px;
`;
const GameBox = styled.div`
  display: grid;
  grid-template-columns: 180px 180px 180px;
  grid-template-rows: 180px 180px 180px;
  gap: 20px;
`;

const CurrentPlayer = styled.span<{ mark?: Mark }>`
  font-size: 2em;
  color: ${({ mark }) => (mark === Mark.X ? "red" : "blue")};
`;

const GameBoard = () => {
  const { boxState, onCellMark, checkForWin } = useTicTacToe();
  const [gameWinner, setGameWinner] = useState<Mark>();
  const [currentPlayer, setCurrentPlayer] = useState<Mark>(Mark.X);
  const [currentEnabledCell, setCurrentEnabled] = useState<RowCol | null>();
  const handleCellMarked = useCallback(
    ({ row, col }: RowCol) => {
      setCurrentPlayer(currentPlayer === Mark.X ? Mark.O : Mark.X);
      setCurrentEnabled({ row, col });
    },
    [currentPlayer, boxState]
  );
  const isCellDisabled = (row: number, col: number) => {
    if (!currentEnabledCell) return false;
    return currentEnabledCell.col !== col || currentEnabledCell.row !== row;
  };

  const handleCellWin = (mark: Mark, row: number, col: number) => {
    onCellMark({ row, col, mark });
  };
  useEffect(() => {
    const winner = checkForWin();
    if (winner) {
      setGameWinner(winner);
      return;
    }

    if (!currentEnabledCell) return;
    const { col, row } = currentEnabledCell;
    if (boxState[row][col].isDisabled) {
      setCurrentEnabled(null);
      return;
    }
  }, [boxState, checkForWin, currentEnabledCell]);

  return (
    <Container>
      {gameWinner ? (
        <h2>
          Winner:{" "}
          <CurrentPlayer mark={gameWinner}>
            {gameWinner.toUpperCase()}
          </CurrentPlayer>
        </h2>
      ) : (
        <h3>
          Current player:{" "}
          <CurrentPlayer mark={currentPlayer}>
            {currentPlayer.toUpperCase()}
          </CurrentPlayer>
        </h3>
      )}
      <GameBox>
        {boxState.map((boxRow, row) =>
          boxRow.map((cell, col) => (
            <ParentBox
              key={`parent-${row}-${col}`}
              parentKey={`parent-${row}-${col}`}
              onCellMarked={handleCellMarked}
              currentPlayer={currentPlayer}
              isDisabled={!!gameWinner || isCellDisabled(row, col)}
              onParentWin={(mark: Mark) => handleCellWin(mark, row, col)}
            />
          ))
        )}
      </GameBox>
    </Container>
  );
};

export default GameBoard;
