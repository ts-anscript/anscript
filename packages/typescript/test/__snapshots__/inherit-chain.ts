// prettier-ignore-start
/* eslint-disable */
/**
 * 🪄 This file was generated by Anscript from "inherit-chain.as".
 * Do not edit this file!
*/
import { defineAnnotatedType, type TAnscriptTypeObject } from '@anscript/typescript/runtime';

type TType = string;

class I1 {
  prop?: TType;
  
  static __is_anscript_annotated_type = true;
  
  static type: TAnscriptTypeObject = {
    kind: "object",
    type: I1,
    props: new Map(),
  };
  
  static metadata = {};
}

//#region Annotations for I1
{ // I1["prop"]
  const $$md_prop = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "string",
      type: String,
    },
    metadata: {
      fromI1: true,
      from: "I1",
      pass2: "I1",
      fromTType: true,
      pass1: "TType",
      pass3: "TType",
    },
  });
  I1.type.props.set("prop", $$md_prop);
}
//#endregion

export class I2 {
  prop?: I1["prop"];
  
  static __is_anscript_annotated_type = true;
  
  static type: TAnscriptTypeObject = {
    kind: "object",
    type: I2,
    props: new Map(),
  };
  
  static metadata = {};
}

//#region Annotations for I2
{ // I2["prop"]
  const $$md_prop = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "string",
      type: String,
    },
    metadata: {
      fromI2: true,
      from: "I2",
      pass3: "I2",
      fromI1: true,
      pass2: "I1",
      fromTType: true,
      pass1: "TType",
    },
  });
  I2.type.props.set("prop", $$md_prop);
}
//#endregion

// prettier-ignore-end
