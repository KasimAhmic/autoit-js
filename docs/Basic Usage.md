# Basic Usage

Using AutoIt JS is as straightforward as it gets; import function, call function, use result.

## Synchronous Example

You can use the synchronous API for simple scripting tasks if you don't want to deal with promises.

```typescript
import {
  ControlClickByHandleSync,
  ControlGetHandleSync,
  InitSync,
  RunSync,
  SendSync,
  WinCloseSync,
  WinGetHandleSync,
  WinWaitActiveSync,
  WinWaitSync,
  autoit,
} from '@ahmic/autoit-js';

// An instance of the AutoIt class is created automatically, you need only call load() to initialize it
autoit.load();

// Initialize AutoIt
InitSync();

// Run Notepad
RunSync('notepad.exe');

// Wait for Notepad to be active
WinWaitActiveSync('[CLASS:Notepad]');

// Type into Notepad
SendSync('Hello, World!');

// Close Notepad
WinCloseSync('[CLASS:Notepad]');

// Wait for the Save dialog to appear
WinWaitSync('Notepad', '&Save');

// Get the handle of the Save dialog
const dialogHandle = WinGetHandleSync('Notepad', '&Save');

// Get the handle of the Don't Save button
const buttonHandle = ControlGetHandleSync(dialogHandle, 'Button2');

// Click the Don't Save button
ControlClickByHandleSync(dialogHandle, buttonHandle);

// Unload AutoIt
autoit.unload();
```

## Asynchronous Example

When in asynchronous contexts like in Cypress and Playwright, you can use the asynchronous API to avoid
blocking the event loop. The API is largely the same except that you need to `await` the functions and use the
non `Sync` versions.

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
await Init();

// Run Notepad
await Run('notepad.exe');

// Wait for Notepad to be active
await WinWaitActive('[CLASS:Notepad]');

// Type into Notepad
await Send('Hello, World!');

// Close Notepad
await WinClose('[CLASS:Notepad]');

// Wait for the Save dialog to appear
await WinWait('Notepad', '&Save');

// Get the handle of the Save dialog
const dialogHandle = await WinGetHandle('Notepad', '&Save');

// Get the handle of the Don't Save button
const buttonHandle = await ControlGetHandle(dialogHandle, 'Button2');

// Click the Don't Save button
await ControlClickByHandle(dialogHandle, buttonHandle);

// Unload AutoIt
autoit.unload();
```
