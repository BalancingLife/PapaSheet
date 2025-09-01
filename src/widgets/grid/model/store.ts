import { create } from "zustand";

type Pos = { row: number; col: number };
type GridState = {
  active: Pos | null;
  setActive: (pos: Pos) => void;
};

export const useGridStore = create<GridState>((set, get) => ({
  active: null,
  setActive: (pos) => {
    const cur = get().active;
    if (cur && cur.row === pos.row && cur.col === pos.col) return; // 동일값 set 방지
    console.log("before:", get().active);
    set({ active: pos });
    console.log("after:", get().active);
  },
}));

// 개별 훅으로 쪼개서 리렌더 최소화
export const useActive = () => useGridStore((s) => s.active);
export const useSetActive = () => useGridStore((s) => s.setActive);
