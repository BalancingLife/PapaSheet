type OnCellClick = (row: number, col: number) => void;

export interface CellProps {
  row: number;
  col: number;
  value: string;
  isActive?: boolean;
  onClick: OnCellClick;
}
