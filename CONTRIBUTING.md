# Contributing to WordEditor.online

Thank you for your interest in contributing to WordEditor.online! We're excited to work with you. This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions. We're committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/achyuth8055/wordeditor.com.git
cd wordeditor.com
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Make Your Changes

- Follow the existing code style
- Write clear, descriptive commits
- Test your changes thoroughly

### 5. Run Tests

```bash
npm run dev
# Test your changes locally
npm run build
```

### 6. Submit a Pull Request

1. Push your branch to your fork
2. Open a Pull Request with a clear title and description
3. Reference any related issues
4. Wait for review feedback

## Development Guidelines

### Code Style

- **Language:** TypeScript with strict mode
- **Formatting:** Use consistent indentation (2 spaces)
- **Naming:** Use camelCase for variables/functions, PascalCase for components
- **Comments:** Add comments for complex logic

### Component Structure

```typescript
import React from 'react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

### Testing

- Test components locally before submitting
- Ensure no TypeScript errors: `npm run type-check`
- Test on multiple screen sizes (mobile, tablet, desktop)
- Verify accessibility

## Commit Message Format

Use clear, descriptive commit messages:

```
feat: Add word counter feature
fix: Fix typing test accuracy calculation
docs: Update README with new instructions
style: Format code according to style guide
test: Add tests for summarizer
chore: Update dependencies
refactor: Improve component structure
```

## Pull Request Process

1. **Title:** Clear and descriptive (e.g., "Add dark mode support")
2. **Description:** Explain the changes and why
3. **Related Issues:** Link to any related issues (#123)
4. **Screenshots:** Include for UI changes
5. **Testing:** Describe how you tested the changes

### Example PR Description

```markdown
## Description
Add dark mode support to the application for better user experience in low-light environments.

## Changes
- Added dark mode toggle in header
- Updated color variables for dark theme
- Applied dark theme across all components
- Added persistence to localStorage

## Testing
- Tested on Chrome, Firefox, Safari
- Verified on mobile devices
- Tested toggle functionality
- Checked accessibility in dark mode

## Screenshots
[Include relevant screenshots]

## Related Issues
Closes #123
```

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/screen recordings
- Browser/device information
- Error messages or console logs

### Feature Requests

Include:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Examples or mockups (if applicable)

## Project Structure

```
wordeditor.com/
├── components/          # React components
├── services/           # API and external services
├── styles/             # CSS and styling
├── hooks/              # Custom React hooks
├── types.ts            # TypeScript definitions
├── public/             # Static assets
├── README.md           # Documentation
└── vite.config.ts      # Build configuration
```

## Key Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **DeepSeek API** - AI capabilities

## Performance Considerations

- Keep components focused and reusable
- Use React.memo for expensive renders
- Optimize images and assets
- Minimize bundle size
- Use code splitting where appropriate

## Accessibility

- Use semantic HTML
- Include alt text for images
- Ensure keyboard navigation
- Maintain WCAG AA compliance
- Test with screen readers

## Documentation

- Update README.md for new features
- Add comments to complex code
- Document new APIs or functions
- Include examples where helpful

## Questions?

- Open an issue for questions
- Join our community discussions
- Email: support@wordeditor.online

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- GitHub contributors page

Thank you for contributing to WordEditor.online! 🎉
