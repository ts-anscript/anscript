// prettier-ignore-start
/* eslint-disable */
/// <reference path="./intersections.as" />
/**
 * 🪄 This file was generated by Anscript
 * Do not edit this file!
 */

import type { TAnscriptTypeObject, TMetadataMap, Validator } from "@ts-anscript/typescript"

/**
 * Anscript interface **IA**
 * @see {@link ./intersections.as:3:11}
 */
declare class IA {
  a: string
  b?: number
  static __is_anscript_annotated_type: true
  static type: TAnscriptTypeObject<keyof IA, AnscriptPrimitiveFlags>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}

/**
 * Anscript interface **IB**
 * @see {@link ./intersections.as:12:11}
 */
declare class IB {
  b: number
  c?: string
  static __is_anscript_annotated_type: true
  static type: TAnscriptTypeObject<keyof IB, AnscriptPrimitiveFlags>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}

/**
 * Anscript type **T**
 * @see {@link ./intersections.as:22:6}
 */
declare type T = IA & IB

/**
 * Anscript interface **I1**
 * @see {@link ./intersections.as:24:18}
 */
export declare class I1 {
  all: T
  a: T["a"]
  b: T["b"]
  c: T["c"]
  static __is_anscript_annotated_type: true
  static type: TAnscriptTypeObject<keyof I1, AnscriptPrimitiveFlags>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}
// prettier-ignore-end