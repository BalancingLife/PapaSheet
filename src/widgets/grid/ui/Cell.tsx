import { CELL_WIDTH, CELL_HEIGHT } from "../config/constants";

// 개별 셀 컴포넌트 (값/포커스/편집 상태 표시)
interface CellProps {
  row: number;
  col: number;
}

export const Cell = ({ row, col }: CellProps) => {
  return (
    <div
      className="border border-gray-200 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100"
      style={{
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
      }}
    >
      {row + 1}, {String.fromCharCode(65 + col)}
    </div>
  );
};
