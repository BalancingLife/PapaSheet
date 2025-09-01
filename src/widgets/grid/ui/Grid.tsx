// widgets/grid/Grid.tsx
import { Cell } from "./Cell";
import {
  DEFAULT_COL_COUNT,
  DEFAULT_ROW_COUNT,
  CELL_WIDTH,
} from "../config/constants";

export const Grid = () => {
  const rows = Array.from({ length: DEFAULT_ROW_COUNT }, (_, r) => r);
  const cols = Array.from({ length: DEFAULT_COL_COUNT }, (_, c) => c);

  return (
    <div
      className="grid border border-gray-300 bg-white"
      style={{
        gridTemplateColumns: `repeat(${DEFAULT_COL_COUNT}, ${CELL_WIDTH}px)`,
        width: DEFAULT_COL_COUNT * CELL_WIDTH,
      }}
    >
      {rows.map((row) =>
        cols.map((col) => <Cell key={`${row}-${col}`} row={row} col={col} />)
      )}
    </div>
  );
};
