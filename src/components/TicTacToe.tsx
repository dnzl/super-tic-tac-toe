import { FC, useCallback, useEffect, useState } from "react";
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
const ChildBox = styled.div<{ isDisabled?: boolean; isActive?: boolean }>`
  border: solid 1px green;
  ${({ isDisabled }) => isDisabled && "opacity: .5;"}
  cursor:  ${({ isDisabled }) => (isDisabled ? "inherit" : "pointer")};
  ${({ isActive }) => isActive && "background: yellow"};
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
  z-index: 999;
`;

const ChildMark = styled.div<{ mark?: Mark }>`
  font-size: ${cellSize}px;
  display: block;
  line-height: ${cellSize}px;
  text-align: center;
  color: ${({ mark }) => (mark === Mark.X ? "red" : "blue")};
`;
const Container = styled.div<{ disabled?: boolean }>`
  border: solid 3px #0ff;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${({ disabled }) => disabled && "background: #ccc"}
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
  const [parentMark, setParentMark] = useState<Mark | null>(null);
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
    setParentMark(winner);
  }, [childBoxes, checkForWin]);

  return (
    <Container {...(parentMark && { disabled: true })}>
      {parentMark && <ParentMark mark={parentMark}>{parentMark}</ParentMark>}
      <Box>
        {childBoxes.map((childRow, row) =>
          childRow.map(({ mark, isDisabled }, col) => (
            <ChildBox
              key={`${parentKey}-${row}-${col}`}
              onClick={() => handleCellClick({ row, col })}
              isDisabled={isDisabled}
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
