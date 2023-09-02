import styled from "styled-components";
import ParentBox from "./components/TicTacToe";
import { Mark } from "./types";
import useTicTacToe from "./useTicTacToe";
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
      {boxState.map((pb) => (
        <ParentBox
          key={`parent-${pb.row}-${pb.col}`}
          parentKey={`parent-${pb.row}-${pb.col}`}
          onChangePlayer={changePlayer}
          currentPlayer={currentPlayer}
          {...pb}
        />
      ))}
    </GameBox>
  );
};

export default GameBoard;
