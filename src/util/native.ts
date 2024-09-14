import { DataType, JsExternal, PointerType, createPointer, freePointer } from 'ffi-rs';

// TODO: Figure out if we need any of this. It seems that ffi-rs will create value pointers for us
// automatically so this could just be a waste of time.

type PointerResult = [JsExternal, () => void];

export function useValuePointer<T>(value: T, type: DataType): PointerResult {
  const pointer = createPointer({
    paramsType: [type],
    paramsValue: [value],
  })[0];

  return [
    pointer,
    () => {
      freePointer({
        paramsType: [type],
        paramsValue: [pointer],
        pointerType: PointerType.RsPointer,
      });
    },
  ];
}

export function createPointerToConstantWideString(value: string): PointerResult {
  return useValuePointer(value, DataType.WString);
}
