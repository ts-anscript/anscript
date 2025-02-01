/// <reference path="./inherit-metadata.as" />
// prettier-ignore-start
/* eslint-disable */
/**
 * 🪄 This file was generated by Anscript
 * Do not edit this file!
 */

import type { TAnscriptTypeObject, TMetadataMap } from "@anscript/typescript"

/**
 * Anscript interface **ISource**
 * @see {@link ./inherit-metadata.as:1:11}
 */
declare class ISource {
  firstName: string
  lastName: string
  age: number
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof ISource>
  static metadata: TMetadataMap<AnscriptMetadata>
}

/**
 * Anscript interface **ITarget**
 * @see {@link ./inherit-metadata.as:14:18}
 */
export declare class ITarget {
  firstName: ISource["firstName"]
  lastName?: ISource["lastName"]
  age: ISource["age"]
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof ITarget>
  static metadata: TMetadataMap<AnscriptMetadata>
}
// prettier-ignore-end