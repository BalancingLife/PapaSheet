// widgets/grid/ui/Cell.tsx

import React, { useCallback } from "react";
import type { CellProps } from "../types";
import { CELL_WIDTH, CELL_HEIGHT } from "../config/constants";

export const Cell = React.memo(function Cell({
  row,
  col,
  value,
  isActive = false,
  edge,
  onClick,
  onMouseDown,
  onMouseEnter,
}: CellProps) {
  // 나머지 셀들은 리렌더 안되는지 테스트 하는 코드
  // const renderCountRef = useRef(0);
  // renderCountRef.current += 1;

  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onMouseDown) onMouseDown(e, row, col);
    },
    [onMouseDown, row, col]
  );

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) onMouseEnter(row, col);
  }, [onMouseEnter, row, col]);

  // // 매 렌더마다 로그
  // useEffect(() => {
  //   // 예: [Cell 3,5] render#2 (active:true, value:"")
  //   console.log(
  //     `[Cell ${row},${col}] render#${renderCountRef.current} (active:${isActive}, value:"${value}")`
  //   );
  // });

  // 기본 클래스
  const classes = ["flex items-center justify-center text-sm select-none"];

  // 배경: isActive면 반드시 blue-200
  classes.push(isActive ? "bg-blue-200" : "bg-white hover:bg-gray-100");

  // 기본 보더는 항상 회색(내부 그리드선 유지)
  classes.push("border border-gray-200");

  // edge가 있는 면만 파란 보더로 오버라이드 (확정 후에만 내려옴)
  if (edge?.top) classes.push("border-t-2 border-t-blue-500");
  if (edge?.right) classes.push("border-r-2 border-r-blue-500");
  if (edge?.bottom) classes.push("border-b-2 border-b-blue-500");
  if (edge?.left) classes.push("border-l-2 border-l-blue-500");

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      className={classes.join(" ")}
      style={{ width: CELL_WIDTH, height: CELL_HEIGHT }}
    >
      {value}
    </div>
  );
});
