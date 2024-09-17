# AutoIt JS

Node.js bindings for AutoItX3.dll

## Project Status

> [!CAUTION]
> This project is currently in **active development** and is **not yet ready for production use**. There are quite a few cases where the library will cause the Node process to abruptly exit. You have been warned. You can track function implementation progress in [this issue](https://github.com/KasimAhmic/autoit-js/issues/1).

The goal is provide a 1:1 mapping of the AutoItX3.dll functions to TypeScript. The API will be close to the original however some changes will be made to better reflect common JavaScript practices. For example, a common pattern in C is to provide a buffer or a struct to a function that will in turn be populated with the result of said function. While this is certainly possible in JavaScript, I have instead opted to return the result directly from the function and handle the buffers and structs internally.

## How it Works

I leverage [Koffi](https://koffi.dev/), a Foreign Function Interface (FFI) library for Node.js, to call the functions in AutoItX3.dll. Koffi removes the need to create my own bindings in C++ and instead allows me to just define the functions in TypeScript and call them directly. There are issues with using an FFI library that can lead to frequent, seeminlgy random, crashes. I am working to resolve these issues however it will be a slow process.

If I feel like too much time is spent on trying to make Koffi (or any FFI library for that matter) work, I will consider using the Node API directly to create my own bindings. Feel free to open a PR if you have experience with this and would like to help! 🙂

## Example Usage

```typescript
import { AutoIt } from 'autoit-js';

const autoit = new AutoIt();

autoit.init();

autoit.run('notepad.exe');
autoit.winWaitActive('[CLASS:Notepad]');
autoit.send('Hello, World!');
autoit.winClose('[CLASS:Notepad]');

autoit.unload();
```
