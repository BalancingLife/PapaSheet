import React from "react";
import type { CellProps } from "../types";
import { CELL_WIDTH, CELL_HEIGHT } from "../config/constants";

export const Cell = React.memo(function Cell({
  value,
  isActive = false,
  onClick,
}: CellProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "border border-gray-200 flex items-center justify-center text-sm ",
        isActive ? "bg-blue-100 border-blue-400" : "bg-white hover:bg-gray-100",
      ].join(" ")}
      style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
    >
      {value}
    </div>
  );
});
