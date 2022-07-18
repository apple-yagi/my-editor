import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapLeafNodesInElements } from "@lexical/selection";
import { $getSelection, $isRangeSelection } from "lexical";

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

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
    <div>
      <button onClick={formatCode}>Code</button>
    </div>
  );
};
