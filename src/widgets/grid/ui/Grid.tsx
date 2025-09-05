// widgets/grid/ui/Grid.tsx
import { useMemo, useCallback } from "react";
import { Cell } from "./Cell";
import { useActive, useSetActive } from "../model/store";
import {
  DEFAULT_COL_COUNT,
  DEFAULT_ROW_COUNT,
  CELL_WIDTH,
} from "../config/constants";

export const Grid = () => {
  const active = useActive();
  const setActive = useSetActive();

  const rows = useMemo(
    () => Array.from({ length: DEFAULT_ROW_COUNT }, (_, r) => r),
    []
  );
  const cols = useMemo(
    () => Array.from({ length: DEFAULT_COL_COUNT }, (_, c) => c),
    []
  );

  // 셀 공용 클릭 핸들러 (참조 안정)
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      setActive({ row, col });
    },
    [setActive]
  );

  return (
    <div
      className="grid border border-gray-300 bg-white"
      style={{
        gridTemplateColumns: `repeat(${DEFAULT_COL_COUNT}, ${CELL_WIDTH}px)`,
        width: DEFAULT_COL_COUNT * CELL_WIDTH,
      }}
    >
      {rows.flatMap((row) =>
        cols.map((col) => (
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            value={""}
            isActive={active?.row === row && active?.col === col}
            onClick={handleCellClick}
          />
        ))
      )}
    </div>
  );
};
