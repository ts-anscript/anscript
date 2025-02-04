import { defineAnnotatedType as $ } from "@anscript/typescript"

export class PublicInterface {
  static __is_anscript_annotated_type = true
  static type = {}
  static metadata = new Map()
}

$("object", PublicInterface)
  .prop(
    "primitive",
    $().designType("string")
      .flags("string")
      .$type
  ).prop(
    "pirmiitiveUn",
    $("union")
      .item($().designType("string")
          .flags("string")
          .$type)
      .item($().designType("number")
          .flags("number")
          .$type)
      .$type
  ).prop(
    "email",
    $().designType("string")
      .flags("email", "string")
      .$type
  ).prop(
    "interger",
    $().designType("number")
      .flags("int", "number")
      .$type
  ).prop(
    "literal",
    $()
      .designType("string")
      .value("value")
      .$type
  ).prop(
    "number",
    $()
      .designType("number")
      .value(5)
      .$type
  ).prop(
    "tuple1",
    $("tuple")
      .item($().designType("string")
          .flags("string")
          .$type)
      .$type
  ).prop(
    "tuple2",
    $("tuple")
      .item($().designType("string")
          .flags("string")
          .$type)
      .item($().designType("string")
          .flags("string")
          .$type)
      .$type
  ).prop(
    "tupleArray",
    $("array")
      .of($("tuple")
          .item($().designType("string")
              .flags("string")
              .$type)
          .item($().designType("string")
              .flags("string")
              .$type)
          .$type)
      .$type
  ).prop(
    "array",
    $("array")
      .of($().designType("string")
          .flags("string")
          .$type)
      .$type
  ).prop(
    "array2",
    $("array")
      .of($("array")
          .of($().designType("string")
              .flags("string")
              .$type)
          .$type)
      .$type
  ).prop(
    "array3",
    $("array")
      .of($("array")
          .of($("array")
              .of($().designType("string")
                  .flags("string")
                  .$type)
              .$type)
          .$type)
      .$type
  ).prop(
    "complexArray",
    $("array")
      .of($("union")
          .item($().designType("string")
              .flags("string")
              .$type)
          .item($().designType("number")
              .flags("number")
              .$type)
          .$type)
      .$type
  ).prop(
    "complexArray2",
    $("array")
      .of($("array")
          .of($("union")
              .item($().designType("string")
                  .flags("string")
                  .$type)
              .item($().designType("number")
                  .flags("number")
                  .$type)
              .$type)
          .$type)
      .$type
  ).prop(
    "complexArray3",
    $("array")
      .of($("array")
          .of($("array")
              .of($("union")
                  .item($().designType("string")
                      .flags("string")
                      .$type)
                  .item($().designType("number")
                      .flags("number")
                      .$type)
                  .$type)
              .$type)
          .$type)
      .$type
  ).prop(
    "complexArray4",
    $("union")
      .item($().designType("string")
          .flags("string")
          .$type)
      .item($("array")
          .of($().designType("number")
              .flags("number")
              .$type)
          .$type)
      .$type
  ).prop(
    "complexArray5",
    $("union")
      .item($("array")
          .of($().designType("string")
              .flags("string")
              .$type)
          .$type)
      .item($().designType("number")
          .flags("number")
          .$type)
      .$type
  ).prop(
    "object",
    $("object")
      .prop(
        "prop1",
        $().designType("string")
          .flags("string")
          .$type
      ).prop(
        "prop2",
        $().designType("number")
          .flags("number")
          .optional()
          .$type
      ).prop(
        "nested",
        $("object")
          .prop(
            "prop3",
            $().designType("boolean")
              .flags("boolean")
              .$type
          ).prop(
            "prop4",
            $().designType("boolean")
              .flags("boolean")
              .optional()
              .$type
          )
          .$type
      )
      .$type
  ).prop(
    "optional",
    $().designType("string")
      .flags("string")
      .optional()
      .$type
  ).prop(
    "objectUnion1",
    $("union")
      .item($("object")
          .prop(
            "a",
            $()
              .designType("string")
              .value("a")
              .$type
          )
          .$type)
      .item($().designType("string")
          .flags("string")
          .$type)
      .$type
  ).prop(
    "objectUnion2",
    $("union")
      .item($().designType("string")
          .flags("string")
          .$type)
      .item($("object")
          .prop(
            "a",
            $()
              .designType("string")
              .value("a")
              .$type
          )
          .$type)
      .$type
  ).prop(
    "objectIntersection",
    $("object")
      .prop(
        "a",
        $()
          .designType("string")
          .value("a")
          .$type
      ).prop(
        "b",
        $()
          .designType("string")
          .value("b")
          .$type
      )
      .$type
  ).prop(
    "grouping",
    $("union")
      .item($().designType("string")
          .flags("string")
          .$type)
      .item($("union")
          .item($().designType("never")
              .flags("never")
              .$type)
          .item($()
              .designType("string")
              .value("c")
              .$type)
          .$type)
      .$type
  )
