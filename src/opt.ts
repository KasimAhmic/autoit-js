import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * AutoIt options that can be set using the {@linkcode AutoItSetOption} or {@linkcode Opt} functions.
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/AutoItSetOption.htm
 */
export enum AutoItOption {
  /**
   * Sets the way coords are used in the caret functions, either absolute coords or coords relative to the
   * current active window:
   *
   * | Value | Description                                             |
   * |-------|---------------------------------------------------------|
   * | 0     | relative coords to the active window                    |
   * | 1     | (default) absolute screen coordinates                   |
   * | 2     | relative coords to the client area of the active window |
   */
  CaretCoordMode = 'CaretCoordMode',

  /**
   * Changes how literal strings and % symbols are interpreted. By default strings are treated literally, this
   * option allows you to use %environment% variables inside strings, e.g., "The temp directory is: %temp%".
   *
   * | Value | Description                                   |
   * |-------|-----------------------------------------------|
   * | 0     | (default) do not expand environment variables |
   * | 1     | expand environment variables                  |
   */
  ExpandEnvStrings = 'ExpandEnvStrings',

  /**
   * Changes how literal strings and variable/macro ($ and @) symbols are interpreted. By default strings are
   * treated literally, this option allows you to use variables and macros inside strings, e.g., "The value of
   * var1 is $var1$".
   *
   * | Value | Description                                                                                                                    |
   * |-------|--------------------------------------------------------------------------------------------------------------------------------|
   * | 0     | (default) do not expand variables                                                                                              |
   * | 1     | expand variables |
   *
   * When in this expand mode (1) and you want to use a literal $ or @ then double it up: "This is a single dollar $$ sign".
   */
  ExpandVarStrings = 'ExpandVarStrings',

  /**
   * When ESC is pressed on a GUI the $GUI_EVENT_CLOSE message is sent. This option toggles this behavior on
   * and off.
   *
   * | Value | Description                                                                    |
   * |-------|--------------------------------------------------------------------------------|
   * | 0     | Don't send the $GUI_EVENT_CLOSE message when ESC is pressed.                   |
   * | 1     | (default) {@linkcode Send}() the $GUI_EVENT_CLOSE message when ESC is pressed. |
   */
  GUICloseOnESC = 'GUICloseOnESC',

  /**
   * Alters the position of a control defined by GUICtrlSetPos().
   *
   * | Value | Description                                                                                         |
   * |-------|-----------------------------------------------------------------------------------------------------|
   * | 0     | relative position to the start of the last control (upper left corner)                              |
   * | 1     | (default) absolute coordinates still relative to the dialog box                                     |
   * | 2     | cell positioning relative to current cell. A -1 for left or top parameter don't increment the start |
   *
   * So next line is -1, offset; next cell is offset,-1; current cell is -1,-1.
   * Obviously "offset" cannot be -1 which reserved to indicate the no increment. But if you can use a
   * multiple of the width you choose to skip or go back.
   */
  GUICoordMode = 'GUICoordMode',

  /**
   * Define the character which delimits subitems in GUICtrlSetData().
   *
   * | Value | Description |
   * |-------|-------------|
   * | \|    | (default)   |
   */
  GUIDataSeparatorChar = 'GUIDataSeparatorChar',

  /**
   * Enable/disable OnEvent functions notifications.
   *
   * | Value | Description       |
   * |-------|-------------------|
   * | 0     | (default) disable |
   * | 1     | enable            |
   */
  GUIOnEventMode = 'GUIOnEventMode',

  /**
   * Change default resizing for a control.
   *
   * | Value | Description                                                                                                                 |
   * |-------|-----------------------------------------------------------------------------------------------------------------------------|
   * | 0     | (default) keep default control resizing                                                                                     |
   * | <1024 | any type of resizing see [GUICtrlSetResizing()](https://www.autoitscript.com/autoit3/docs/functions/GUICtrlSetResizing.htm) |
   */
  GUIResizeMode = 'GUIResizeMode',

  /**
   * Change special event behavior or GUI function return values.
   *
   * | Value | Description                                                                                                           |
   * |-------|-----------------------------------------------------------------------------------------------------------------------|
   * | 0     | (default) Windows behavior on click on Minimize,Restore, Maximize, Resize                                             |
   * | 1     | suppress windows behavior on minimize, restore or maximize click button or window resize. Just sends the notification |
   */
  GUIEventOptions = 'GUIEventOptions',

  /**
   * Alters the length of the brief pause in between mouse clicks.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 10    | (default)   |
   */
  MouseClickDelay = 'MouseClickDelay',

  /**
   * Alters the length a click is held down before release.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 10    | (default)   |
   */
  MouseClickDownDelay = 'MouseClickDownDelay',

