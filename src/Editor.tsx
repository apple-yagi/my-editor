import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";
import { css } from "@emotion/react";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { MyEditorNodes } from "./nodes/MyEditorNodes";
import { MyEditorTheme } from "./themes/MyEditorTheme";

export const MyEditor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    onError,
    nodes: [...MyEditorNodes],
    theme: MyEditorTheme,
  };

  function onChange(editorState: EditorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();
    });
  }

  function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // Focus the editor when the effect fires!
      editor.focus();
    }, [editor]);

    return null;
  }

  function onError(error: Error) {
    console.error(error);
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={
          <div
            css={css`
              font-size: 24px;
            `}
          >
            Enter some text...
          </div>
        }
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <CodeHighlightPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};
