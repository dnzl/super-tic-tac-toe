import { FC, useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Mark, RowCol } from "../types";
import useTicTacToe from "../hooks/useTicTacToe";

export const cellSize = 100;
const gridTemplate = `${cellSize}px ${cellSize}px ${cellSize}px`;

const Box = styled.div`
  display: grid;
  grid-template-columns: ${gridTemplate};
  grid-template-rows: ${gridTemplate};
`;
const ChildBox = styled.div<{ $isDisabled?: boolean }>`
  border: solid 1px #666;
  ${({ $isDisabled: isDisabled }) => isDisabled && "opacity: .5;"}
  cursor:  ${({ $isDisabled: isDisabled }) =>
    isDisabled ? "inherit" : "pointer"};
  background: #fff;
`;

const ParentMark = styled.div<{ mark?: Mark }>`
  font-size: ${cellSize * 3}px;
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
  text-transform: uppercase;
  text-shadow: 0 0 20px ${({ mark }) => (mark === Mark.X ? "red" : "blue")};
`;

const ChildMark = styled.div<{ mark?: Mark }>`
  font-size: ${cellSize}px;
  display: block;
  line-height: ${cellSize}px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ mark }) => (mark === Mark.X ? "red" : "blue")};
`;
const Container = styled.div<{ disabled?: boolean }>`
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${({ disabled }) => disabled && "background: #ccc"}
`;

type ParentBoxProps = {
  parentKey: string;
  onCellMarked(rowCol: RowCol): void;
  currentPlayer: Mark;
  isDisabled: boolean;
  onParentWin(mark: Mark): void;
};

const ParentBox: FC<ParentBoxProps> = ({
  parentKey,
  onCellMarked,
  currentPlayer,
  isDisabled,
  onParentWin,
}) => {
  const [parentMark, setParentMark] = useState<Mark | null>(null);
  const { boxState: childBoxes, onCellMark, checkForWin } = useTicTacToe();
  const handleCellClick = useCallback(
    ({ row, col }: RowCol) => {
      const success = onCellMark({ row, col, mark: currentPlayer });
      if (success) {
        onCellMarked({ row, col });
      }
    },
    [currentPlayer, childBoxes, onCellMark]
  );

  useEffect(() => {
    const winner = checkForWin();
    setParentMark(winner);
    if (winner) onParentWin(winner);
  }, [childBoxes, checkForWin]);

  const disabledParent = !!(parentMark || isDisabled);

  return (
    <Container {...(disabledParent && { disabled: true })}>
      {parentMark && <ParentMark mark={parentMark}>{parentMark}</ParentMark>}
      <Box>
        {childBoxes.map((childRow, row) =>
          childRow.map(({ mark }, col) => (
            <ChildBox
              key={`${parentKey}-${row}-${col}`}
              onClick={() => !disabledParent && handleCellClick({ row, col })}
              $isDisabled={disabledParent}
            >
              {mark && <ChildMark mark={mark}>{mark}</ChildMark>}
            </ChildBox>
          ))
        )}
      </Box>{" "}
    </Container>
  );
};

export default ParentBox;