  /**
   * Alters the length of the brief pause at the start and end of a mouse drag operation.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 250   | (default)   |
   */
  MouseClickDragDelay = 'MouseClickDragDelay',

  /**
   * Sets the way coords are used in the mouse functions, either absolute coords or coords relative to the
   * current active window:
   *
   * | Value | Description                                             |
   * |-------|---------------------------------------------------------|
   * | 0     | relative coords to the active window                    |
   * | 1     | (default) absolute screen coordinates                   |
   * | 2     | relative coords to the client area of the active window |
   */
  MouseCoordMode = 'MouseCoordMode',

  /**
   * If this option is used then all variables must be pre-declared with Local, Global or in some cases Dim
   * before they can be used - removes the chance for misspelled variables causing bugs.
   *
   * | Value | Description                                                                                          |
   * |-------|------------------------------------------------------------------------------------------------------|
   * | 0     | (default) Variables don't need to be pre-declared                                                    |
   * | 1     | Variables must be pre-declared. See Dim / Global / Local / Const for details on declaring variables. |
   */
  MustDeclareVars = 'MustDeclareVars',

  /**
   * Sets the way coords are used in the pixel functions, either absolute coords or coords relative to the
   * window defined by hwnd (default active window):
   *
   * | Value | Description                                              |
   * |-------|----------------------------------------------------------|
   * | 0     | relative coords to the defined window                    |
   * | 1     | (default) absolute screen coordinates                    |
   * | 2     | relative coords to the client area of the defined window |
   */
  PixelCoordMode = 'PixelCoordMode',

  /**
   * Specifies if AutoIt attaches input threads when using {@linkcode Send}() function. When not attaching
   * (default mode=0) detecting the state of capslock/scrolllock and numlock can be unreliable under NT4.
   * However, when you specify attach mode=1 the {@linkcode Send}("{... down/up}") syntax will not work and
   * there may be problems with sending keys to "hung" windows. {@linkcode ControlSend}() ALWAYS attaches and
   * is not affected by this mode.
   *
   * | Value | Description            |
   * |-------|------------------------|
   * | 0     | (default) don't attach |
   * | 1     | attach                 |
   */
  SendAttachMode = 'SendAttachMode',

  /**
   * Specifies if AutoIt should store the state of capslock before a {@linkcode Send}() function and restore
   * it afterwards.
   *
   * | Value | Description                 |
   * |-------|-----------------------------|
   * | 0     | don't store/restore         |
   * | 1     | (default) store and restore |
   */
  SendCapslockMode = 'SendCapslockMode',

  /**
   * Alters the length of the brief pause in between sent keystrokes. A value of 0 removes the delay completely.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 5     | (default)   |
   */
  SendKeyDelay = 'SendKeyDelay',

  /**
   * Alters the length of time a key is held down before being released during a keystroke. For applications
   * that take a while to register keypresses you may need to raise this value from the default. A value of 0
   * removes the delay completely.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 5     | (default)   |
   */
  SendKeyDownDelay = 'SendKeyDownDelay',

  /**
   * Autoit exitcodes return when a Fatal error occurs.
   *
   * | Value | Description                                                                                                                           |
   * |-------|---------------------------------------------------------------------------------------------------------------------------------------|
   * | 0     | (default) don't set                                                                                                                   |
   * | 1     | Set exit code on Fatal error - see [AutoIt3 Fatal Error Exit codes](https://www.autoitscript.com/autoit3/docs/appendix/Exitcodes.htm) |
   */
  SetExitCode = 'SetExitCode',

  /**
   * Defines the time before TCP functions stop if no communication.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 100   | (default)   |
   */
  TCPTimeout = 'TCPTimeout',

  /**
   * Script pauses when click on tray icon.
   *
   * | Value | Description                                                       |
   * |-------|-------------------------------------------------------------------|
   * | 0     | no pause                                                          |
   * | 1     | (default) pause. If there is no DefaultMenu no pause will occurs. |
   */
  TrayAutoPause = 'TrayAutoPause',

  /**
   * If enabled shows the current script line in the tray icon tip to help debugging.
   *
   * | Value | Description                    |
   * |-------|--------------------------------|
   * | 0     | (default) no debug information |
   * | 1     | show debug                     |
   */
  TrayIconDebug = 'TrayIconDebug',

  /**
   * Hides the AutoIt tray icon. Note: The icon will still initially appear for ~750 milliseconds.
   *
   * | Value | Description         |
   * |-------|---------------------|
   * | 0     | (default) show icon |
   * | 1     | hide icon           |
   */
  TrayIconHide = 'TrayIconHide',

