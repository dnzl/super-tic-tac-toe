export enum Mark {
  X = "x",
  O = "o",
}
export type BaseTicTacToe = [TicTacRow, TicTacRow, TicTacRow];
export type TicTacRow = [TicTacCell, TicTacCell, TicTacCell];
export type TicTacCell = {
  mark: Mark | null;
  isDisabled: boolean;
};
export type RowCol = { row: number; col: number };
export type OnCellMark = RowCol & { mark: Mark };
export type Result = {
  success: boolean;
  message?: string;
};
export type CellMap = [row: number, cel: number];
