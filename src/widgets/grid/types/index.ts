export interface CellProps {
  row: number;
  col: number;
  value: string;
  isActive?: boolean;
  onClick: (row: number, col: number) => void;
  onMouseDown?: (
    e: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => void;
  onMouseEnter?: (row: number, col: number) => void;
  edge?: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };
}
