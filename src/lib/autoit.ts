import { arch, platform } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import koffi, { IKoffiLib, KoffiFunction } from 'koffi';

import { Nominal, Win32Type } from '../@types/win32';
import { Logger } from '../util/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class AutoIt {
  private readonly path: string;
  private readonly logger: Logger;

  private lib: IKoffiLib | null = null;
  private functionCache: Record<string, KoffiFunction> = {};

  constructor() {
    const archSuffix = arch() === 'x64' ? '_x64' : '';

    this.path = resolve(`${__dirname}/AutoItX3${archSuffix}.dll`);
    this.logger = new Logger(this.constructor.name);

    if (platform() !== 'win32') {
      this.logger.warn('AutoIt is only supported on Windows. AutoIt JS will not function as expected!');
    }
  }

  load() {
    if (this.lib) {
      this.logger.warn('AutoIt is already loaded');
    } else {
      this.logger.debug(`Loading AutoIt from ${this.path}`);

      this.lib = koffi.load(this.path);

      this.logger.debug('AutoIt loaded');
    }
  }

  unload() {
    if (this.lib) {
      this.logger.debug(`Unloading AutoIt from ${this.path}`);

      this.lib.unload();

      this.logger.debug('AutoIt unloaded');

      this.lib = null;
    } else {
      this.logger.warn('AutoIt is already unloaded');
    }
  }

  get isLoaded(): boolean {
    return this.lib !== null;
  }

  invoke<
    FunctionReturnType extends Win32Type<Nominal<unknown, unknown>>,
    const FunctionArgumentTypes extends Win32Type<Nominal<unknown, unknown>>[],
  >(
    functionName: string,
    functionReturnType: FunctionReturnType,
    functionArgumentTypes: FunctionArgumentTypes,
    functionArguments: unknown[],
  ): NonNullable<FunctionReturnType['__jsType']> {
    if (!this.lib) {
      throw new Error('You must call load() before invoking functions');
    }

    let func = this.functionCache[functionName];

    if (!func) {
      func = this.lib.func('__stdcall', functionName, functionReturnType, functionArgumentTypes);

      this.functionCache[functionName] = func;
    }

    const output = func(...functionArguments);

    this.logger.logFunctionCall(functionName, functionArguments, output);

    return output;
  }

  // invokeAsync<
  //   FunctionReturnType extends Win32Type<Nominal<unknown, unknown>>,
  //   const FunctionArgumentTypes extends Win32Type<Nominal<unknown, unknown>>[],
  // >(
  //   functionName: string,
  //   functionReturnType: FunctionReturnType,
  //   functionArgumentTypes: FunctionArgumentTypes,
  //   functionArguments: unknown[],
  //   callback: (result: NonNullable<FunctionReturnType['__jsType']>) => void,
  // ) {
  //   if (!this.lib) {
  //     throw new Error('You must call load() before invoking functions');
  //   }

  //   const func = this.lib.func('__stdcall', functionName, functionReturnType, functionArgumentTypes);

  //   func.async(...functionArguments, callback);
  // }
}

export const autoit = new AutoIt();
