# @tiptap/react @tiptap/pm @tiptap/starter-kit

These three packages are all Tiptap-related libraries. Tiptap is a modern rich text editor based on ProseMirror. Here's a brief introduction to these three packages:

### 1. `@tiptap/react`

- **Purpose**: This is Tiptap's React adapter for integrating the Tiptap editor in React applications.
- **Features**:
  - Provides React components and hooks that make it simple to use the Tiptap editor in a React environment.
  - Allows developers to easily manage the editor's state and lifecycle.
  - Supports custom extensions and functionality.

### 2. `@tiptap/pm`

- **Purpose**: This package is the core library of ProseMirror, on which Tiptap is built.
- **Features**:
  - Provides fundamental ProseMirror features such as document model, state management, and change handling.
  - Enables Tiptap to handle complex text editing functions like undo/redo, cursor management, and text selection.
  - Although Tiptap primarily uses this package, direct interaction is typically not necessary.

### 3. `@tiptap/starter-kit`

- **Purpose**: This is a collection of Tiptap's basic extensions, containing commonly used editing features.
- **Features**:
  - Provides basic text editing functions such as headings, paragraphs, bold, italic, lists, links, etc.
  - Serves as a starter package to help developers quickly build feature-rich editors.
  - Can be combined with other extensions to meet specific needs.

### 4. `@tiptap/suggestion`

- **Purpose**: This is a plugin for the Tiptap editor that provides text input suggestions. The plugin can automatically display suggestions based on context when users type, helping them quickly select and insert content.

  - Automatic suggestions: Dynamically displays relevant suggestions based on user input.
  - Custom suggestions: Can customize suggestion sources and display methods based on specific needs.
  - Interactivity: Users can select suggestions using keyboard or mouse, enhancing the editing experience.

- **Use cases**:
  - Autocomplete in chat applications
  - Code hints in code editors
  - Tag or keyword suggestions in content management systems

### 5. `@tiptap/extension-collaboration-cursor`

- **Purpose**: This is an extension in the Tiptap editor for implementing cursor display during collaborative editing. It allows multiple users to edit the same document in real-time, with each user's cursor visible in other users' views.

  - Cursor synchronization: Displays each user's cursor position in real-time for collaborative editing.
  - User identification: Can set different identifiers (such as colors or names) for each user to help distinguish different editors.
  - Dynamic updates: When users move their cursor or edit, other users' views automatically update to reflect the latest cursor position.

- **Use cases**:
  - Real-time collaborative document editing tools
  - Online code editors
  - Multi-user collaborative content management systems

### 6. `@tiptap/extension-collaboration`

- **Purpose**: This is an extension for the Tiptap editor designed to support real-time collaborative editing. It allows multiple users to simultaneously edit the same document and ensures all users' changes are synchronized in real-time.

- **Features**:

  - Real-time sync: User changes are instantly reflected in other users' views, ensuring everyone sees the latest content.
  - Conflict resolution: Can handle situations where multiple users edit the same paragraph simultaneously, reducing risks of conflicts and data loss.
  - History: Supports version control and history, allowing users to view and restore previous versions.
  - User identification: Can display editing information from different users for tracking and management.

- **Use cases**:
  - Online document editors (like Google Docs)
  - Real-time collaborative code editing platforms
  - Multi-user collaborative content creation tools
