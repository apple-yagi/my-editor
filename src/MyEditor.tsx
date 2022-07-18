import { $getRoot, $getSelection } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";
import { ToolbarPlugin } from "@/plugins/ToolbarPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { MyEditorNodes } from "./nodes/MyEditorNodes";
import { MyEditorTheme } from "./themes/MyEditorTheme";
import { Placeholder } from "./ui/Placeholder";
import { css } from "@emotion/react";
import { ContentEditable } from "./ui/ContentEditable";

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
      <hr />
      <div css={styles.container}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<Placeholder>Enter some rich text...</Placeholder>}
        />
      </div>
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <CodeHighlightPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};

const styles = {
  container: css`
    background: #fff;
    position: relative;
    cursor: text;
    display: block;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `,
};
