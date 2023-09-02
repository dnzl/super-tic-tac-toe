import { FC, useCallback } from "react";
import { styled } from "styled-components";
import { BaseTicTacToe, Mark, RowCol } from "../types";
import useTicTacToe from "../useTicTacToe";

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

const ParentMark = styled.div<{ mark: BaseTicTacToe["mark"] }>`
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

const ChildMark = styled.div<{ mark: BaseTicTacToe["mark"] }>`
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

type ParentBoxProps = BaseTicTacToe & {
  parentKey: string;
  onChangePlayer(): void;
  currentPlayer: Mark;
};

const ParentBox: FC<ParentBoxProps> = ({
  parentKey,
  onChangePlayer,
  mark: parentMark,
  currentPlayer,
}) => {
  const { boxState: childBoxes, onCellClick } = useTicTacToe();
  const handleCellClick = useCallback(
    ({ row, col }: RowCol) => {
      const success = onCellClick({ row, col, mark: currentPlayer });
      if (success) {
        onChangePlayer();
      }
    },
    [currentPlayer, onCellClick, onChangePlayer]
  );
  return (
    <Container>
      {parentMark && <ParentMark mark={parentMark}>{parentMark}</ParentMark>}
      <Box>
        {childBoxes.map(({ mark, row, col }) => (
          <ChildBox
            key={`${parentKey}-${row}-${col}`}
            onClick={() => handleCellClick({ row, col })}
          >
            {mark && <ChildMark mark={mark}>{mark}</ChildMark>}
          </ChildBox>
        ))}
      </Box>{" "}
    </Container>
  );
};

export default ParentBox;
