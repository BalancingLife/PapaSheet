// widgets/grid/ui/GridHeader.tsx
import {
  DEFAULT_COL_COUNT,
  CELL_WIDTH,
  CELL_HEIGHT,
} from "../config/constants";

export const GridHeader = () => {
  const cols = Array.from({ length: DEFAULT_COL_COUNT }, (_, c) => c);

  return (
    <div
      className="grid border-b border-gray-400 bg-white"
      style={{
        gridTemplateColumns: `repeat(${DEFAULT_COL_COUNT}, ${CELL_WIDTH}px)`,
        height: CELL_HEIGHT,
      }}
    >
      {cols.map((col) => (
        <div
          key={col}
          className="flex items-center justify-center text-sm font-medium text-gray-700 border-r border-gray-300"
        >
          {String.fromCharCode(65 + col)}
        </div>
      ))}
    </div>
  );
};
