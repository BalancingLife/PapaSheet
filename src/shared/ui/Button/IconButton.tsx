import React, { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react"; // <button>가 원래 가지는 모든 props(onClick, disabled, type 등)를 타입으로 가져다 쓰려는 의도.

/** 공통 버튼 기본형: 아이콘 전용에 최적화 */
type Variant = "solid" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: ButtonSize;
  /** 아이콘 전용 버튼이면 true (접근성용 aria-label 필수) */
  iconOnly?: boolean;
}

// 모든 버튼이 공통으로 가지는 스타일.
const base =
  "inline-flex items-center justify-center rounded-full transition-colors select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400";

// Record 유틸리티 타입은 변수 sizes의 객체 값으로 ButtonSize 타입들을 빠짐없이 키로 갖고 , 각 값으로 두번째 제네릭 인자타입을 가져야한다는 뜻
const sizes: Record<ButtonSize, string> = {
  sm: "h-8 w-8 text-[18px]",
  md: "h-10 w-10 text-[20px]",
  lg: "h-12 w-12 text-[22px]",
};
const variants: Record<Variant, string> = {
  solid: "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className = "",
      variant = "ghost",
      size = "md",
      iconOnly = true,
      ...props
    },
    ref
  ) => {
    if (iconOnly && !props["aria-label"]) {
      console.warn("Icon-only button is missing `aria-label`.");
    }

    return (
      <button
        ref={ref}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

// forwardRef로 감싼 컴포넌트는 React DevTools에서 이름이 깨질 수 있어서
// 디버깅 시 "IconButton"으로 보이게 displayName을 지정
IconButton.displayName = "IconButton";

const Svg = {
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  ),
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
};

// 프리셋 이라고 나중에 쓰기 편하라고 미리 만들어놓은 버튼
// 프리셋의 경우 children 인자가 필요하지 않아서 Omit으로 children 인자를 제거
type FooterBtnProps = Omit<IconButtonProps, "children"> & { size?: ButtonSize };

export function AddSheetButton(props: FooterBtnProps) {
  return (
    <IconButton aria-label="시트 추가" size="sm" {...props}>
      <Svg.Plus width="1em" height="1em" />
    </IconButton>
  );
}

export function AllSheetsButton(props: FooterBtnProps) {
  return (
    <IconButton aria-label="모든 시트" size="sm" {...props}>
      <Svg.Menu width="1em" height="1em" />
    </IconButton>
  );
}
