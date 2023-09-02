import styled from "styled-components";
import ParentBox from "./TicTacToe";
import { Mark } from "../types";
import useTicTacToe from "../hooks/useTicTacToe";
import { useCallback, useState } from "react";

const GameBox = styled.div`
  border: blue solid 1px;
  display: grid;
  grid-template-columns: 180px 180px 180px;
  grid-template-rows: 180px 180px 180px;
  gap: 20px;
`;

const GameBoard = () => {
  const { boxState } = useTicTacToe();
  const [currentPlayer, setCurrentPlayer] = useState<Mark>(Mark.X);
  const changePlayer = useCallback(() => {
    setCurrentPlayer(currentPlayer === Mark.X ? Mark.O : Mark.X);
  }, [currentPlayer]);

  return (
    <GameBox>
      {boxState.map((boxRow, row) =>
        boxRow.map((cell, col) => (
          <ParentBox
            key={`parent-${row}-${col}`}
            parentKey={`parent-${row}-${col}`}
            onChangePlayer={changePlayer}
            currentPlayer={currentPlayer}
          />
        ))
      )}
    </GameBox>
  );
};

export default GameBoard;
