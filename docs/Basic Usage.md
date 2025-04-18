# Basic Usage

Using AutoIt JS is as straightforward as it gets; import function, call function, use result.

```typescript
import {
  ControlClickByHandle,
  ControlGetHandle,
  Init,
  Run,
  Send,
  WinClose,
  WinGetHandle,
  WinWait,
  WinWaitActive,
  autoit,
} from '@ahmic/autoit-js';

// An instance of the AutoIt class is created automatically, you need only call load() to initialize it
autoit.load();

// Initialize AutoIt
Init();

// Run Notepad
Run('notepad.exe');

// Wait for Notepad to be active
WinWaitActive('[CLASS:Notepad]');

// Type into Notepad
Send('Hello, World!');

// Close Notepad
WinClose('[CLASS:Notepad]');

// Wait for the Save dialog to appear
WinWait('Notepad', '&Save');

// Get the handle of the Save dialog
const dialogHandle = WinGetHandle('Notepad', '&Save');

// Get the handle of the Don't Save button
const buttonHandle = ControlGetHandle(dialogHandle, 'Button2');

// Click the Don't Save button
ControlClickByHandle(dialogHandle, buttonHandle);

// Unload AutoIt
autoit.unload();
```
