# Contributing Guidelines

## Bug Reporting

When reporting bugs, please include the following:

- A clear and descriptive title
- A detailed description of the bug
- Example code that reproduces the bug
- Your operating system and version
- A stack trace (if available)

Example bug report:

Title: PixelSearch coordinates are offset by the horizontal resolution
Description: When using PixelSearch, the coordinates are offset by the horizontal resolution of the screen.
For example, if I search for a blue pixel located at (700, 500), the function returns (2620, 500) on a
1920x1080 screen.
Code:

```typescript
import { PixelSearch, autoit } from '@ahmic/autoit-js';

autoit.load();

console.log(PixelSearch(600, 400, 800, 600, 0x0000ff)); // Returns { x: 2620, y: 500 }

autoit.unload();
```

Operating System: Windows 10 Pro 64-bit (10.0, Build 19042)
Stack Trace: N/A

## Code Contributions

When contributing code, please follow these guidelines:

- Use prettier to format your code
  - `npm run format`
- Run your code through eslint before submitting
  - `npm run lint`
- Write clear and descriptive commit messages
- Include tests for your code
- Update the documentation as needed
