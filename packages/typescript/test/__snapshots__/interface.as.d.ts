// prettier-ignore-start
/* eslint-disable */
/// <reference path="./interface.as" />
/**
 * 🪄 This file was generated by Atscript
 * Do not edit this file!
 */

import type { TAtscriptTypeObject, TMetadataMap, Validator } from "@atscript/typescript"

/**
 * Atscript interface **PublicInterface**
 * @see {@link ./interface.as:1:18}
 */
export declare class PublicInterface {
  primitive: string
  pirmiitiveUn: string | number
  email: string /* email */
  interger: number /* int */
  literal: "value"
  number: 5
  tuple1: [string]
  tuple2: [string, string]
  tupleArray: [string, string][]
  array: string[]
  array2: string[][]
  array3: string[][][]
  complexArray: (string | number)[]
  complexArray2: (string | number)[][]
  complexArray3: (string | number)[][][]
  complexArray4: string | number[]
  complexArray5: string[] | number
  object: {
    prop1: string
    prop2?: number
    nested: {
      prop3: boolean
      prop4?: boolean
    }
  }
  optional?: string
  objectUnion1: {
    a: "a"
  } | string
  objectUnion2: string | {
    a: "a"
  }
  objectIntersection: {
    a: "a"
  } & {
    b: "b"
  }
  grouping: (string | ((number & boolean & {
    a: "b"
  }) | "c"))
  static __is_anscript_annotated_type: true
  static type: TAtscriptTypeObject<keyof PublicInterface, AnscriptPrimitiveFlags>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}
// prettier-ignore-end