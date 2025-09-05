import React, { useCallback } from "react";
import type { CellProps } from "../types";
import { CELL_WIDTH, CELL_HEIGHT } from "../config/constants";

export const Cell = React.memo(function Cell({
  row,
  col,
  value,
  isActive = false,
  onClick,
}: CellProps) {
  // 나머지 셀들은 리렌더 안되는지 테스트 하는 코드
  // const renderCountRef = useRef(0);
  // renderCountRef.current += 1;

  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  // // 매 렌더마다 로그
  // useEffect(() => {
  //   // 예: [Cell 3,5] render#2 (active:true, value:"")
  //   console.log(
  //     `[Cell ${row},${col}] render#${renderCountRef.current} (active:${isActive}, value:"${value}")`
  //   );
  // });

  return (
    <div
      onClick={handleClick}
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
