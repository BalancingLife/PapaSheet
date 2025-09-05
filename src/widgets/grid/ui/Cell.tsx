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

  // 배경
  classes.push(isActive ? "bg-blue-100" : "bg-white hover:bg-gray-100");

  // 보더:
  // - edge가 있을 때(=확정 후 가장자리): 내부선 투명 + 변마다 파란 보더
  // - 그 외(비활성 + 드래그 중 미리보기): 기본 회색 보더 유지
  if (edge) {
    classes.push("border border-transparent");
    if (edge.top) classes.push("border-t-2 border-t-blue-500");
    if (edge.right) classes.push("border-r-2 border-r-blue-500");
    if (edge.bottom) classes.push("border-b-2 border-b-blue-500");
    if (edge.left) classes.push("border-l-2 border-l-blue-500");
  } else {
    classes.push("border border-gray-200");
  }
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
