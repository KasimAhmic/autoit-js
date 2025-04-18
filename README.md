# AutoIt JS

Node.js bindings for AutoItX3.dll.

<div align="center">

![NPM Version](https://img.shields.io/npm/v/%40ahmic%2Fautoit-js)
![GitHub License](https://img.shields.io/github/license/KasimAhmic/autoit-js)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/KasimAhmic/autoit-js/build.yml)
![NPM Downloads](https://img.shields.io/npm/dw/%40ahmic%2Fautoit-js)
![GitHub Issues](https://img.shields.io/github/issues/KasimAhmic/autoit-js)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/KasimAhmic/autoit-js)

</div>

## What is AutoIt JS?

AutoIt is a Windows automation tool that can be used to automate tasks on Windows. AutoIt provides its own scripting language however, it can be difficult to work with if you need to integrate Windows automation into an existing test suite.

Enter AutoIt JS.

AutoIt JS wraps the AutoItX3.dll library using [Koffi](https://koffi.dev/) to provide a simple to use interface for AutoIt. It allows you to take your existing JavaScript/TypeScript test suite powered by PlayWright/Cypress/Puppeteer/etc. and automate Windows programs with ease.

## Example Usage

```typescript
import { Init, Run, Send, WinClose, WinWaitActive, autoit } from '@ahmic/autoit-js';

autoit.load();

Init();
Run('notepad.exe');
WinWaitActive('[CLASS:Notepad]');
Send('Hello, World!');
WinClose('[CLASS:Notepad]');

autoit.unload();
```
