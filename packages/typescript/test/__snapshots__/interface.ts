// prettier-ignore-start
/* eslint-disable */
/**
 * 🪄 This file was generated by Anscript from "interface.as".
 * Do not edit this file!
*/
import { defineAnnotatedType, type TAnscriptTypeObject } from '@anscript/typescript/runtime';

export class PublicInterface {
  primitive!: string;
  
  pirmiitiveUn!: string | number;
  
  interger!: number;
  
  literal!: "value";
  
  number!: 5;
  
  tuple1!: [string];
  
  tuple2!: [string, string];
  
  tupleArray!: [string, string][];
  
  array!: string[];
  
  array2!: string[][];
  
  array3!: string[][][];
  
  complexArray!: (string | number)[];
  
  complexArray2!: ((string | number)[])[];
  
  complexArray3!: (((string | number)[])[])[];
  
  complexArray4!: string | number[];
  
  complexArray5!: string[] | number;
  
  object!: {
    prop1: string;
    prop2?: number;
    nested: {
      prop3: boolean;
      prop4?: boolean;
    };
  };
  
  optional?: string;
  
  objectUnion1!: {
    a: "a";
  } | string;
  
  objectUnion2!: string | {
    a: "a";
  };
  
  objectIntersection!: {
    a: "a";
  } & {
    b: "b";
  };
  
  static __is_anscript_annotated_type = true;
  
  static type: TAnscriptTypeObject = {
    kind: "object",
    type: PublicInterface,
    props: new Map(),
  };
  
  static metadata = {};
}

