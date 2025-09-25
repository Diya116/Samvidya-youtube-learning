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
import {  type Command } from "@/types/Note";

export const COMMANDS: Command[] = [
  {
    name: "Heading 1",
    icon: Heading1,
    action: (editor: any) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
  },
  {
    name: "Heading 2",
    icon: Heading2,
    action: (editor: any) => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
  },
  {
    name: "Heading 3",
    icon: Heading3,
    action: (editor: any) => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
  },
  {
    name: "Bullet List",
    icon: List,
    action: (editor: any) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    action: (editor: any) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    name: "Code Block",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'javascript' }).run();
    },
  },
  {
    name: "Code JavaScript",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'javascript' }).run();
    },
  },
  {
    name: "Code Python",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'python' }).run();
    },
  },
  {
    name: "Code HTML",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'html' }).run();
    },
  },
  {
    name: "Code CSS",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'css' }).run();
    },
  },
  {
    name: "Code TypeScript",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'typescript' }).run();
    },
  },
  {
    name: "Code JSON",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'json' }).run();
    },
  },
  {
    name: "Code Bash",
    icon: Code,
    action: (editor: any) => {
      editor.chain().focus().toggleCodeBlock({ language: 'bash' }).run();
    },
  },
  {
    name: "Divider",
    icon: Minus,
    action: (editor: any) => {
      editor.chain().focus().setHorizontalRule().run();
    },
  },
  {
    name: "Quote",
    icon: Quote,
    action: (editor: any) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },
];