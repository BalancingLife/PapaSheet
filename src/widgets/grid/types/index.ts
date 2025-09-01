export interface CellProps {
  row: number;
  col: number;
  value: string;
  isActive?: boolean;
  onClick: () => void;
}
