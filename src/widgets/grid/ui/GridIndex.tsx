import {
  DEFAULT_ROW_COUNT,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "../config/constants";

export const GridIndex = () => {
  // DEFAULT_ROW_COUNT 만큼의 row 배열 생성
  const rows = Array.from({ length: DEFAULT_ROW_COUNT }, (_, r) => r);

  return (
    <div
      className="flex flex-col border-r border-gray-400"
      style={{ width: CELL_WIDTH, height: DEFAULT_ROW_COUNT * CELL_HEIGHT }}
    >
      {rows.map((row) => (
        <div
          key={row}
          className="
            flex items-center justify-center
            text-sm font-medium text-gray-700
            border-b border-gray-300
            select-none
          "
          style={{ height: CELL_HEIGHT }}
        >
          {row + 1}
        </div>
      ))}
    </div>
  );
};