//#region Annotations for PublicInterface
{ // PublicInterface["primitive"]
  const $$md_primitive = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "string",
      type: String,
    },
    metadata: {},
  });
  PublicInterface.type.props.set("primitive", $$md_primitive);
}{ // PublicInterface["pirmiitiveUn"]
  const $$md_pirmiitiveUn = defineAnnotatedType({
    type: {
      kind: "union",
      items: [
        {
          kind: "final",
          designType: "string",
          type: String,
        },
        {
          kind: "final",
          designType: "number",
          type: Number,
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("pirmiitiveUn", $$md_pirmiitiveUn);
}{ // PublicInterface["interger"]
  const $$md_interger = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "number",
      type: Number,
    },
    metadata: {},
  });
  PublicInterface.type.props.set("interger", $$md_interger);
}{ // PublicInterface["literal"]
  const $$md_literal = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "string",
      type: String,
      value: "value",
    },
    metadata: {},
  });
  PublicInterface.type.props.set("literal", $$md_literal);
}{ // PublicInterface["number"]
  const $$md_number = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "number",
      type: Number,
      value: 5,
    },
    metadata: {},
  });
  PublicInterface.type.props.set("number", $$md_number);
}{ // PublicInterface["tuple1"]
  const $$md_tuple1 = defineAnnotatedType({
    type: {
      kind: "tuple",
      items: [
        {
          kind: "final",
          designType: "string",
          type: String,
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("tuple1", $$md_tuple1);
}{ // PublicInterface["tuple2"]
  const $$md_tuple2 = defineAnnotatedType({
    type: {
      kind: "tuple",
      items: [
        {
          kind: "final",
          designType: "string",
          type: String,
        },
        {
          kind: "final",
          designType: "string",
          type: String,
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("tuple2", $$md_tuple2);
}{ // PublicInterface["tupleArray"]
  const $$md_tupleArray = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "tuple",
        items: [
          {
            kind: "final",
            designType: "string",
            type: String,
          },
          {
            kind: "final",
            designType: "string",
            type: String,
          },
        ],
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("tupleArray", $$md_tupleArray);
}{ // PublicInterface["array"]
  const $$md_array = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "final",
        designType: "string",
        type: String,
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("array", $$md_array);
}{ // PublicInterface["array2"]
  const $$md_array2 = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "array",
        of: {
          kind: "final",
          designType: "string",
          type: String,
        },
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("array2", $$md_array2);
}{ // PublicInterface["array3"]
  const $$md_array3 = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "array",
        of: {
          kind: "array",
          of: {
            kind: "final",
            designType: "string",
            type: String,
          },
        },
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("array3", $$md_array3);
}{ // PublicInterface["complexArray"]
  const $$md_complexArray = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "union",
        items: [
          {
            kind: "final",
            designType: "string",
            type: String,
          },
          {
            kind: "final",
            designType: "number",
            type: Number,
          },
        ],
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("complexArray", $$md_complexArray);
}{ // PublicInterface["complexArray2"]
  const $$md_complexArray2 = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "array",
        of: {
          kind: "union",
          items: [
            {
              kind: "final",
              designType: "string",
              type: String,
            },
            {
              kind: "final",
              designType: "number",
              type: Number,
            },
          ],
        },
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("complexArray2", $$md_complexArray2);
}{ // PublicInterface["complexArray3"]
  const $$md_complexArray3 = defineAnnotatedType({
    type: {
      kind: "array",
      of: {
        kind: "array",
        of: {
          kind: "array",
          of: {
            kind: "union",
            items: [
              {
                kind: "final",
                designType: "string",
                type: String,
              },
              {
                kind: "final",
                designType: "number",
                type: Number,
              },
            ],
          },
        },
      },
    },
    metadata: {},
  });
  PublicInterface.type.props.set("complexArray3", $$md_complexArray3);
}{ // PublicInterface["complexArray4"]
  const $$md_complexArray4 = defineAnnotatedType({
    type: {
      kind: "union",
      items: [
        {
          kind: "final",
          designType: "string",
          type: String,
        },
        {
          kind: "array",
          of: {
            kind: "final",
            designType: "number",
            type: Number,
          },
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("complexArray4", $$md_complexArray4);
}{ // PublicInterface["complexArray5"]
  const $$md_complexArray5 = defineAnnotatedType({
    type: {
      kind: "union",
      items: [
        {
          kind: "array",
          of: {
            kind: "final",
            designType: "string",
            type: String,
          },
        },
        {
          kind: "final",
          designType: "number",
          type: Number,
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("complexArray5", $$md_complexArray5);
}{ // PublicInterface["object"]
  const $$md_object = defineAnnotatedType({
    type: {
      kind: "object",
      type: Object,
      props: new Map(),
    },
    metadata: {},
  });
  PublicInterface.type.props.set("object", $$md_object);

  //#region Annotations for PublicInterface["object"]
  { // PublicInterface["object"]["prop1"]
    const $$md_prop1 = defineAnnotatedType({
      type: {
        kind: "final",
        designType: "string",
        type: String,
      },
      metadata: {},
    });
    $$md_object.type.props.set("prop1", $$md_prop1);
  }{ // PublicInterface["object"]["prop2"]
    const $$md_prop2 = defineAnnotatedType({
      type: {
        kind: "final",
        designType: "number",
        type: Number,
      },
      metadata: {},
    });
    $$md_object.type.props.set("prop2", $$md_prop2);
  }{ // PublicInterface["object"]["nested"]
    const $$md_nested = defineAnnotatedType({
      type: {
        kind: "object",
        type: Object,
        props: new Map(),
      },
      metadata: {},
    });
    $$md_object.type.props.set("nested", $$md_nested);

    //#region Annotations for PublicInterface["object"]["nested"]
    { // PublicInterface["object"]["nested"]["prop3"]
      const $$md_prop3 = defineAnnotatedType({
        type: {
          kind: "final",
          designType: "boolean",
          type: Boolean,
        },
        metadata: {},
      });
      $$md_nested.type.props.set("prop3", $$md_prop3);
    }{ // PublicInterface["object"]["nested"]["prop4"]
      const $$md_prop4 = defineAnnotatedType({
        type: {
          kind: "final",
          designType: "boolean",
          type: Boolean,
        },
        metadata: {},
      });
      $$md_nested.type.props.set("prop4", $$md_prop4);
    }
    //#endregion
  }
  //#endregion
}{ // PublicInterface["optional"]
  const $$md_optional = defineAnnotatedType({
    type: {
      kind: "final",
      designType: "string",
      type: String,
    },
    metadata: {},
  });
  PublicInterface.type.props.set("optional", $$md_optional);
}{ // PublicInterface["objectUnion1"]
  const $$md_objectUnion1 = defineAnnotatedType({
    type: {
      kind: "union",
      items: [
        {
          kind: "object",
          type: Object,
          props: new Map(),
        },
        {
          kind: "final",
          designType: "string",
          type: String,
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("objectUnion1", $$md_objectUnion1);
}{ // PublicInterface["objectUnion2"]
  const $$md_objectUnion2 = defineAnnotatedType({
    type: {
      kind: "union",
      items: [
        {
          kind: "final",
          designType: "string",
          type: String,
        },
        {
          kind: "object",
          type: Object,
          props: new Map(),
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("objectUnion2", $$md_objectUnion2);
}{ // PublicInterface["objectIntersection"]
  const $$md_objectIntersection = defineAnnotatedType({
    type: {
      kind: "intersection",
      items: [
        {
          kind: "object",
          type: Object,
          props: new Map(),
        },
        {
          kind: "object",
          type: Object,
          props: new Map(),
        },
      ],
    },
    metadata: {},
  });
  PublicInterface.type.props.set("objectIntersection", $$md_objectIntersection);
}
//#endregion

// prettier-ignore-end
