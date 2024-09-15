import koffi, { IKoffiCType, IKoffiLib, KoffiFunction } from 'koffi';

import { Logger } from '../util';
import { DataType, DataTypeToType } from './data-type';

export abstract class Library {
  private readonly name: string;
  private readonly path: string;
  private readonly logger: Logger;

  private lib: IKoffiLib | null = null;
  private loaded: boolean = false;
  private functionCache: Record<string, KoffiFunction> = {};

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.logger = new Logger(this.constructor.name);
  }

  abstract postLoad(): void;

  load() {
    if (this.loaded) {
      this.logger.warn(`Library ${this.name} is already loaded`);
    } else {
      this.logger.debug(`Loading library ${this.name} from ${this.path}`);

      this.lib = koffi.load(this.path);

      this.postLoad();

      this.loaded = true;

      this.logger.debug(`Library ${this.name} loaded`);
    }
  }

  unload() {
    if (this.loaded) {
      this.logger.debug(`Unloading library ${this.name} from ${this.path}`);

      this.lib?.unload();

      this.logger.debug(`Library ${this.name} unloaded`);

      this.loaded = false;
    } else {
      this.logger.warn(`Library ${this.name} is already unloaded`);
    }
  }

  call<ReturnType extends DataType, const ParameterTypes extends (DataType | IKoffiCType)[]>(
    functionName: string,
    resultType: ReturnType,
    parameterTypes: ParameterTypes,
    parameters: { [K in keyof ParameterTypes]: DataTypeToType<ParameterTypes[K]> },
  ): DataTypeToType<ReturnType> {
    const cachedFunc = this.functionCache[functionName];

    if (cachedFunc) {
      return cachedFunc(...parameters);
    }

    // TODO: null check
    const func = this.lib!.func(functionName, resultType, parameterTypes);

    this.functionCache[functionName] = func;

    return func(...parameters);
  }
}
