import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Quote,
  Minus,
} from "lucide-react";
export const COMMANDS = [
  {
    name: "Heading 1",
    icon: Heading1,
    action: (editor: any) =>
    {
      console.log("hello1")
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
  },
  {
    name: "Heading 2",
    icon: Heading2,
    action: (editor: any) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    name: "Heading 3",
    icon: Heading3,
    action: (editor: any) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    name: "Bullet List",
    icon: List,
    action: (editor: any) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    action: (editor: any) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    name: "Code Block",
    icon: Code,
    action: (editor: any) =>
      editor.chain().focus().toggleCodeBlock({ language: "javascript" }).run(),
  },
  {
    name: "Divider",
    icon: Minus,
    action: (editor: any) => editor.chain().focus().setHorizontalRule().run(),
  },
  {
    name: "Quote",
    icon: Quote,
    action: (editor: any) => editor.chain().focus().toggleBlockquote().run(),
  },
];