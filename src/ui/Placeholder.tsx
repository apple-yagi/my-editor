import { css } from "@emotion/react";
import { ComponentProps } from "react";

export const Placeholder = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p css={p} {...props}>
      {children}
    </p>
  );
};

const p = css`
  font-size: 15px;
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 10px;
  left: 10px;
  right: 10px;
  user-select: none;
  white-space: nowrap;
  display: inline-block;
  pointer-events: none;
`;
