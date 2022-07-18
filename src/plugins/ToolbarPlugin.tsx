import { Button } from "@/ui/Button";
import { DropDown } from "@/ui/DropDown";
import { css } from "@emotion/react";
import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { useEffect, useState } from "react";

const blockTypeToBlockName = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  quote: "Quote",
  code: "Code Block",
};

type BlockType = keyof typeof blockTypeToBlockName;

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<BlockType>("paragraph");

  useEffect(() => {
    switch (blockType) {
      case "paragraph":
        formatParagraph();
        break;
      case "h1":
      case "h2":
      case "h3":
        formatHeading(blockType);
        break;
      case "quote":
        formatQuote();
        break;
      case "code":
        formatCode();
        break;
    }
  }, [blockType]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapLeafNodesInElements(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapLeafNodesInElements(selection, () =>
          $createHeadingNode(headingSize)
        );
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapLeafNodesInElements(selection, () => $createQuoteNode());
      }
    });
  };

  const formatCode = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        if (selection.isCollapsed()) {
          $wrapLeafNodesInElements(selection, () => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);
          selection.insertRawText(textContent);
        }
      }
    });
  };

  return (
    <div css={styles.bar}>
      <DropDown buttonLabel={blockTypeToBlockName[blockType]}>
        {(Object.keys(blockTypeToBlockName) as BlockType[]).map((name) => (
          <Button key={name} onClick={() => setBlockType(name)}>
            {blockTypeToBlockName[name]}
          </Button>
        ))}
      </DropDown>
    </div>
  );
};

const styles = {
  bar: css`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #fff;
    padding: 10px;
  `,
};
