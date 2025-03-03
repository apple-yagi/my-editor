import { css } from "@emotion/react";
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable";

export const ContentEditable = () => {
  return (
    <LexicalContentEditable
      css={css`
        min-height: 150px;
        border: 0;
        resize: none;
        cursor: text;
        font-size: 15px;
        display: block;
        position: relative;
        tab-size: 1;
        outline: 0;
        padding: 10px;
        overflow: auto;
        resize: vertical;
      `}
    />
  );
};
