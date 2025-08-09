import { statSync } from 'node:fs';

import { APP_TITLE, PROCESS_NAME, TEST_APP_PATH } from './@testing/test-constants';
import { autoit } from './lib/autoit';
import { ProcessClose, ProcessCloseSync } from './process-close';
import { ProcessExists, ProcessExistsSync } from './process-exists';
import { ProcessWait, ProcessWaitSync } from './process-wait';
import { ProcessWaitClose, ProcessWaitCloseSync } from './process-wait-close';
import { Run, RunSync } from './run';
import { WinClose, WinCloseSync } from './win-close';
import { WinCloseByHandle, WinCloseByHandleSync } from './win-close-by-handle';
import { WinExists, WinExistsSync } from './win-exists';
import { WinExistsByHandle, WinExistsByHandleSync } from './win-exists-by-handle';
import { WinGetHandle, WinGetHandleSync } from './win-get-handle';
import { WinKill, WinKillSync } from './win-kill';
import { WinKillByHandle, WinKillByHandleSync } from './win-kill-by-handle';
import { WinSetOnTop, WinSetOnTopSync } from './win-set-on-top';
import { WinSetOnTopByHandle, WinSetOnTopByHandleSync } from './win-set-on-top-by-handle';
import { WinWait, WinWaitSync } from './win-wait';
import { WinWaitCloseByHandle, WinWaitCloseByHandleSync } from './win-wait-close-by-handle';

describe.sequential('AutoIt Open/Close @full', () => {
  beforeAll(() => {
    expect(statSync(TEST_APP_PATH).isFile()).toBe(true);

    autoit.load();
  });

  afterAll(() => {
    ProcessCloseSync('TestApp.exe');
    autoit.unload();
  });

  it('runs and closes the program (sync)', () => {
    RunSync(TEST_APP_PATH);
    expect(WinWaitSync(APP_TITLE, '', 500)).toBe(1);
    expect(WinCloseSync(APP_TITLE)).toBe(1);
    expect(WinExistsSync(APP_TITLE)).toBe(false);
  });

  it('runs and closes the program by handle (sync)', () => {
    RunSync(TEST_APP_PATH);
    expect(WinWaitSync(APP_TITLE, '', 500)).toBe(1);

    const handle = WinGetHandleSync(APP_TITLE);

    expect(WinCloseByHandleSync(handle)).toBe(1);
    expect(WinWaitCloseByHandleSync(handle)).toBe(1);
    expect(WinExistsByHandleSync(handle)).toBe(false);
  });

  it('runs and kills the program (sync)', () => {
    RunSync(TEST_APP_PATH);
    expect(WinWaitSync(APP_TITLE, '', 500)).toBe(1);
    expect(WinKillSync(APP_TITLE)).toBe(1);
    expect(WinExistsSync(APP_TITLE)).toBe(false);
  });

  it('runs and kills the program by handle (sync)', () => {
    RunSync(TEST_APP_PATH);
    expect(WinWaitSync(APP_TITLE, '', 500)).toBe(1);

    const handle = WinGetHandleSync(APP_TITLE);

    expect(WinKillByHandleSync(handle)).toBe(1);
    expect(WinExistsSync(APP_TITLE)).toBe(false);
  });

  it('runs and closes the process (sync)', () => {
    RunSync(TEST_APP_PATH);
    expect(ProcessWaitSync(PROCESS_NAME, 500)).toBe(1);
    expect(ProcessExistsSync(PROCESS_NAME)).toBe(true);
    expect(ProcessCloseSync(PROCESS_NAME)).toBe(1);
    expect(ProcessWaitCloseSync(PROCESS_NAME)).toBe(1);
    expect(ProcessExistsSync(PROCESS_NAME)).toBe(false);
  });

  it('sets the window on top (sync)', () => {
    RunSync(TEST_APP_PATH);
    expect(WinWaitSync(APP_TITLE, '', 500)).toBe(1);

    expect(WinSetOnTopSync(APP_TITLE, '', true)).toBe(1);
    expect(WinSetOnTopSync(APP_TITLE, '', false)).toBe(1);

    const handle = WinGetHandleSync(APP_TITLE);

    expect(WinSetOnTopByHandleSync(handle, true)).toBe(1);
    expect(WinSetOnTopByHandleSync(handle, false)).toBe(1);

    expect(WinCloseSync(APP_TITLE)).toBe(1);
    expect(WinExistsSync(APP_TITLE)).toBe(false);
  });

  it('runs and closes the program (async)', async () => {
    await Run(TEST_APP_PATH);
    expect(await WinWait(APP_TITLE, '', 500)).toBe(1);
    expect(await WinClose(APP_TITLE)).toBe(1);
    expect(await WinExists(APP_TITLE)).toBe(false);
  });

  it('runs and closes the program (async) by handle', async () => {
    await Run(TEST_APP_PATH);
    expect(await WinWait(APP_TITLE, '', 500)).toBe(1);

    const handle = await WinGetHandle(APP_TITLE);

    expect(await WinCloseByHandle(handle)).toBe(1);
    expect(await WinWaitCloseByHandle(handle)).toBe(1);
    expect(await WinExistsByHandle(handle)).toBe(false);
  });

  it('runs and kills the program (async)', async () => {
    await Run(TEST_APP_PATH);
    expect(await WinWait(APP_TITLE, '', 500)).toBe(1);
    expect(await WinKill(APP_TITLE)).toBe(1);
    expect(await WinExists(APP_TITLE)).toBe(false);
  });

  it('runs and kills the program by handle (async)', async () => {
    await Run(TEST_APP_PATH);
    expect(await WinWait(APP_TITLE, '', 500)).toBe(1);

    const handle = await WinGetHandle(APP_TITLE);

    expect(await WinKillByHandle(handle)).toBe(1);
    expect(await WinExists(APP_TITLE)).toBe(false);
  });

  it('runs and closes the process (async)', async () => {
    await Run(TEST_APP_PATH);
    expect(await ProcessWait(PROCESS_NAME, 500)).toBe(1);
    expect(await ProcessExists(PROCESS_NAME)).toBe(true);
    expect(await ProcessClose(PROCESS_NAME)).toBe(1);
    expect(await ProcessWaitClose(PROCESS_NAME)).toBe(1);
    expect(await ProcessExists(PROCESS_NAME)).toBe(false);
  });

  it('sets the window on top (async)', async () => {
    RunSync(TEST_APP_PATH);
    expect(await WinWait(APP_TITLE, '', 500)).toBe(1);

    expect(await WinSetOnTop(APP_TITLE, '', true)).toBe(1);
    expect(await WinSetOnTop(APP_TITLE, '', false)).toBe(1);

    const handle = await WinGetHandle(APP_TITLE);

    expect(await WinSetOnTopByHandle(handle, true)).toBe(1);
    expect(await WinSetOnTopByHandle(handle, false)).toBe(1);

    expect(await WinClose(APP_TITLE)).toBe(1);
    expect(await WinExists(APP_TITLE)).toBe(false);
  });
});