  /**
   * Extend the behaviour of the script tray icon/menu. This can be done with a combination (adding) of the
   * following values.
   *
   * | Value | Description                                                                                                                                                                                                                        |
   * |-------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   * | 0     | (default) default menu items (Script Paused/Exit) are appended to the usercreated menu; items will automatically be checked/unchecked when clicked; double clicking the tray icon returns the controlID of the $TRAY_DEFAULT item. |
   * | 1     | no default menu                                                                                                                                                                                                                    |
   * | 2     | items will not automatically check/uncheck when clicked                                                                                                                                                                            |
   * | 4     | do not return the $TRAY_DEFAULT item controlID when the tray icon is double clicked                                                                                                                                                |
   * | 8     | turn off auto check of radio item groups                                                                                                                                                                                           |
   */
  TrayMenuMode = 'TrayMenuMode',

  /**
   * Enable/disable OnEvent functions notifications for the tray.
   *
   * | Value | Description       |
   * |-------|-------------------|
   * | 0     | (default) disable |
   * | 1     | enable            |
   */
  TrayOnEventMode = 'TrayOnEventMode',

  /**
   * Specifies if hidden window text can be "seen" by the window matching functions.
   *
   * | Value | Description                         |
   * |-------|-------------------------------------|
   * | 0     | (default) Do not detect hidden text |
   * | 1     | Detect hidden text                  |
   */
  WinDetectHiddenText = 'WinDetectHiddenText',

  /**
   * Allows the window search routines to search child windows as well as top-level windows.
   *
   * | Value | Description                             |
   * |-------|-----------------------------------------|
   * | 0     | (default) Only search top-level windows |
   * | 1     | Search top-level and child windows      |
   */
  WinSearchChildren = 'WinSearchChildren',

  /**
   * Alters the method that is used to match window text during search operations.
   *
   * | Value | Description                    |
   * |-------|--------------------------------|
   * | 1     | (default) Complete / Slow mode |
   * | 2     | Quick mode                     |
   *
   * In quick mode AutoIt can usually only "see" dialog text, button text and the captions of some controls.
   * In the default mode much more text can be seen (for instance the contents of the Notepad window).
   *
   * If you are having performance problems when performing many window searches then changing to the "quick"
   * mode may help.
   */
  WinTextMatchMode = 'WinTextMatchMode',

  /**
   * Alters the method that is used to match window titles during search operations.
   *
   * | Value    | Description                                                                                                                                                            |
   * |----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   * | 1        | (default) Match the title from the start                                                                                                                               |
   * | 2        | Match any substring in the title                                                                                                                                       |
   * | 3        | Exact title match                                                                                                                                                      |
   * | 4        | Advanced mode (retained for backwards compatibility only - see [Window Titles & Text (Advanced)](https://www.autoitscript.com/autoit3/docs/intro/windowsadvanced.htm)) |
   * | -1 to -4 | Case insensitive match according to the other type of match.                                                                                                           |
   */
  WinTitleMatchMode = 'WinTitleMatchMode',

  /**
   * Alters how long a script should briefly pause after a successful window-related operation.
   *
   * | Value | Description |
   * |-------|-------------|
   * | 250   | (default)   |
   */
  WinWaitDelay = 'WinWaitDelay',
}

/**
 * Changes the operation of various AutoIt functions/parameters. This function can be used interchangeably
 * with {@linkcode AutoItSetOptionSync}.
 *
 * @param option The option to change. See {@linkcode AutoItOption} for details.
 * @param value The value to assign to the option. It varies depending on the option being set.
 *
 * @returns The previous setting of the option.
 *
 * @example
 * ```typescript
 * import { OptSync, AutoItOption } from '@ahmic/autoit-js';
 *
 * OptSync(AutoItOption.MouseCoordMode, 1);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Opt.htm
 */
export function OptSync(option: AutoItOption, value: number = -1): number {
  return autoit.invoke('AU3_Opt', INT, [LPCWSTR, INT], [option, value]);
}

/**
 * Changes the operation of various AutoIt functions/parameters. This function can be used interchangeably
 * with {@linkcode AutoItSetOption}.
 *
 * @param option The option to change. See {@linkcode AutoItOption} for details.
 * @param value The value to assign to the option. It varies depending on the option being set.
 *
 * @returns A promise that resolves to the previous setting of the option.
 *
 * @example
 * ```typescript
 * import { Opt, AutoItOption } from '@ahmic/autoit-js';
 *
 * await Opt(AutoItOption.MouseCoordMode, 1);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Opt.htm
 */
export function Opt(option: AutoItOption, value: number = -1): Promise<number> {
  return autoit.invokeAsync('AU3_Opt', INT, [LPCWSTR, INT], [option, value]);
}
