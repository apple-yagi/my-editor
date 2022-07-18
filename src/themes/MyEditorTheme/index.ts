import type { EditorThemeClasses } from "lexical";
import { MyEditorCodeTheme } from "./MyEditorCodeTheme";
import { MyEditorHeadingTheme } from "./MyEditorHeadingTheme";
import { MyEditorParagraphTheme } from "./MyEditorParagraphTheme";
import { MyEditorQuoteTheme } from "./MyEditorQuoteTheme";

export const MyEditorTheme: EditorThemeClasses = {
  ...MyEditorParagraphTheme,
  ...MyEditorHeadingTheme,
  ...MyEditorQuoteTheme,
  ...MyEditorCodeTheme,
};
