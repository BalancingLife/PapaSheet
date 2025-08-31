import { Cell } from "./Cell";
import { DEFAULT_COL_COUNT, DEFAULT_ROW_COUNT } from "../config/constants";

export const Grid = () => {
  // 10행 × 10열 더미
  const rows = Array.from({ length: DEFAULT_ROW_COUNT }, (_, r) => r);
  const cols = Array.from({ length: DEFAULT_COL_COUNT }, (_, c) => c);

  return (
    <div className="grid grid-cols-26 w-max border border-gray-300">
      {rows.map((row) =>
        cols.map((col) => <Cell key={`${row}-${col}`} row={row} col={col} />)
      )}
    </div>
  );
};
