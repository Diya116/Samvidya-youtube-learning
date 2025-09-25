import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import { createLowlight, common } from "lowlight";

const lowlight = createLowlight(common);

export const getEditorExtensions = () => [
  StarterKit.configure({ 
    codeBlock: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    blockquote: false,
    heading: {
      levels: [1, 2, 3],
    },
  }),
  CodeBlockLowlight.configure({ 
    lowlight,
    defaultLanguage: 'javascript',
    HTMLAttributes: {
      class: 'my-code-block',
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: 'my-bullet-list',
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'my-ordered-list',
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: 'my-list-item',
    },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: 'my-blockquote',
    },
  }),
];

export const EDITOR_STYLES = `
  prose prose-sm max-w-none p-4 min-h-full dark:prose-invert
  [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full
  [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-3
  [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-2
  [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mb-2
  [&_.my-bullet-list]:list-disc [&_.my-bullet-list]:ml-6 [&_.my-bullet-list]:my-2
  [&_.my-ordered-list]:list-decimal [&_.my-ordered-list]:ml-6 [&_.my-ordered-list]:my-2
  [&_.my-list-item]:mb-1
  [&_.my-blockquote]:border-l-4 [&_.my-blockquote]:border-gray-300 [&_.my-blockquote]:pl-4 [&_.my-blockquote]:italic [&_.my-blockquote]:my-4
  [&_.my-code-block]:bg-gray-100 [&_.my-code-block]:dark:bg-gray-800 [&_.my-code-block]:p-4 [&_.my-code-block]:rounded-lg [&_.my-code-block]:overflow-x-auto [&_.my-code-block]:border [&_.my-code-block]:border-gray-200 [&_.my-code-block]:dark:border-gray-700
  [&_pre]:bg-gray-100 [&_pre]:dark:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
  [&_code]:bg-gray-100 [&_code]:dark:bg-gray-800 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
`;
