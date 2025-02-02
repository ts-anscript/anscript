/// <reference path="./multiple-interface.as" />
// prettier-ignore-start
/* eslint-disable */
/**
 * 🪄 This file was generated by Anscript
 * Do not edit this file!
 */

import type { TAnscriptTypeObject, TMetadataMap, Validator } from "@anscript/typescript"

/**
 * Anscript type **TContactType**
 * @see {@link ./multiple-interface.as:1:6}
 */
declare type TContactType = "phone" | "email"

/**
 * Anscript interface **Address**
 * @see {@link ./multiple-interface.as:3:18}
 */
export declare class Address {
  line1: string
  line2: string
  city: string
  state: string
  zip: string
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof Address>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}

/**
 * Anscript interface **Contact**
 * @see {@link ./multiple-interface.as:11:11}
 */
declare class Contact {
  type: TContactType
  value: string
  label?: string
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof Contact>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}

/**
 * Anscript interface **User**
 * @see {@link ./multiple-interface.as:17:18}
 */
export declare class User {
  firstName: string
  lastName: string
  address: Address
  contacts: Contact[]
  static __is_anscript_annotated_type: boolean
  static type: TAnscriptTypeObject<keyof User>
  static metadata: TMetadataMap<AnscriptMetadata>
  static validator: () => Validator
}
// prettier-ignore-end