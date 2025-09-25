export const findSlashCommand = (textBefore: string): RegExpMatchArray | null => {
  return textBefore.match(/\/(\w*)$/);
};

export const deleteSlashCommand = (editor: any, from: number): void => {
  const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from, " ");
  const slashMatch = findSlashCommand(textBefore);

  if (slashMatch) {
    const deleteFrom = from - slashMatch[0].length;
    editor.view.dispatch(editor.state.tr.delete(deleteFrom, from));
  }
};