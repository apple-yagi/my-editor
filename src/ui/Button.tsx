import { css } from "@emotion/react";
import { ComponentProps, forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} css={styles.button} {...props}>
        {children}
      </button>
    );
  }
);

const styles = {
  button: css`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 37px;
    border-radius: 8px;
    font-size: 16px;
    padding: 0 16px;

    :hover {
      background-color: #eee;
    }
  `,
};
