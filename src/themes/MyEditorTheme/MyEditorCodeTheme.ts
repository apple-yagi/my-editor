import type { EditorThemeClasses } from "lexical";

import "./MyEditorCodeTheme.css";

export const MyEditorCodeTheme: EditorThemeClasses = {
  code: "MyEditorTheme__code",
  codeHighlight: {
    atrule: "MyEditorTheme__tokenAttr",
    attr: "MyEditorTheme__tokenAttr",
    boolean: "MyEditorTheme__tokenProperty",
    builtin: "MyEditorTheme__tokenSelector",
    cdata: "MyEditorTheme__tokenComment",
    char: "MyEditorTheme__tokenSelector",
    class: "MyEditorTheme__tokenFunction",
    "class-name": "MyEditorTheme__tokenFunction",
    comment: "MyEditorTheme__tokenComment",
    constant: "MyEditorTheme__tokenProperty",
    deleted: "MyEditorTheme__tokenProperty",
    doctype: "MyEditorTheme__tokenComment",
    entity: "MyEditorTheme__tokenOperator",
    function: "MyEditorTheme__tokenFunction",
    important: "MyEditorTheme__tokenVariable",
    inserted: "MyEditorTheme__tokenSelector",
    keyword: "MyEditorTheme__tokenAttr",
    namespace: "MyEditorTheme__tokenVariable",
    number: "MyEditorTheme__tokenProperty",
    operator: "MyEditorTheme__tokenOperator",
    prolog: "MyEditorTheme__tokenComment",
    property: "MyEditorTheme__tokenProperty",
    punctuation: "MyEditorTheme__tokenPunctuation",
    regex: "MyEditorTheme__tokenVariable",
    selector: "MyEditorTheme__tokenSelector",
    string: "MyEditorTheme__tokenSelector",
    symbol: "MyEditorTheme__tokenProperty",
    tag: "MyEditorTheme__tokenProperty",
    url: "MyEditorTheme__tokenOperator",
    variable: "MyEditorTheme__tokenVariable",
  },
};
