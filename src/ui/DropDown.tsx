import { css } from "@emotion/react";
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "./Button";

type Props = {
  buttonLabel: ReactNode;
  children: ReactNode;
};

export const DropDown = ({ buttonLabel, children }: Props) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;

    if (button !== null && showDropDown) {
      const handle = (event: MouseEvent) => {
        const target = event.target;
        if (target instanceof Node && !button.contains(target)) {
          setShowDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, buttonRef, showDropDown]);

  return (
    <div css={styles.wrap}>
      <Button ref={buttonRef} onClick={() => setShowDropDown(!showDropDown)}>
        {buttonLabel}
      </Button>

      {showDropDown && (
        <div ref={dropDownRef} css={styles.dropdown}>
          {children}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrap: css`
    position: relative;
  `,
  dropdown: css`
    z-index: 10;
    position: absolute;
    top: 47px;
    min-width: 100px;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.06);
    padding: 15px;
    border-radius: 4px;
  `,
};
