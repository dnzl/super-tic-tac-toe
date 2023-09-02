export enum Mark {
  X = "x",
  O = "o",
}
export type BaseTicTacToe = RowCol & {
  mark: Mark | null;
  isDisabled: boolean;
};
export type RowCol = { row: number; col: number };
export type OnCellClick = RowCol & { mark: Mark };
export type Result = {
  success: boolean;
  message?: string;
};
