import koffi, { IKoffiCType } from 'koffi';

/**
 * A nominal type is a type that is defined by its name, rather than its structure. This allows us to take
 * multiple C types that would otherwise map to the same TypeScript (JavaScript) type and treat them as
 * distinct types.
 *
 * For example, `int`, `unsigned int`, `long`, etc. are all distinct types with their own meaning and own
 * features in C, however in TypeScript they all map to `number`. By using nominal types, we can make
 * TypeScript display an error when you try to use an `Int` type in a function that expects an
 * `UnsignedInt` type for example.
 *
 * Note that there is no runtime safety to this! This is purely a compile-time check to help you catch errors
 * early. For example, if a C function expects an `unsigned int` and you pass in a positive `int` ignoring
 * the TypeScript error, it will work fine at runtime. If you however try to pass a negative `int`, you will
 * get a runtime error.
 *
 * **You have been warned!**
 *
 * @template T The underlying TypeScript type.
 * @template U The name of the nominal type.
 *
 * @example
 *
 * type Int = Nominal<number, 'INT'>;
 * type UnsignedInt = Nominal<number, 'UINT'>;
 *
 * function add(a: Int, b: Int): Int {
 *   return a + b;
 * }
 *
 * const one: Int = 123;
 * const two: Int = 456;
 * const three: UnsignedInt = 789;
 *
 * add(one, two); // OK
 * add(one, three); // Error
 */
export type Nominal<T, U> = T & { [Symbol.species]?: U; __jsType?: T };

export type Win32Type<T extends Nominal<unknown, unknown> | null> = IKoffiCType & {
  __jsType?: NonNullable<T>['__jsType'];
  [Symbol.species]?: NonNullable<T>[typeof Symbol.species];
};

export const AU3_INTDEFAULT = -2147483647;
export const SW_SHOWNORMAL = 1;

export const BOOL: Win32Type<Bool> = koffi.alias('BOOL', 'bool');
export const BYTE: Win32Type<Byte> = koffi.alias('BYTE', 'unsigned char');
export const CHAR: Win32Type<Char> = koffi.alias('CHAR', 'char');
export const DWORD: Win32Type<DoubleWord> = koffi.alias('DWORD', 'unsigned long');
export const INT: Win32Type<Int> = koffi.alias('INT', 'int');
export const UINT: Win32Type<UnsignedInt> = koffi.alias('UINT', 'unsigned int');
export const WCHAR: Win32Type<WideChar> = koffi.alias('WCHAR', 'wchar_t');
export const LONG: Win32Type<Long> = koffi.alias('LONG', 'long');
export const VOID: Win32Type<Void> = koffi.alias('VOID', 'void');
export const WORD: Win32Type<Word> = koffi.alias('WORD', 'unsigned short');

export const PVOID: Win32Type<PointerToVoid> = koffi.alias('PVOID', 'void*');

export const LPCSTR: Win32Type<LongPointerToConstantString> = koffi.pointer('LPCSTR', CHAR);
export const LPWSTR: Win32Type<LongPointerToWideString> = koffi.pointer('LPWSTR', WCHAR);
export const LPCWSTR: Win32Type<LongPointerToConstantWideString> = koffi.pointer('LPCWSTR', WCHAR);
export const LPVOID: Win32Type<LongPointerToVoid> = koffi.pointer('LPVOID', PVOID);

export const HANDLE: Win32Type<Handle> = koffi.pointer('HANDLE', koffi.opaque());
export const HWND: Win32Type<WindowHandle> = koffi.alias('HWND', HANDLE);
export const HDC: Win32Type<DeviceContextHandle> = koffi.alias('HDC', HANDLE);
export const HBITMAP: Win32Type<BitmapHandle> = koffi.alias('HBITMAP', HANDLE);

export type Bool = Nominal<boolean, 'BOOL'>;
export type Byte = Nominal<number, 'BYTE'>;
export type Char = Nominal<string, 'CHAR'>;
export type DoubleWord = Nominal<number, 'DWORD'>;
export type Int = Nominal<number, 'INT'>;
export type UnsignedInt = Nominal<number, 'UINT'>;
export type WideChar = Nominal<string, 'WCHAR'>;
export type Long = Nominal<number, 'LONG'>;
export type Void = Nominal<void, 'VOID'>;
export type Word = Nominal<number, 'WORD'>;

export type PointerToVoid = Nominal<IKoffiCType, 'PVOID'>;

export type LongPointerToConstantString = Nominal<string, 'LPCSTR'>;
export type LongPointerToWideString = Nominal<string, 'LPWSTR'>;
export type LongPointerToConstantWideString = Nominal<string, 'LPCWSTR'>;
export type LongPointerToVoid = Nominal<IKoffiCType, 'LPVOID'>;

// Propbably wrong, but I don't have access to the External type that Koffi returns when accessing handles
export type Handle = Nominal<IKoffiCType, 'HANDLE'>;
export type WindowHandle = Nominal<Handle['__jsType'], 'HWND'>;
export type DeviceContextHandle = Nominal<Handle['__jsType'], 'HDC'>;
export type BitmapHandle = Nominal<Handle['__jsType'], 'HBITMAP'>;
