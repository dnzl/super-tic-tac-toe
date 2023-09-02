import { FC, useCallback, useEffect } from "react";
import { styled } from "styled-components";
import { BaseTicTacToe, Mark, RowCol } from "../types";
import useTicTacToe from "../hooks/useTicTacToe";

const cellSize = 50;
const gridTemplate = `${cellSize}px ${cellSize}px ${cellSize}px`;

const Box = styled.div`
  border: solid 1px red;
  gap: 10px;
  display: grid;
  grid-template-columns: ${gridTemplate};
  grid-template-rows: ${gridTemplate};
`;
const ChildBox = styled.div`
  border: solid 1px green;
`;

const ParentMark = styled.div<{ mark?: Mark }>`
  font-size: 10em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  line-height: ${cellSize * 3}px;
  text-align: center;
  color: ${({ mark }) => (mark === Mark.X ? "red" : "blue")};
`;

const ChildMark = styled.div<{ mark?: Mark }>`
  font-size: ${cellSize}px;
  display: block;
  line-height: ${cellSize}px;
  text-align: center;
  color: ${({ mark }) => (mark === Mark.X ? "red" : "blue")};
`;
const Container = styled.div`
  border: solid 3px #0ff;
  position: relative;
`;

type ParentBoxProps = {
  parentKey: string;
  onChangePlayer(): void;
  currentPlayer: Mark;
};

const ParentBox: FC<ParentBoxProps> = ({
  parentKey,
  onChangePlayer,
  currentPlayer,
}) => {
  const parentMark = null;
  const { boxState: childBoxes, onCellMark, checkForWin } = useTicTacToe();
  const handleCellClick = useCallback(
    ({ row, col }: RowCol) => {
      const success = onCellMark({ row, col, mark: currentPlayer });
      if (success) {
        onChangePlayer();
      }
    },
    [currentPlayer, childBoxes, onCellMark]
  );

  useEffect(() => {
    const winner = checkForWin();
    console.log({ winner });
  }, [childBoxes, checkForWin]);

  return (
    <Container>
      {parentMark && <ParentMark mark={parentMark}>{parentMark}</ParentMark>}
      <Box>
        {childBoxes.map((childRow, row) =>
          childRow.map(({ mark, isDisabled }, col) => (
            <ChildBox
              key={`${parentKey}-${row}-${col}`}
              onClick={() => handleCellClick({ row, col })}
            >
              {mark && <ChildMark mark={mark}>{mark.toUpperCase()}</ChildMark>}
            </ChildBox>
          ))
        )}
      </Box>{" "}
    </Container>
  );
};

export default ParentBox;
