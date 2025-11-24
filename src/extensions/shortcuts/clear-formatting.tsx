import { Extension } from '@tiptap/core';

/**
 * In Tiptap and many other editors, Mod is a universal modifier key
 * that automatically maps to Ctrl (on Windows and Linux) or Cmd (on macOS).
 * This ensures keyboard shortcuts work correctly across different platforms.
 *
 * 'Mod-Shift-x': () => this.editor.chain().focus().unsetAllMarks().run(),
 */

export const ClearFormattingShortcut = Extension.create({
  name: 'clearFormattingShortcut',

  addKeyboardShortcuts() {
    return {
      'Mod-\\': () => this.editor.chain().focus().unsetAllMarks().run(),
    };
  },
});

/*

import { Extension } from '@tiptap/core';

const ClearFormattingShortcut = Extension.create({
  name: 'clearFormattingShortcut',

  addKeyboardShortcuts() {
    return {
      'Mod-\\': () => this.editor.chain().focus().unsetAllMarks().run(),
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown(view, event) {
            // Handle special cases with Chinese input method
            if (event.key === '\\' && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              view.dispatch(view.state.tr.setMeta('clearFormatting', true));
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default ClearFormattingShortcut;

In this example, we use Mod-\\ as the keyboard shortcut binding and added a ProseMirror plugin to handle special cases with Chinese input method. By listening to the handleKeyDown event, we can execute the clear formatting operation when Cmd + \ is detected.

*/
