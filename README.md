# AutoIt JS

Node.js bindings for AutoItX3.dll

## Project Status

> [!WARNING]
> This project is currently in **beta** and is **mostly ready** for production use. There may be some undiscovered bugs hiding out somewhere and there are a few functions that need some additional work.

This library is not yet available on NPM, but it will be soon.

## What is AutoIt JS?

AutoIt is a Windows automation tool that can be used to automate tasks on Windows. AutoIt provides its own scripting language however, it can be difficult to work with if you need to integrate Winodws automation into an existing test suite.

Enter AutoIt JS.

AutoIt JS wraps the AutoItX3.dll library using Koffi to provide a simple to use interface for AutoIt. It allows you to take your existing JavaScript/TypeScript test suite powered by PlayWright/Cypress/Puppeteer/etc. and automate Windows programs with ease.

## Example Usage

```typescript
import { autoit, Init, Run, Send, WinClose, WinWaitActive } from '@ahmic/autoit-js';

autoit.load();

Init();
Run('notepad.exe');
WinWaitActive('[CLASS:Notepad]');
Send('Hello, World!');
WinClose('[CLASS:Notepad]');

autoit.unload();
```
