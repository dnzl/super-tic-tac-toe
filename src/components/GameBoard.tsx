import styled from "styled-components";
import ParentBox, { cellSize } from "./TicTacToe";
import { Mark, RowCol } from "../types";
import useTicTacToe from "../hooks/useTicTacToe";
import { useCallback, useEffect, useState } from "react";

const parentCellSize = cellSize * 3;
const gridTemplate = `${parentCellSize}px ${parentCellSize}px ${parentCellSize}px`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const GameStatus = styled.div`
  h2 {
    line-height: 2em;
    display: inline-flex;
    justify-content: space-between;
    line-height: 2em;
    width: 170px;
  }
`;
const GameBox = styled.div`
  display: grid;
  grid-template-columns: ${gridTemplate};
  grid-template-rows: ${gridTemplate};
  gap: 5px;
  background: #888;
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
      <GameStatus>
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
      </GameStatus>
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
