import { IKoffiCType } from 'koffi';

export enum DataType {
  Bool = 'bool',
  Long = 'long',
  ULong = 'ulong',
  UnsignedLong = 'unsigned long',
  IntPtr = 'intptr',
  IntPtrT = 'intptr_t',
  UIntPtr = 'uintptr',
  UIntPtrT = 'uintptr_t',
  WCharT = 'wchar_t',
  Str = 'str',
  String = 'string',
  Str16 = 'str16',
  String16 = 'string16',
  Str32 = 'str32',
  String32 = 'string32',
  Void = 'void',
  Int8 = 'int8',
  Int8T = 'int8_t',
  UInt8 = 'uint8',
  UInt8T = 'uint8_t',
  Char = 'char',
  UChar = 'uchar',
  UnsignedChar = 'unsigned char',
  Char16 = 'char16',
  Char16T = 'char16_t',
  Char16Pointer = 'char16*',
  Int16 = 'int16',
  Int16T = 'int16_t',
  UInt16 = 'uint16',
  UInt16T = 'uint16_t',
  Short = 'short',
  UShort = 'ushort',
  UnsignedShort = 'unsigned short',
  Char32 = 'char32',
  Char32T = 'char32_t',
  Int32 = 'int32',
  Int32T = 'int32_t',
  UInt32 = 'uint32',
  UInt32T = 'uint32_t',
  Int = 'int',
  UInt = 'uint',
  UnsignedInt = 'unsigned int',
  Int64 = 'int64',
  Int64T = 'int64_t',
  UInt64 = 'uint64',
  UInt64T = 'uint64_t',
  LongLong = 'longlong',
  Long_Long = 'long long',
  ULongLong = 'ulonglong',
  UnsignedLongLong = 'unsigned long long',
  Float32 = 'float32',
  Float64 = 'float64',
  Float = 'float',
  Double = 'double',
}

export type DataTypeToType<T extends DataType | IKoffiCType> = T extends DataType.Bool
  ? boolean
  : T extends DataType.Long
    ? number
    : T extends DataType.ULong
      ? number
      : T extends DataType.UnsignedLong
        ? number
        : T extends DataType.IntPtr
          ? number
          : T extends DataType.IntPtrT
            ? number
            : T extends DataType.UIntPtr
              ? number
              : T extends DataType.UIntPtrT
                ? number
                : T extends DataType.WCharT
                  ? string
                  : T extends DataType.Str
                    ? string
                    : T extends DataType.String
                      ? string
                      : T extends DataType.Str16
                        ? string
                        : T extends DataType.String16
                          ? string
                          : T extends DataType.Str32
                            ? string
                            : T extends DataType.String32
                              ? string
                              : T extends DataType.Void
                                ? void
                                : T extends DataType.Int8
                                  ? number
                                  : T extends DataType.Int8T
                                    ? number
                                    : T extends DataType.UInt8
                                      ? number
                                      : T extends DataType.UInt8T
                                        ? number
                                        : T extends DataType.Char
                                          ? string
                                          : T extends DataType.UChar
                                            ? string
                                            : T extends DataType.UnsignedChar
                                              ? string
                                              : T extends DataType.Char16
                                                ? string
                                                : T extends DataType.Char16T
                                                  ? string
                                                  : T extends DataType.Int16
                                                    ? number
                                                    : T extends DataType.Int16T
                                                      ? number
                                                      : T extends DataType.UInt16
                                                        ? number
                                                        : T extends DataType.UInt16T
                                                          ? number
                                                          : T extends DataType.Short
                                                            ? number
                                                            : T extends DataType.UShort
                                                              ? number
                                                              : T extends DataType.UnsignedShort
                                                                ? number
                                                                : T extends DataType.Char32
                                                                  ? string
                                                                  : T extends DataType.Char32T
                                                                    ? string
                                                                    : T extends DataType.Int32
                                                                      ? number
                                                                      : T extends DataType.Int32T
                                                                        ? number
                                                                        : T extends DataType.UInt32
                                                                          ? number
                                                                          : T extends DataType.UInt32T
                                                                            ? number
                                                                            : T extends DataType.Int
                                                                              ? number
                                                                              : T extends DataType.UInt
                                                                                ? number
                                                                                : T extends DataType.UnsignedInt
                                                                                  ? number
                                                                                  : T extends DataType.Int64
                                                                                    ? number
                                                                                    : T extends DataType.Int64T
                                                                                      ? number
                                                                                      : T extends DataType.UInt64
                                                                                        ? number
                                                                                        : T extends DataType.UInt64T
                                                                                          ? number
                                                                                          : T extends DataType.LongLong
                                                                                            ? number
                                                                                            : T extends DataType.Long_Long
                                                                                              ? number
                                                                                              : T extends DataType.ULongLong
                                                                                                ? number
                                                                                                : T extends DataType.UnsignedLongLong
                                                                                                  ? number
                                                                                                  : T extends DataType.Float32
                                                                                                    ? number
                                                                                                    : T extends DataType.Float64
                                                                                                      ? number
                                                                                                      : T extends DataType.Float
                                                                                                        ? number
                                                                                                        : T extends DataType.Double
                                                                                                          ? number
                                                                                                          : T extends IKoffiCType
                                                                                                            ? Buffer
                                                                                                            : never;
