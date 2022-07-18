import { Button } from "@/ui/Button";
import { DropDown } from "@/ui/DropDown";
import { css } from "@emotion/react";
import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

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
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState<BlockType>("paragraph");

  const format = (blockType: BlockType) => {
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
  };

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

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        if (type in blockTypeToBlockName) {
          setBlockType(type as keyof typeof blockTypeToBlockName);
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  return (
    <div css={styles.bar}>
      <DropDown buttonLabel={blockTypeToBlockName[blockType]}>
        {(Object.keys(blockTypeToBlockName) as BlockType[]).map((name) => (
          <Button key={name} onClick={() => format(name)}>
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
