/// <reference path="./inherit-chain.as" />
// prettier-ignore-start
/* eslint-disable */
/**
 * 🪄 This file was generated by Anscript
 * Do not edit this file!
 */

import type { TAnscriptTypeObject, TMetadataMap } from "@anscript/typescript"

/**
 * Anscript type **TType**
 * @see {@link ./inherit-chain.as:6:6}
 */
declare type TType = string

/**
 * Anscript interface **I1**
 * @see {@link ./inherit-chain.as:8:11}
 */
declare class I1 {
  prop?: TType
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof I1>
  static metadata: TMetadataMap<AnscriptMetadata>
}

/**
 * Anscript interface **I2**
 * @see {@link ./inherit-chain.as:15:18}
 */
export declare class I2 {
  prop?: I1["prop"]
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof I2>
  static metadata: TMetadataMap<AnscriptMetadata>
}
// prettier-ignore-end