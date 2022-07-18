import type { Klass, LexicalNode } from "lexical";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

export const MyEditorNodes: Array<Klass<LexicalNode>> = [
  CodeHighlightNode,
  CodeNode,
  HorizontalRuleNode,
];
