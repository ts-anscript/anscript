// prettier-ignore-start
/* eslint-disable */
/**
 * 🪄 This file was generated by Anscript from "inherit-from-type.as".
 * Do not edit this file!
*/
import { defineAnnotatedType, type TAnscriptTypeObject } from '@anscript/typescript/runtime';

declare type TFirstName = string;

declare type TLastName = string;

declare type TAge = number;

export class ITarget {
  firstName: TFirstName;
  
  lastName?: TLastName;
  
  age: TAge;
  
  static __is_anscript_annotated_type: boolean;
  
  static type: TAnscriptTypeObject;
  
  static metadata: any;
}

// prettier-ignore-end
