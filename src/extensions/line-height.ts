import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

/**
 * Extend type definitions for the @tiptap/core module
 * Add lineHeight-related commands to the Commands interface
 */
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Set line height
       */
      setLineHeight: (lineHeight: string) => ReturnType;
      /**
       * Unset line height
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

/**
 * Font size extension configuration options interface
 */
export interface LineHeightOptions {
  types: string[];
  defaultLineHeight: 'inherit' | '1.2' | '1.5' | '2' | '2.5' | '3';
}

/**
 * Line height extension configuration options interface
 */
export const LineHeightExtension = Extension.create<LineHeightOptions>({
  name: 'lineHeight',
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: 'inherit',
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: element => {
              return element.style.lineHeight || this.options.defaultLineHeight;
            },
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight};`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        lineHeight =>
          /**
           * tr, state, dispatch are core concepts in Tiptap/ProseMirror editor
           */
          ({ tr, state, dispatch }) => {
            /**
             * state: EditorState
             * - Immutable, each modification creates a new state
             */
            const { selection, doc } = state; // Get current selection and document from state

            /**
             * tr: Transaction
             * - Transaction object used to collect modifications to the editor
             * - Can be chained to accumulate multiple modifications
             * - All modifications are done through tr, not by directly modifying state
             */

            // Set selection to ensure changes are applied at the correct position
            tr = tr.setSelection(selection);

            // Get the starting and ending positions of the selection
            const { from, to } = selection;

            /**
             * nodesBetween: Iterate through all nodes in the selection
             * from: Selection start position
             * to: Selection end position
             */
            doc.nodesBetween(from, to, (node, pos) => {
              // Check if the current node is in the list of node types allowed to set line height
              if (this.options.types.includes(node.type.name)) {
                /**
                 * setNodeMarkup: Update node attributes
                 * pos: Node position in the document
                 * undefined: Keep node type unchanged
                 * { ...node.attrs, lineHeight }: Merge existing attributes with new line height value
                 */
                tr = tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  lineHeight,
                });
              }
            });

            /**
             * dispatch: Function
             * - Used to commit the transaction and make modifications take effect
             * - Optional parameter; if not provided, just previews the modification
             * - When provided, applies the transaction and updates editor state
             */
            dispatch?.(tr);

            // Return true to indicate successful command execution
            return true;
          },
      unsetLineHeight:
        () =>
          ({ tr, state, dispatch }) => {
            const { selection, doc } = state;
            tr = tr.setSelection(selection);
            const { from, to } = selection;
            doc.nodesBetween(from, to, (node, pos) => {
              if (this.options.types.includes(node.type.name)) {
                tr = tr.setNodeMarkup(pos, undefined, { ...node.attrs, lineHeight: this.options.defaultLineHeight });
              }
            });
            dispatch?.(tr);
            return true;
          },
    };
  },
});

/*

Comparison of setNodeMarkup vs setMark

-------------------------------- setNodeMarkup --------------------------------

Used to modify node-level attributes
tr.setNodeMarkup(pos, type, attrs)

  - Modifies attributes of the entire node
  - Applied to block-level elements (like paragraphs, headings)
  - Attributes affect the entire node
  - Stored in the node's attrs

Line height setting - Affects entire paragraph
setLineHeight:
  lineHeight =>
  ({ tr, state, dispatch }) => {
    state.doc.nodesBetween(from, to, (node, pos) => {
      Sets line height for the entire node
      tr = tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        lineHeight,
      });
    });
  }
  
HTML Result:

<!-- Line height applied to entire paragraph -->
<p style="line-height: 1.5">
  This is a paragraph; the entire paragraph uses the same line height.
  Even parts of the paragraph use the same line height.
</p>


-------------------------------- setMark --------------------------------

Used to modify inline styles
chain().setMark('textStyle', { fontSize: '16px' })

  - Modifies text-level styles
  - Applied to inline elements
  - Can select text fragments to apply styles
  - Stored in marks

Font size setting - Can be applied to text fragments
setFontSize:
  options =>
  ({ chain }) => {
    Sets font size for selected text
    return chain()
      .setMark('textStyle', { fontSize: options.size })
      .run();
  }
  
HTML Result:

<p>
  This is a paragraph,
  <span style="font-size: 16px">this part has a specific font size</span>
  while other parts remain default size.
</p>


----------------------------------------------------------------

Why is it designed this way?


1. Line height characteristics:

Line height needs to be applied to the entire block-level element
setLineHeight:
  lineHeight =>
  ({ tr, state, dispatch }) => {
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (this.options.types.includes(node.type.name)) {
        Use setNodeMarkup to ensure the entire node uses the same line height
        tr = tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          lineHeight,
        });
      }
    });
  }
  
2. Font size characteristics:

Font size can be applied to text fragments
setFontSize:
  options =>
  ({ chain }) => {
    Use setMark to allow different font sizes within a paragraph
    return chain()
      .setMark('textStyle', { fontSize: options.size })
      .run();
  }
  

----------------------------------------------------------------

Practical application example:

1. Mixed usage scenario:

Set both line height and font size
editor.chain()
  Line height applied to entire paragraph
  .setLineHeight('1.5')
  Font size only applied to selected text
  .setFontSize({ size: '16px' })
  .run();


Result:
<p style="line-height: 1.5">
  This is normal text,
  <span style="font-size: 16px">this is larger text</span>
  this is normal text again.
</p>

Benefits of this design:
1. Conforms to conventional HTML/CSS usage
2. Provides better typographic control
3. Maintains document structure clarity
4. Aligns with user intuition


----------------------------------------------------------------

1. Attribute application method:
 - line-height.ts uses setNodeMarkup to set node attributes
 - font-size.ts uses setMark to set inline marks

2. Scope:
 - Line height applies to entire block-level nodes (like paragraphs)
 - Font size can apply to text fragments

3. Attribute storage location:
 - Line height stored in node's attrs
 - Font size stored in marks

Design considerations:

1. Line height characteristics:
 - Line height typically applies to entire paragraphs
 - Should not have different line heights within a paragraph

2. Node attributes vs marks:
 - Node attributes suitable for overall styles (like line height, alignment)
 - Marks suitable for inline styles (like font size, color)

*/
